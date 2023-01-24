import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Generated,
} from 'typeorm';
import { Barang } from './barang.entity';

@Entity()
export class Kategori {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  nama: string;

  @ManyToMany(() => Barang, (barang) => barang.kategori)
  barang: Promise<Barang[]>;
}
