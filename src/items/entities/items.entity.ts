import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id_item: string;

  @Column()
  brand: string;

  @Column()
  capital_price: number;

  @Column()
  wholescale_price: number;

  @Column()
  stock: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP()" })
  public updated_at: Date;

  @Column({nullable: true})
  create_by: string;

  @Column({nullable: true})
  update_by: string;

  @ManyToMany(() => Category, (category) => category.items)
  @JoinTable()
  categories: Promise<Category[]>;
}
