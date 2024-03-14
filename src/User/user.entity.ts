import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 80 })
  password: string;

  @Column({ type: 'boolean', default: false })
  google: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  notification_token: string;

  @Column({ type: 'boolean', default: false })
  state: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
