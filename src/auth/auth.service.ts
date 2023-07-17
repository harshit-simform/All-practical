import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignInDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private JwtService: JwtService,
  ) {}
  async signUp(userData: UserDto) {
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create(userData);
    console.log('done sign up');
    return this.userRepository.save(user);
  }

  async signIn(userData: AuthSignInDto) {
    const user = await this.userService.findUserByEmail(userData.email);
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return { token: await this.JwtService.signAsync({ ...user }), user };
  }
}
