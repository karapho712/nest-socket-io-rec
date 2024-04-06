import {
  NotFoundException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private findOneByIdOrFail(userId: string) {
    return this.userRepository.findOneByOrFail({ id: userId }).catch(() => {
      throw new NotFoundException('User not found');
    });
  }

  async findByEmail(email: string) {
    return this.userRepository
      .findOneOrFail({
        where: {
          email: email,
        },
      })
      .catch(() => {
        throw new UnauthorizedException('User not found');
      });
  }

  async findById(id: string) {
    const user = await this.userRepository
      .findOneByOrFail({
        id: id,
      })
      .catch(() => {
        throw new NotFoundException('User not found');
      });

    const rest = omit(user, 'password');

    return rest;
  }
}
