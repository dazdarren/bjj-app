import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SubscriptionTier } from '@prisma/client';

@Injectable()
export class GymsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.gym.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.gym.findUnique({
      where: { slug },
    });
  }

  async create(data: {
    name: string;
    slug: string;
    email: string;
    phone?: string;
    address?: string;
    subscriptionTier?: SubscriptionTier;
  }) {
    return this.prisma.gym.create({
      data,
    });
  }

  async update(id: string, data: Partial<{
    name: string;
    email: string;
    phone: string;
    address: string;
    subscriptionTier: SubscriptionTier;
    subscriptionStatus: string;
    stripeCustomerId: string;
  }>) {
    return this.prisma.gym.update({
      where: { id },
      data,
    });
  }

  async getActiveStudentCount(gymId: string): Promise<number> {
    return this.prisma.member.count({
      where: {
        gymId,
        isActive: true,
      },
    });
  }

  async getSubscriptionLimits(tier: SubscriptionTier) {
    const limits = {
      STARTER: { maxStudents: 30, price: 4900, overage: false },
      PRO: { maxStudents: 100, price: 9900, overage: false },
      ELITE: { maxStudents: null, price: 19900, overage: true, overageRate: 50 },
    };

    return limits[tier];
  }
}