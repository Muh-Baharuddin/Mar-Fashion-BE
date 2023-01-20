import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  nama: string;

  @Column()
  alamat: string;

  @Column()
  nomor_telepon: string;
}
