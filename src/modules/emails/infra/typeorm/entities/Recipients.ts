import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import FollowUpSequence from '@modules/bumps/infra/typeorm/entities/FollowUpSequence';

@Entity('recipients')
class Recipients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column('boolean')
  active: boolean;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @Column('timestamp')
  lastBumpDay: Date;

  @Column('timestamp')
  nextBumpDay: Date;

  @Column()
  userId: string;

  @Column()
  followUpSequenceId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  User: User;

  @ManyToOne(() => FollowUpSequence)
  @JoinColumn({ name: 'followUpSequenceId' })
  followUpSequence: FollowUpSequence;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Recipients;
