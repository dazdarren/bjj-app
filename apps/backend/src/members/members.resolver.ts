import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.dto';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Member)
@UseGuards(AuthGuard)
export class MembersResolver {
  constructor(private membersService: MembersService) {}

  @Query(() => [Member])
  async members(@Context() context: any) {
    const { gymId } = context.req.user;
    return this.membersService.findActiveMembers(gymId);
  }

  @Query(() => Member)
  async member(@Args('id') id: string, @Context() context: any) {
    const { gymId } = context.req.user;
    return this.membersService.findOne(id, gymId);
  }

  @Mutation(() => Member)
  async createMember(
    @Args('input') input: CreateMemberInput,
    @Context() context: any,
  ) {
    const { gymId } = context.req.user;
    return this.membersService.create(gymId, input);
  }
}