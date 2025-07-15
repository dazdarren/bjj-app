import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { SubscriptionTier } from '@prisma/client';

registerEnumType(SubscriptionTier, {
  name: 'SubscriptionTier',
});

@ObjectType()
export class Gym {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  stripeCustomerId?: string;

  @Field(() => SubscriptionTier)
  subscriptionTier: SubscriptionTier;

  @Field()
  subscriptionStatus: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}