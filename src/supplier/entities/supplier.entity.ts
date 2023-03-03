import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  phone_number: string;

  @Column()
  account_number: string;

  @Column()
  account_owner: string;

  @OneToMany(() => Purchase, purchase => purchase.supplier, { lazy: true })
  purchases: Promise<Purchase[]>;

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
