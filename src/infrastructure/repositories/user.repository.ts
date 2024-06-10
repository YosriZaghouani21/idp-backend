import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const userEntity = this.userEntityRepository.create(user);
    const createdUser = await this.userEntityRepository.save(userEntity);
    return this.toUser(createdUser);
  }
  async getAll(): Promise<User[]> {
    const users = await this.userEntityRepository.find();
    return users.map(this.toUser);
  }
  async getById(id: any): Promise<User> {
    const userEntity = await this.userEntityRepository.findOne(id);
    if (!userEntity) throw new Error('User not found');
    return this.toUser(userEntity);
  }
  async update(id: any, user: Partial<User>): Promise<User> {
    await this.userEntityRepository.update(id, user);
    const updatedUser = await this.userEntityRepository.findOne(id);
    if (!updatedUser) throw new Error('User not found');
    return this.toUser(updatedUser);
  }
  async delete(id: any): Promise<void> {
    await this.userEntityRepository.delete(id);
  }

  async findByEmail(email: any): Promise<User> {
    console.log(`Searching for user with email: ${email}`);
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
    console.log(`Query result: ${JSON.stringify(userEntity)}`);
    return userEntity ? this.toUser(userEntity) : null;
  }
  async findOne(criteria: any): Promise<User> {
    const userEntity = await this.userEntityRepository.findOne(criteria);
    return userEntity ? this.toUser(userEntity) : null;
  }
  async save(user: User): Promise<void> {
    const userEntity = this.userEntityRepository.create(user);
    await this.userEntityRepository.save(userEntity);
  }
  private toUser(userEntity: User): User {
    const user = new User();

    user.id = userEntity.id.toString();
    user.name = userEntity.name;
    user.password = userEntity.password;
    user.address = userEntity.address;
    user.birthDate = userEntity.birthDate;
    // user.lastLogin = userEntity.last_login;
    // user.hashRefreshToken = userEntity.hach_refresh_token;

    return user;
  }
  private toUserEntity(adminUser: User): User {
    const adminUserEntity: User = new User();

    adminUserEntity.name = adminUser.name;
    adminUserEntity.email = adminUser.email;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.Role = adminUser.Role;
    adminUserEntity.birthDate = adminUser.birthDate;
    adminUserEntity.city = adminUser.city;
    adminUserEntity.countryCode = adminUser.countryCode;
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
