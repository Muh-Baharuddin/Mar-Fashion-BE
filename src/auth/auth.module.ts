import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { AuthHelper } from './auth.helper';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, JwtService, AuthHelper],
  controllers: [AuthController],
})
export class AuthModule {}
