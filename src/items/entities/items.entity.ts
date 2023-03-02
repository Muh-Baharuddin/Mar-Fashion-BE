import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Generated,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Items {
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

  @ManyToMany(() => Category, (kategori) => kategori.barang)
  @JoinTable()
  kategori: Promise<Category[]>;
}
