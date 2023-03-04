import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { TypeUnit } from '../../purchases/types/type-unit.enum';
import { Item } from '../../items/entities/items.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: TypeUnit,
    default: TypeUnit.PCS,
  })
  unit: TypeUnit;

  @Column()
  total_sales: number;

  @Column()
  total_price: number;

  @ManyToOne(() => Customer, (customer) => customer.sale, { lazy: true })
  customer: Promise<Customer>;

  @OneToMany(() => Item, (items) => items.sale, { lazy: true })
  items: Promise<Item[]>;

  @CreateDateColumn({ 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()' ,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updated_at: Date;

  @Column({ nullable: true })
  create_by: string;

  @Column({ nullable: true })
  update_by: string;
}
