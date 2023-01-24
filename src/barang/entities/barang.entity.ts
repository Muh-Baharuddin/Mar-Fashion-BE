import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Generated,
} from 'typeorm';
import { Kategori } from './kategori.entity';

@Entity()
export class Barang {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

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
  kategori: Promise<Kategori[]>;
}
