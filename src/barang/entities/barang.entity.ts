import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Kategori } from './kategori.entity';

@Entity()
export class Barang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  merek: string;

  @Column()
  size: string;

  @Column()
  warna: string;

  @Column()
  stok: number;

  @Column()
  harga: number;

  @ManyToMany(() => Kategori, (kategori) => kategori.barang)
  @JoinTable()
  kategori: Kategori[];
}
