import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Employees } from './employees.entity';

enum TypeSaving {
  SIMPANAN = 'SIMPANAN',
  AMBILAN = 'AMBILAN',
}

@Entity()
export class Employee_Saving {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id_saving: string;

  @Column()
  tanggal: Date;

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

  @ManyToOne(() => Employees, (employee) => employee.savings)
  employee: Employees[];

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
