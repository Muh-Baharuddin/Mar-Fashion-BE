import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Retur {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  tanggal: Date;

  @Column()
  barang: string;

  @Column()
  jumlah: number;

  @Column()
  harga: number;

  @Column()
  keterangan: string;
}
