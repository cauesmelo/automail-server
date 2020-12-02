import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddOriginalEmailColumnsToRecipients1606952679937
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE recipients
      ADD COLUMN subject TEXT,
      ADD COLUMN msgId VARCHAR(998) NOT NULL,
      ADD COLUMN fromEmail VARCHAR(255) NOT NULL,
      ADD COLUMN toEmail VARCHAR(255) NOT NULL;
      `);

    await queryRunner.query(`
      ALTER TABLE recipients
      DROP COLUMN email;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE recipients
    DROP COLUMN
      subject,
      msgId,
      fromEmail,
      toEmail;
    `);

    await queryRunner.query(`
    ALTER TABLE recipients
    ADD COLUMN
    email VARCHAR(255) NOT NULL;
    `);
  }
}
