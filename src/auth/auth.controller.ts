import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private authMethod: AuthService) {}

  @Post('/signup')
  createUser(@Body() data: UserDto) {
    return this.authMethod.signUp(data);
  }

  @Post('/signin')
  async signInUser(@Body() data: AuthSignInDto, @Res() res: Response) {
    const { token, user } = await this.authMethod.signIn(data);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json(user);
  }

  @Get('/signout')
  @UseGuards(AuthGuard)
  signOut(@Res() res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Sign out successfully' });
  }
}
