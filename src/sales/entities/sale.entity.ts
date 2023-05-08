import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TypeUnit } from '../../purchases/types/type-unit.enum';
import { Item } from '../../items/entities/items.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  @Generated('increment')
  invoice: number;

  @Column()
  date: Date;

  @Column()
  customer: string;

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

  @OneToMany(() => Item, (item) => item.sale, { cascade: true })
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
