import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Generated,
} from 'typeorm';
import { Item } from './items.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Item, (item) => item.categories)
  items: Promise<Item[]>;
}
