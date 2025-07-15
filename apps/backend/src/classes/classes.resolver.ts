import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './entities/class.entity';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Class)
@UseGuards(AuthGuard)
export class ClassesResolver {
  constructor(private classesService: ClassesService) {}

  @Query(() => [Class])
  async classes(@Context() context: any) {
    const { gymId } = context.req.user;
    return this.classesService.findAll(gymId);
  }

  @Query(() => Class)
  async class(@Args('id') id: string, @Context() context: any) {
    const { gymId } = context.req.user;
    return this.classesService.findOne(id, gymId);
  }
}