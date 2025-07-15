import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateClerkUser(userId: string) {
    const coach = await this.prisma.coach.findUnique({
      where: { userId },
      include: { gym: true },
    });

    if (!coach) {
      throw new Error('User not found or not authorized');
    }

    return {
      userId,
      gymId: coach.gymId,
      role: 'coach',
      gym: coach.gym,
    };
  }

  async getGymFromUserId(userId: string): Promise<string> {
    const coach = await this.prisma.coach.findUnique({
      where: { userId },
      select: { gymId: true },
    });

    if (!coach) {
      throw new Error('User not associated with any gym');
    }

    return coach.gymId;
  }
}