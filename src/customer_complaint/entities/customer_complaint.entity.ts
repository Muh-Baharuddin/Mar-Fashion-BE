import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
} from 'typeorm';

@Entity('customer_complaint')
export class CustomerComplaint {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column()
  description: string;
}
