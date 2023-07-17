import { Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getUserProfile(@Req() req: Request) {
    return req['user'];
  }

  @Patch('/:id')
  updateUserById() {
    return 'working';
  }

  @Delete('/:id')
  deleteUserById() {
    return 'working';
  }
}
