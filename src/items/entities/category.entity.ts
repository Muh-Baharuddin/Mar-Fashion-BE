import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Generated,
} from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  nama: string;

  @ManyToMany(() => Items, (item) => item.categories)
  items: Promise<Items[]>;
}