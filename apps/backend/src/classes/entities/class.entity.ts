import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Class {
  @Field(() => ID)
  id: string;

  @Field()
  gymId: string;

  @Field()
  coachId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  dayOfWeek: number;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => Int, { nullable: true })
  maxStudents?: number;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}