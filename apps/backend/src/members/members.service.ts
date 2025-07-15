import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Belt } from '@prisma/client';
import { CreateMemberInput } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAll(gymId: string) {
    return this.prisma.member.findMany({
      where: { gymId },
      orderBy: { lastName: 'asc' },
    });
  }

  async findActiveMembers(gymId: string) {
    return this.prisma.member.findMany({
      where: { gymId, isActive: true },
      orderBy: { lastName: 'asc' },
    });
  }

  async findOne(id: string, gymId: string) {
    return this.prisma.member.findFirst({
      where: { id, gymId },
    });
  }

  async create(gymId: string, data: CreateMemberInput) {
    return this.prisma.member.create({
      data: {
        ...data,
        gymId,
        belt: data.belt || Belt.WHITE,
        stripes: data.stripes || 0,
      },
    });
  }

  async update(id: string, gymId: string, data: Partial<CreateMemberInput>) {
    return this.prisma.member.updateMany({
      where: { id, gymId },
      data,
    });
  }

  async updateBeltProgression(
    id: string,
    gymId: string,
    belt: Belt,
    stripes: number,
  ) {
    return this.prisma.member.updateMany({
      where: { id, gymId },
      data: { belt, stripes },
    });
  }

  async deactivate(id: string, gymId: string) {
    return this.prisma.member.updateMany({
      where: { id, gymId },
      data: { isActive: false },
    });
  }

  async reactivate(id: string, gymId: string) {
    return this.prisma.member.updateMany({
      where: { id, gymId },
      data: { isActive: true },
    });
  }

  async getMemberStats(gymId: string) {
    const total = await this.prisma.member.count({
      where: { gymId },
    });

    const active = await this.prisma.member.count({
      where: { gymId, isActive: true },
    });

    const beltDistribution = await this.prisma.member.groupBy({
      by: ['belt'],
      where: { gymId, isActive: true },
      _count: {
        belt: true,
      },
    });

    return {
      total,
      active,
      inactive: total - active,
      beltDistribution,
    };
  }
}