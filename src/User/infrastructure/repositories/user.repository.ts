import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from '../entities/user.entity';
import { UserM } from '../../domain/model/user';
import { UserRepository } from 'src/User/domain/port/output/userRepository.interface';
@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(users)
    private readonly userEntityRepository: Repository<users>,
  ) {}
  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userEntityRepository.update(
      {
        name: username,
      },
      { hach_refresh_token: refreshToken },
    );
  }

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
  async getUserByUsername(name: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        name: name,
      },
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }

  private toUser(adminUserEntity: users): UserM {
    const adminUser: UserM = new UserM();

    adminUser.name = adminUserEntity.name;
    adminUser.password = adminUserEntity.password;
    adminUser.address = adminUserEntity.address;
    adminUser.birthDate = adminUserEntity.birthDate;
    adminUser.address = adminUserEntity.address;
    adminUser.codePostal = adminUserEntity.codePostal;
    adminUser.city = adminUserEntity.city;
    adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;

    return adminUser;
  }
  private toUserEntity(adminUser: UserM): users {
    const adminUserEntity: users = new users();

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
    adminUserEntity.hach_refresh_token = adminUser.hashRefreshToken;

    return adminUserEntity;
  }
}
