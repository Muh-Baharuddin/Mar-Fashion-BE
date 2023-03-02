import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Employee_Saving } from './employee_saving.entity';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id_employee: string;

  @Column()
  nama: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  entry_date: Date;

  @Column()
  exit_date: Date;

  @Column()
  total_saving: number;

  @OneToMany(() => Employee_Saving, saving => saving.employee)
  savings: Employee_Saving[];

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
