import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { SubscriptionTier } from '@prisma/client';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(email: string, name: string, gymId: string) {
    return this.stripe.customers.create({
      email,
      name,
      metadata: { gymId },
    });
  }

  async createSubscription(
    customerId: string,
    tier: SubscriptionTier,
  ) {
    const priceIds = {
      STARTER: 'price_starter_id', // Replace with actual Stripe price IDs
      PRO: 'price_pro_id',
      ELITE: 'price_elite_id',
    };

    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceIds[tier] }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async createUsageRecord(subscriptionItemId: string, quantity: number) {
    return this.stripe.subscriptionItems.createUsageRecord(
      subscriptionItemId,
      {
        quantity,
        timestamp: Math.floor(Date.now() / 1000),
        action: 'set',
      },
    );
  }

  async getSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.retrieve(subscriptionId);
  }

  async cancelSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }

  async handleWebhook(payload: string, signature: string) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
      return event;
    } catch (error) {
      throw new Error(`Webhook signature verification failed: ${error.message}`);
    }
  }
}