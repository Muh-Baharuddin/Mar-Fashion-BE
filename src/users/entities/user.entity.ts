import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  KARYAWAN = 'KARYAWAN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.KARYAWAN,
  })
  role: UserRole;
}
