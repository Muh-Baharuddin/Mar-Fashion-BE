import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, CreateDateColumn, OneToOne } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  total_sales: number;

  @Column()
  total_price: number;

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
