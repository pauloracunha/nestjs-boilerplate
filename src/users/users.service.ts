import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async exists(user: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.count({
      where: { OR: Object.keys(user).map((key) => ({ [key]: user[key] })) },
    });
  }

  async findOne(user: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: user,
    });
  }

  async findByUsername(username: string) {
    return this.findOne({ username });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
}
