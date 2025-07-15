import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceController } from './attendance.controller';

@Module({
  providers: [AttendanceService, AttendanceResolver],
  controllers: [AttendanceController],
  exports: [AttendanceService],
})
export class AttendanceModule {}