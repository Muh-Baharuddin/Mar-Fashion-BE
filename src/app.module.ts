import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employees/employee.module';
import { SupplierModule } from './supplier/supplier.module';
import { ItemsModule } from './items/item.module';
import { PurchaseModule } from './purchases/purchase.module';
import { SaleModule } from './sales/sale.module';
import { IncomeModule } from './incomes/income.module';
import { CustomerComplaintModule } from './customer_complaint/customer_complaint.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
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
    EmployeeModule,
    SupplierModule,
    ItemsModule,
    PurchaseModule,
    SaleModule,
    IncomeModule,
    CustomerComplaintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
