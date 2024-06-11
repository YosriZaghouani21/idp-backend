import { UserM } from '../model/user';

export interface UserRepository {
  create(user: UserM): Promise<UserM>;
  getAll(): Promise<UserM[]>;
  getById(id: string): Promise<UserM>;
  update(id: string, UserM: Partial<UserM>): Promise<UserM>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserM | null>;
  findOne(criteria: any): Promise<UserM | null>;
  save(UserM: UserM): Promise<void>;
  updateRefreshToken(name: string, refreshToken: string): Promise<void>;
  getUserByUsername(name: string): Promise<UserM>;
}
