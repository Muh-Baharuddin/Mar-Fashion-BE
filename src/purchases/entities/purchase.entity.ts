import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, CreateDateColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Item } from '../../items/entities/items.entity';
import { TypeUnit } from '../types/type-unit.enum';
import { Supplier } from '../../supplier/entities/supplier.entity';

@Entity('purchases')
export class Purchase {
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
  cost: number;

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

  @ManyToMany(() => Item, (items) => items.purchases)
  items: Promise<Item[]>;

  @ManyToOne(() => Supplier, supplier => supplier.purchases, { lazy: true })
  supplier: Promise<Supplier>;
}
