import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthHelper } from './auth.helper';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: 'dev',
      signOptions: {
        expiresIn: '30s',
      },
    }),
    // TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, AuthHelper, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
