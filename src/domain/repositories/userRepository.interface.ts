import { User } from '../model/user';

export interface UserRepository {
  create(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findOne(criteria: any): Promise<User | null>;
  save(user: User): Promise<void>;
}
