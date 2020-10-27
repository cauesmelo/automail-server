import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateEmailModelTable1603707085310
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE emailModel(
        id CHAR(36) NOT NULL PRIMARY KEY,
        userId CHAR(36) NOT NULL,
        followUpSequenceId CHAR(36) NOT NULL,
        content TEXT NOT NULL,
        createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
        updatedAt timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
      `);

    await queryRunner.query(`
      ALTER TABLE emailModel
      ADD CONSTRAINT FKFollowUpIdEmailModel
      FOREIGN KEY (followUpSequenceId) REFERENCES followUpSequence(id)
      `);

    await queryRunner.query(`
      ALTER TABLE emailModel
      ADD CONSTRAINT FKUserIdEmailModel
      FOREIGN KEY (userId) REFERENCES users(id)
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE emailModel
    `);
  }
}
