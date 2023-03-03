import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  tanggal: Date;

  @Column()
  barang: string;

  @Column()
  jumlah_barang: number;

  @Column()
  total_harga: number;
}
