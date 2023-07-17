import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    const [user] = await this.userRepository.findBy({ email });
    console.log(user, 'in user');

    if (!user) {
      throw new NotFoundException('No user found with this email');
    }
    return user;
  }
}
