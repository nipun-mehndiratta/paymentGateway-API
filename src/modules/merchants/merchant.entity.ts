import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  accountBalance: number;

  @Column('jsonb')
  settlementHistory: { amount: number; date: Date }[];
}
