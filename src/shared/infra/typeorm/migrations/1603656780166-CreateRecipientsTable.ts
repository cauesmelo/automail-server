import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateRecipientsTable1603656780166
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
    CREATE TABLE recipients(
      id CHAR(36) NOT NULL,
      userId CHAR(36) NOT NULL,
      followUpSequenceId CHAR(36) NOT NULL,
      email VARCHAR(255) NOT NULL,
      active boolean NOT NULL,
      startDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      endDate datetime,
      lastBumpDay datetime NOT NULL,
      nextBumpDay datetime NOT NULL,
      createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
      updatedAt timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    `,
    );

    await queryRunner.query(`
      ALTER TABLE recipients
      ADD CONSTRAINT FKUserIdRecipients
      FOREIGN KEY (userId) REFERENCES users(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE recipients
    `);
  }
}
