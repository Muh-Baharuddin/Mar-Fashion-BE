import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { TypeUnit } from '../../purchases/types/type-unit.enum';

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

  @OneToOne(() => Customer, (customer) => customer.sale, { lazy: true })
  @JoinColumn()
  customer: Promise<Customer>

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
