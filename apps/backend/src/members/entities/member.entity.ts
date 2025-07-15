import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Belt } from '@prisma/client';

registerEnumType(Belt, {
  name: 'Belt',
});

@ObjectType()
export class Member {
  @Field(() => ID)
  id: string;

  @Field()
  gymId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Belt)
  belt: Belt;

  @Field(() => Int)
  stripes: number;

  @Field()
  startDate: Date;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  emergencyContactName?: string;

  @Field({ nullable: true })
  emergencyContactPhone?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}