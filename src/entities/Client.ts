import { Transaction } from "./Transaction";

import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

// inside entity, name the table
@Entity('clients')
// extending BaseEntity allows for the CRUD operations
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({
    default: true,
    name: "active",
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];
}
