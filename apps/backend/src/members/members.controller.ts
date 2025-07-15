import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberInput } from './dto/create-member.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('members')
@ApiBearerAuth()
@Controller('members')
@UseGuards(AuthGuard)
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  async getAllMembers(@Request() req: any) {
    const { gymId } = req.user;
    return this.membersService.findActiveMembers(gymId);
  }

  @Get('stats')
  async getMemberStats(@Request() req: any) {
    const { gymId } = req.user;
    return this.membersService.getMemberStats(gymId);
  }

  @Get(':id')
  async getMember(@Param('id') id: string, @Request() req: any) {
    const { gymId } = req.user;
    return this.membersService.findOne(id, gymId);
  }

  @Post()
  async createMember(@Body() input: CreateMemberInput, @Request() req: any) {
    const { gymId } = req.user;
    return this.membersService.create(gymId, input);
  }
}