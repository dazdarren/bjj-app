import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { Gym } from './entities/gym.entity';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Gym)
@UseGuards(AuthGuard)
export class GymsResolver {
  constructor(private gymsService: GymsService) {}

  @Query(() => Gym)
  async gym(@Context() context: any) {
    const { gymId } = context.req.user;
    return this.gymsService.findOne(gymId);
  }

  @Query(() => Number)
  async activeStudentCount(@Context() context: any) {
    const { gymId } = context.req.user;
    return this.gymsService.getActiveStudentCount(gymId);
  }
}