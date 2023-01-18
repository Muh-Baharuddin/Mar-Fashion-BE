import {
  Controller,
  Inject,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() authDto: AuthDto): Promise<User | never> {
    return this.authService.register(authDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() authDto: AuthDto): Promise<string | never> {
    return this.authService.login(authDto);
  }
}
