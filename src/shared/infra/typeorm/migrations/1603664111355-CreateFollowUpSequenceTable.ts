import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateFollowUpSequenceTable1603664111355
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE followUpSequence(
    id CHAR(36) NOT NULL PRIMARY KEY,
    userId CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    `);

    await queryRunner.query(`
    ALTER TABLE followUpSequence
    ADD CONSTRAINT FKUserIdFollowUp
    FOREIGN KEY (userId) REFERENCES users(id)
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE followUpSequence
    `);
  }
}
