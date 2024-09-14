import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        registration: '123456',
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue({
        id: 'uuid',
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10), // Senha hash simulada
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(createUserDto);

      expect(result).toEqual({
        id: 'uuid',
        ...createUserDto,
        password: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = {
        id: 'uuid',
        name: 'John Doe',
        email: 'johndoe@example.com',
        registration: '123456',
        password: 'hashedPassword',
        createdAt: new Date(), // Adicione o campo createdAt
        updatedAt: new Date(), // Adicione o campo updatedAt
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.findOne(user.id);

      expect(result).toEqual({
        id: 'uuid',
        name: 'John Doe',
        email: 'johndoe@example.com',
        registration: '123456',
        password: 'hashedPassword',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne('invalid-id');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = {
        id: 'uuid',
        name: 'John Doe',
        email: 'john@example.com',
        registration: '123456',
        password: 'oldPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateUserDto = {
        name: 'John Updated',
        password: 'newPassword',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(bcrypt.genSalt);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(bcrypt.hash);
      jest.spyOn(prismaService.user, 'update').mockResolvedValue({
        ...user,
        name: updateUserDto.name,
        password: 'hashedPassword',
      });

      const result = await service.update(user.id, updateUserDto);

      expect(result).toEqual({
        ...user,
        name: 'John Updated',
        password: 'hashedPassword',
      });

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 'salt');
    });

    it('should throw NotFoundException if user does not exist on update', async () => {
      const updateUserDto = {
        name: 'John Updated',
        password: 'newPassword',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(
        service.update('nonexistent-id', updateUserDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = {
        id: 'uuid',
        name: 'John Doe',
        email: 'john@example.com',
        registration: '123456',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(user);

      const result = await service.delete(user.id);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user does not exist on delete', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.delete('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
