import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateOriginalEmailTable1606533702479
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE originalEmail(
        id CHAR(36) NOT NULL PRIMARY KEY,
        subject TEXT,
        msgId VARCHAR(998) NOT NULL,
        fromEmail VARCHAR(255) NOT NULL,
        toEmail VARCHAR(255) NOT NULL,
        createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
        updatedAt timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE originalEmail
      `);
  }
}
