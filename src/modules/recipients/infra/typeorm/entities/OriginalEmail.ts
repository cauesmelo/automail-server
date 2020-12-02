import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('originalEmail')
class OriginalEmail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  msgId: string;

  @Column()
  subject: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default OriginalEmail;
