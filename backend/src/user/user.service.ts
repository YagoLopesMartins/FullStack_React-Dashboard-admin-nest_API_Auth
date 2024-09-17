import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedResult } from './types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findAll(query: { page?: number; limit?: number; search?: string }) {
    const { page = 1, limit = 10, search = '' } = query;

    // Pular e limitar para paginação
    const skip = (page - 1) * limit;

    // Filtragem por busca
    const where = search
      ? {
          name: { contains: search, mode: Prisma.QueryMode.insensitive },
        }
      : {};

    // Consultar usuários com paginação e busca
    const users = await this.prisma.user.findMany({
      where,
      skip,
      take: limit,
    });

    // Contar o número total de registros (para saber o total de páginas)
    const totalUsers = await this.prisma.user.count({ where });

    return {
      data: users,
      total: totalUsers,
      page,
      lastPage: Math.ceil(totalUsers / limit),
    };
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    // const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
