import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ name: 'nama', nullable: false })
  nama: string;
}
