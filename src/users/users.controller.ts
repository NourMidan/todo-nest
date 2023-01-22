import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }
  @Post('/signin')
  login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }
  @Post('/validate')
  @UseGuards(AuthGuard())
  validate(@Request() req, @GetUser() user: User) {
    return user;
  }
}
