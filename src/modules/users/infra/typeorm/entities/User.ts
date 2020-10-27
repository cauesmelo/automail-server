import BumpSettings from '@modules/bumps/infra/typeorm/entities/BumpSettings';
import FollowUpSequence from '@modules/bumps/infra/typeorm/entities/FollowUpSequence';
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

  @Column('timestamp')
  premiumInitialDate: Date;

  @Column('timestamp')
  premiumEndDate: Date;

  @Column('date')
  billingDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => BumpSettings)
  @JoinColumn()
  bumpSettings: BumpSettings;

  @OneToMany(() => FollowUpSequence, followUpSequence => followUpSequence.user)
  followUpSequence: FollowUpSequence[];
}

export default User;
