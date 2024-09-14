// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// describe('UserController', () => {
//   let controller: UserController;
//   let service: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         {
//           provide: UserService,
//           useValue: {
//             findAll: jest.fn().mockResolvedValue([]),
//             findOne: jest.fn().mockResolvedValue(null),
//             create: jest.fn().mockResolvedValue({}),
//             update: jest.fn().mockResolvedValue({}),
//             delete: jest.fn().mockResolvedValue({}),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//     service = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('findAll', () => {
//     it('should return an array of users', async () => {
//       const result = [
//         {
//           id: 'uuid',
//           name: 'John Doe',
//           email: 'johndoe@example.com',
//           password: 'password123',
//           registration: '123456',
//         },
//       ];
//       jest.spyOn(service, 'findAll').mockResolvedValue(result);

//       expect(await controller.findAll()).toBe(result);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a user by ID', async () => {
//       const result = {
//         id: 'uuid',
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         password: 'password123',
//         registration: '123456',
//       };
//       jest.spyOn(service, 'findOne').mockResolvedValue(result);

//       expect(await controller.findOne('uuid')).toBe(result);
//     });

//     it('should return null if user not found', async () => {
//       jest.spyOn(service, 'findOne').mockResolvedValue(null);

//       expect(await controller.findOne('invalid-id')).toBeNull();
//     });
//   });

//   describe('create', () => {
//     it('should create a new user', async () => {
//       const createUserDto: CreateUserDto = {
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         password: 'password123',
//         registration: '123456',
//       };
//       const result = { id: 'uuid', ...createUserDto };
//       jest.spyOn(service, 'create').mockResolvedValue(result);

//       expect(await controller.create(createUserDto)).toBe(result);
//     });
//   });

//   describe('update', () => {
//     it('should update a user', async () => {
//       const updateUserDto: UpdateUserDto = {
//         name: 'Jane Doe',
//         email: 'janedoe@example.com',
//         password: 'password456',
//         registration: '654321',
//       };
//       const result = { id: 'uuid', ...updateUserDto };
//       jest.spyOn(service, 'update').mockResolvedValue(result);

//       expect(await controller.update('uuid', updateUserDto)).toBe(result);
//     });
//   });

//   describe('delete', () => {
//     it('should delete a user', async () => {
//       const result = {
//         id: 'uuid',
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         password: 'password123',
//         registration: '123456',
//       };
//       jest.spyOn(service, 'delete').mockResolvedValue(result);

//       expect(await controller.delete('uuid')).toBe(result);
//     });
//   });
// });
