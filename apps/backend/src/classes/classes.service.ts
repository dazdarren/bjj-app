import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async findAll(gymId: string) {
    return this.prisma.class.findMany({
      where: { gymId, isActive: true },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findOne(id: string, gymId: string) {
    return this.prisma.class.findFirst({
      where: { id, gymId },
    });
  }

  async create(gymId: string, coachId: string, data: {
    name: string;
    description?: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    maxStudents?: number;
  }) {
    return this.prisma.class.create({
      data: {
        ...data,
        gymId,
        coachId,
      },
    });
  }

  async getClassSchedule(gymId: string, dayOfWeek?: number) {
    const where: any = { gymId, isActive: true };
    if (dayOfWeek !== undefined) {
      where.dayOfWeek = dayOfWeek;
    }

    return this.prisma.class.findMany({
      where,
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
      include: {
        coach: {
          select: { name: true },
        },
      },
    });
  }
}