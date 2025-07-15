import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkIn(gymId: string, memberId: string, classId: string) {
    return this.prisma.attendance.create({
      data: {
        gymId,
        memberId,
        classId,
        date: new Date(),
        checkedIn: true,
      },
    });
  }

  async getAttendanceByClass(classId: string, gymId: string, date?: Date) {
    const where: any = { classId, gymId };
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      where.date = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    return this.prisma.attendance.findMany({
      where,
      include: {
        member: {
          select: {
            firstName: true,
            lastName: true,
            belt: true,
            stripes: true,
          },
        },
        class: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async getMemberAttendance(memberId: string, gymId: string, limit = 10) {
    return this.prisma.attendance.findMany({
      where: { memberId, gymId },
      include: {
        class: {
          select: {
            name: true,
            dayOfWeek: true,
            startTime: true,
          },
        },
      },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  async getAttendanceStats(gymId: string, startDate?: Date, endDate?: Date) {
    const where: any = { gymId };
    
    if (startDate && endDate) {
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const totalAttendance = await this.prisma.attendance.count({ where });
    
    const uniqueMembers = await this.prisma.attendance.findMany({
      where,
      select: { memberId: true },
      distinct: ['memberId'],
    });

    const attendanceByClass = await this.prisma.attendance.groupBy({
      by: ['classId'],
      where,
      _count: {
        id: true,
      },
    });

    return {
      totalAttendance,
      uniqueMembers: uniqueMembers.length,
      attendanceByClass,
    };
  }
}