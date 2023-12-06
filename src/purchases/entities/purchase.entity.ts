import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Item } from '../../items/entities/items.entity';
import { TypeUnit } from '../types/type-unit.enum';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { Expense } from '../../expenses/entities/expense.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  @Generated('increment')
  invoice: number;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: TypeUnit,
    default: TypeUnit.PCS,
  })
  unit: TypeUnit;

  @Column()
  amount: number;

  @Column()
  total: number;

  @Column({ nullable: true })
  debt: number;

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

  @OneToMany(() => Item, (items) => items.purchases)
  items: Promise<Item[]>;

  @ManyToOne(() => Supplier, supplier => supplier.purchases, { lazy: true })
  supplier: Promise<Supplier>;

  @ManyToOne(() => Expense, expenses => expenses.purchases, { lazy: true })
  expense: Promise<Expense>;
}
