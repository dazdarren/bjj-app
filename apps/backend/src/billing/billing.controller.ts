import { Controller, Get, Post, Body, UseGuards, Request, Headers, RawBodyRequest } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { StripeService } from './stripe.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(
    private billingService: BillingService,
    private stripeService: StripeService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('subscription')
  async createSubscription(@Request() req: any) {
    const { gymId } = req.user;
    return this.billingService.createSubscription(gymId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('calculate')
  async calculateBill(@Request() req: any) {
    const { gymId } = req.user;
    return this.billingService.calculateMonthlyBill(gymId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('history')
  async getBillingHistory(@Request() req: any) {
    const { gymId } = req.user;
    return this.billingService.getBillingHistory(gymId);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() rawBody: RawBodyRequest<Request>,
  ) {
    const event = await this.stripeService.handleWebhook(
      rawBody.toString(),
      signature,
    );
    
    await this.billingService.processWebhook(event);
    
    return { received: true };
  }
}