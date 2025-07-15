import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GymsService } from './gyms.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('gyms')
@ApiBearerAuth()
@Controller('gyms')
@UseGuards(AuthGuard)
export class GymsController {
  constructor(private gymsService: GymsService) {}

  @Get('me')
  async getMyGym(@Request() req: any) {
    const { gymId } = req.user;
    return this.gymsService.findOne(gymId);
  }

  @Get('active-students')
  async getActiveStudentCount(@Request() req: any) {
    const { gymId } = req.user;
    const count = await this.gymsService.getActiveStudentCount(gymId);
    return { count };
  }
}