import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TypeSaving } from '../types/type-saving.enum';
import { Employee } from './employee.entity';

@Entity('employee_Savings')
export class Employee_Saving {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: TypeSaving,
    default: TypeSaving.SIMPANAN,
  })
  type: TypeSaving;

  @Column()
  total: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Employee, (employee) => employee.total_saving, { lazy: true })
  employee: Promise<Employee>;

  @CreateDateColumn({ 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
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
