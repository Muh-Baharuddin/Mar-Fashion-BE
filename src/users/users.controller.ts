import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserResponse } from './types/user.response.type';
import { PaginationUserDto } from './dto/pagination-user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get()
  async findAllUser(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationDto: PaginationUserDto,
  ): Promise<UserResponse>{
    return this.usersService.findAllUser(paginationDto);
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id/ubah-password')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updatePass(id, updateUserDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeUser(id);
  }
}
