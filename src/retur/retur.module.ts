import { Module } from '@nestjs/common';
import { ReturService } from './retur.service';
import { ReturController } from './retur.controller';
import { Retur } from './entities/retur.entity';
import { ReturRepository } from './retur.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Retur])],
  controllers: [ReturController],
  providers: [ReturService, ReturRepository]
})
export class ReturModule {}
