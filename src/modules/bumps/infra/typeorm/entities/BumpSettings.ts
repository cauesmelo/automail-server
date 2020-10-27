import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

export type DaysOfWeek =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
@Entity('bumpSettings')
class BumpSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timezone: string;

  @Column()
  userId: string;

  @OneToOne(() => User)
  user: User;

  @Column({
    type: 'set',
    enum: [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ],
  })
  bumpDays: DaysOfWeek[];

  @Column('time')
  bumpTimeStart: Date;

  @Column('time')
  bumpTimeEnd: Date;

  @Column('boolean')
  bumpCopy: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default BumpSettings;
