import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
import { UserM } from '../../domain/model/user';
@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async create(user: UserM): Promise<UserM> {
    const userEntity = this.toUserEntity(user);
    const createdUser = await this.userEntityRepository.save(userEntity);
    return this.toUser(createdUser);
  }

  async getAll(): Promise<UserM[]> {
    const users = await this.userEntityRepository.find();
    return users.map(this.toUser);
  }
  async getById(id: any): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne(id);
    if (!userEntity) throw new Error('User not found');
    return this.toUser(userEntity);
  }
 
  async update(id: any, user: Partial<UserM>): Promise<UserM> {
    const userEntity = this.toUserEntity(user as UserM);
    await this.userEntityRepository.update(id, userEntity);
    const updatedUser = await this.userEntityRepository.findOne(id);
    if (!updatedUser) throw new Error('User not found');
    return this.toUser(updatedUser);
  }
  async delete(id: any): Promise<void> {
    await this.userEntityRepository.delete(id);
  }

  async findByEmail(email: any): Promise<UserM> {
    console.log(`Searching for user with email: ${email}`);
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
    console.log(`Query result: ${JSON.stringify(userEntity)}`);
    return userEntity ? this.toUser(userEntity) : null;
  }
  async findOne(criteria: any): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne(criteria);
    return userEntity ? this.toUser(userEntity) : null;
  }
  async save(user: UserM): Promise<void> {
    const userEntity = this.toUserEntity(user);
    await this.userEntityRepository.save(userEntity);
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.name = adminUserEntity.name;
    adminUser.password = adminUserEntity.password;
    adminUser.address = adminUserEntity.address;
    adminUser.birthDate = adminUserEntity.birthDate;
    adminUser.address = adminUserEntity.address;
    adminUser.codePostal= adminUserEntity.codePostal;
    adminUser.city = adminUserEntity.city;

    return adminUser;
  }
  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity: User = new User();

    adminUserEntity.name = adminUser.name;
    adminUserEntity.email = adminUser.email;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.role = adminUser.Role;
    adminUserEntity.birthDate = adminUser.birthDate;
    adminUserEntity.city = adminUser.city;
    adminUserEntity.phoneNumber = adminUser.phoneNumber;
    adminUserEntity.address = adminUser.address;
    adminUserEntity.codePostal = adminUser.codePostal;
    adminUserEntity.city = adminUser.city;
    adminUserEntity.createdAt = adminUser.createdAt;
    adminUserEntity.image = adminUser.image;
    adminUserEntity.myProject = adminUser.myProject;
    adminUserEntity.resetLink = adminUser.resetLink;
    adminUserEntity.status = adminUser.status;
    adminUserEntity.description = adminUser.description;

    return adminUserEntity;
  }
}
