import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KaryawanModule } from './karyawan/karyawan.module';
import { SupplierModule } from './supplier/supplier.module';
import { BarangModule } from './barang/barang.module';
import { NotaPembelianModule } from './nota-pembelian/nota-pembelian.module';
import { NotaPenjualanModule } from './nota-penjualan/nota-penjualan.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      migrationsTableName: 'migrations',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    KaryawanModule,
    SupplierModule,
    BarangModule,
    NotaPembelianModule,
    NotaPenjualanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
