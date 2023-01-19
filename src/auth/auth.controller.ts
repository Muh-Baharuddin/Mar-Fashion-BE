import {
  Controller,
  Inject,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  // UseGuards,
  // Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
// import { JwtAuthGuard } from './auth.guard';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto): Promise<User | never> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto): Promise<string | never> {
    return this.authService.login(loginDto);
  }

  // @Post('refresh')
  // @UseGuards(JwtAuthGuard)
  // private refresh(
  //   @Req() token: string,
  //   { user }: Request,
  // ): Promise<string | never> {
  //   return this.authService.refresh(token, <User>user);
  // }
}
