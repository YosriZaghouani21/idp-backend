import { UserRepository } from '../output/userRepository.interface';
import { UserM } from 'src/User/domain/model/user';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async DeleteUser(user: UserM): Promise<void> {
    await this.userRepository.delete(user.id);
  }
}
