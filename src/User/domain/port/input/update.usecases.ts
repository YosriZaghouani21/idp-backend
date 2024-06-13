import { UserRepository } from '../output/userRepository.interface';
import { UserM } from 'src/User/domain/model/user';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(user: UserM): Promise<UserM> {
    const userExists = await this.userRepository.getById(user.id);
    if (!userExists) {
      throw new Error('User does not exist.');
    }
    return this.userRepository.update(user.id, user);
  }
}
