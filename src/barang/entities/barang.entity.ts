import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Barang {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  merek: string;

  @Column()
  jenis_barang: string;

  @Column()
  size: string;

  @Column()
  warna: string;

  @Column()
  stok: number;

  @Column()
  harga: number;
}
