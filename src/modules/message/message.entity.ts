import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'messages' })
export class Message extends EntityRef {
  @Column()
  message: string;

  @ManyToOne('users', 'id', { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'userId' })
  user: EntityRef<User>;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
