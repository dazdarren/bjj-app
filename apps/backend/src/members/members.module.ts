import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { MembersController } from './members.controller';

@Module({
  providers: [MembersService, MembersResolver],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}