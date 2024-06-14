import { UserRepository } from '../output/userRepository.interface';
import { UserM } from 'src/User/domain/model/user';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(updatedUser: Partial<UserM>, id: string): Promise<UserM> {
    const userExists = await this.userRepository.getById(id);
    if (!userExists) {
      throw new Error('User does not exist.');
    }
    return this.userRepository.update(id, updatedUser);
  }
}
