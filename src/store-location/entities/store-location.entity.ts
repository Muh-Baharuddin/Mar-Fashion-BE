import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('store_locations')
export class StoreLocation {
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

  @Column()
  bank: string;

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
