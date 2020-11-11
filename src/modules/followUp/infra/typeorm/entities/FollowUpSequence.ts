import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import EmailModel from '@modules/followUp/infra/typeorm/entities/EmailModel';

@Entity('followUpSequence')
class FollowUpSequence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  userEmail: string;

  @ManyToOne(() => User, user => user.followUpSequence)
  user: User;

  @OneToMany(() => EmailModel, emailModel => emailModel.followUpSequence)
  emailModel: EmailModel[];

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default FollowUpSequence;
