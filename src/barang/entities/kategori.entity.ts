import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Barang } from './barang.entity';

@Entity()
export class Kategori {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @ManyToMany(() => Barang, (barang) => barang.kategori)
  barang: Barang[];
}
