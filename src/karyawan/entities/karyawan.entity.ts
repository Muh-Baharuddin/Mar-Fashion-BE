import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Karyawan {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: number;

  @Column()
  nama: string;

  @Column()
  alamat: string;

  @Column()
  nomor_telepon: string;
}
