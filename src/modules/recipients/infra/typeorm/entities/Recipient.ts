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
import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';

@Entity('recipients')
class Recipient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  active: boolean;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @Column('datetime')
  lastBumpDay: Date;

  @Column('datetime')
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

  @Column()
  subject: string;

  @Column()
  msgId: string;

  @Column()
  fromEmail: string;

  @Column()
  toEmail: string;
}

export default Recipient;
