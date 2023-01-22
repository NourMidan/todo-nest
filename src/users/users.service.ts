import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  userResponse,
  userResponseWithToken,
} from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<userResponse> {
    const { password, email } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = await this.usersRepository.create({
      email,
      password: hash,
    });
    try {
      const { password, ...user } = await this.usersRepository.save(newUser);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        const message =
          error.detail.match(/\(([^)]+)\)/)[1] + ' already Exists';
        throw new ConflictException(message);
      }
    }
  }
  async login(createUserDto: CreateUserDto): Promise<userResponseWithToken> {
    const { password, email } = createUserDto;

    const user = await this.usersRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      const payload = { id: result.id };
      const token = this.jwt.sign(payload);
      return { ...result, token };
    } else {
      throw new UnauthorizedException('Wrong credentials');
    }
  }
  async validate(token: string): Promise<userResponse> {
    console.log(token);
    return null;
  }
}
