import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Attendance)
@UseGuards(AuthGuard)
export class AttendanceResolver {
  constructor(private attendanceService: AttendanceService) {}

  @Mutation(() => Attendance)
  async checkIn(
    @Args('memberId') memberId: string,
    @Args('classId') classId: string,
    @Context() context: any,
  ) {
    const { gymId } = context.req.user;
    return this.attendanceService.checkIn(gymId, memberId, classId);
  }

  @Query(() => [Attendance])
  async attendanceByClass(
    @Args('classId') classId: string,
    @Context() context: any,
  ) {
    const { gymId } = context.req.user;
    return this.attendanceService.getAttendanceByClass(classId, gymId);
  }
}