import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Attendance {
  @Field(() => ID)
  id: string;

  @Field()
  gymId: string;

  @Field()
  memberId: string;

  @Field()
  classId: string;

  @Field()
  date: Date;

  @Field()
  checkedIn: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}