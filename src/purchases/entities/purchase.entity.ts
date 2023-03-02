import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  tanggal: Date;

  @Column()
  supplier: string;

  @Column()
  barang: string;

  @Column()
  biaya: number;
}
