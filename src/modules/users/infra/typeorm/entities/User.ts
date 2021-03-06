import BumpSettings from '@modules/users/infra/typeorm/entities/BumpSettings';
import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export type UserType = 'free' | 'premium';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('boolean')
  premium: boolean;

  @Column('boolean')
  deleted: boolean;

  @Column()
  companyName: string;

  @Column('datetime')
  premiumInitialDate: Date;

  @Column('datetime')
  premiumEndDate: Date;

  @Column('date')
  billingDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  bumpSettingsId: string;

  @OneToOne(() => BumpSettings, { cascade: true })
  @JoinColumn()
  bumpSettings: BumpSettings;

  @OneToMany(() => FollowUpSequence, followUpSequence => followUpSequence.user)
  followUpSequence: FollowUpSequence[];

  @Column({
    type: 'enum',
    enum: ['free', 'premium'],
  })
  userType: UserType;
}

export default User;
