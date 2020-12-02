import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';
import OriginalEmail from './OriginalEmail';

@Entity('recipients')
class Recipient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

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

  @Column()
  originalEmailId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  User: User;

  @ManyToOne(() => FollowUpSequence)
  @JoinColumn({ name: 'followUpSequenceId' })
  followUpSequence: FollowUpSequence;

  @OneToOne(() => OriginalEmail)
  @JoinColumn({ name: 'originalEmailId ' })
  originalEmail: OriginalEmail;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Recipient;
