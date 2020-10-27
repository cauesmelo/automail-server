import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import FollowUpSequence from '@modules/bumps/infra/typeorm/entities/FollowUpSequence';

@Entity('emailModel')
class EmailModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  followUpSequenceId: string;

  @ManyToOne(
    () => FollowUpSequence,
    followUpSequence => followUpSequence.emailModel,
  )
  followUpSequence: FollowUpSequence;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default EmailModel;
