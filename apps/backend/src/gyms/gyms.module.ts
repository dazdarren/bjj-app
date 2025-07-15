import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsResolver } from './gyms.resolver';
import { GymsController } from './gyms.controller';

@Module({
  providers: [GymsService, GymsResolver],
  controllers: [GymsController],
  exports: [GymsService],
})
export class GymsModule {}