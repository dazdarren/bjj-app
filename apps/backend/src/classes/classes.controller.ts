import { Controller, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('classes')
@ApiBearerAuth()
@Controller('classes')
@UseGuards(AuthGuard)
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Get()
  async getAllClasses(@Request() req: any) {
    const { gymId } = req.user;
    return this.classesService.findAll(gymId);
  }

  @Get('schedule')
  async getClassSchedule(
    @Query('dayOfWeek') dayOfWeek: string,
    @Request() req: any,
  ) {
    const { gymId } = req.user;
    const day = dayOfWeek ? parseInt(dayOfWeek) : undefined;
    return this.classesService.getClassSchedule(gymId, day);
  }

  @Get(':id')
  async getClass(@Param('id') id: string, @Request() req: any) {
    const { gymId } = req.user;
    return this.classesService.findOne(id, gymId);
  }
}