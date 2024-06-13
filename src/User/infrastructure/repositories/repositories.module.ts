import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([users])],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
