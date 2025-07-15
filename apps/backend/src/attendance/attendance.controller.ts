import { Controller, Get, Post, Body, Query, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('attendance')
@ApiBearerAuth()
@Controller('attendance')
@UseGuards(AuthGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('checkin')
  async checkIn(
    @Body() body: { memberId: string; classId: string },
    @Request() req: any,
  ) {
    const { gymId } = req.user;
    return this.attendanceService.checkIn(gymId, body.memberId, body.classId);
  }

  @Get('class/:classId')
  async getAttendanceByClass(
    @Param('classId') classId: string,
    @Query('date') date: string,
    @Request() req: any,
  ) {
    const { gymId } = req.user;
    const parsedDate = date ? new Date(date) : undefined;
    return this.attendanceService.getAttendanceByClass(classId, gymId, parsedDate);
  }

  @Get('member/:memberId')
  async getMemberAttendance(
    @Param('memberId') memberId: string,
    @Query('limit') limit: string,
    @Request() req: any,
  ) {
    const { gymId } = req.user;
    const parsedLimit = limit ? parseInt(limit) : 10;
    return this.attendanceService.getMemberAttendance(memberId, gymId, parsedLimit);
  }

  @Get('stats')
  async getAttendanceStats(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req: any,
  ) {
    const { gymId } = req.user;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.getAttendanceStats(gymId, start, end);
  }
}