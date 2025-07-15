import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Belt } from '@prisma/client';

@InputType()
export class CreateMemberInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field(() => Belt, { defaultValue: Belt.WHITE })
  @IsOptional()
  @IsEnum(Belt)
  belt?: Belt;

  @Field({ defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  stripes?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;
}