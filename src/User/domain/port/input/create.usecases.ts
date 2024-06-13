import { UserRepository } from '../output/userRepository.interface';
import { IBcryptService } from 'src/User/domain/adapters/bcrypt.interface';
import { UserM } from 'src/User/domain/model/user';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async create(user: UserM): Promise<UserM> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.bcryptService.hash(user.password);
    const newUser = new UserM();
    newUser.id = user.id;
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hashedPassword;
    newUser.Role = user.Role;
    newUser.hashRefreshToken = '';
    return this.userRepository.create(newUser);
  }
}
