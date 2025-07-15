import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StripeService } from './stripe.service';
import { GymsService } from '../gyms/gyms.service';

@Injectable()
export class BillingService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
    private gymsService: GymsService,
  ) {}

  async createSubscription(gymId: string) {
    const gym = await this.gymsService.findOne(gymId);
    if (!gym) {
      throw new Error('Gym not found');
    }

    let customerId = gym.stripeCustomerId;
    
    if (!customerId) {
      const customer = await this.stripeService.createCustomer(
        gym.email,
        gym.name,
        gymId,
      );
      customerId = customer.id;
      
      await this.gymsService.update(gymId, {
        stripeCustomerId: customerId,
      });
    }

    const subscription = await this.stripeService.createSubscription(
      customerId,
      gym.subscriptionTier,
    );

    return subscription;
  }

  async calculateMonthlyBill(gymId: string) {
    const gym = await this.gymsService.findOne(gymId);
    const activeStudents = await this.gymsService.getActiveStudentCount(gymId);
    const limits = await this.gymsService.getSubscriptionLimits(gym.subscriptionTier);

    let baseAmount = limits.price;
    let overageAmount = 0;

    if (limits.overage && activeStudents > 150) {
      overageAmount = (activeStudents - 150) * limits.overageRate;
    }

    return {
      baseAmount,
      overageAmount,
      totalAmount: baseAmount + overageAmount,
      activeStudents,
      tier: gym.subscriptionTier,
    };
  }

  async getBillingHistory(gymId: string) {
    return this.prisma.bill.findMany({
      where: { gymId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async processWebhook(event: any) {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionCanceled(event.data.object);
        break;
    }
  }

  private async handlePaymentSucceeded(invoice: any) {
    const gymId = invoice.customer_metadata?.gymId;
    if (!gymId) return;

    await this.prisma.bill.create({
      data: {
        gymId,
        stripeInvoiceId: invoice.id,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: 'paid',
        billingPeriodStart: new Date(invoice.period_start * 1000),
        billingPeriodEnd: new Date(invoice.period_end * 1000),
        activeStudents: await this.gymsService.getActiveStudentCount(gymId),
      },
    });
  }

  private async handlePaymentFailed(invoice: any) {
    const gymId = invoice.customer_metadata?.gymId;
    if (!gymId) return;

    await this.gymsService.update(gymId, {
      subscriptionStatus: 'past_due',
    });
  }

  private async handleSubscriptionCanceled(subscription: any) {
    const gymId = subscription.metadata?.gymId;
    if (!gymId) return;

    await this.gymsService.update(gymId, {
      subscriptionStatus: 'canceled',
    });
  }
}