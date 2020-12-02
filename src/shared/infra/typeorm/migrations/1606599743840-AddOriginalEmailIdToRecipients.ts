import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddOriginalEmailIdToRecipients1606599743840
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

      ALTER TABLE recipients
      ADD COLUMN originalEmailId CHAR(36) NOT NULL
      `);

    await queryRunner.query(`
      ALTER TABLE recipients
      ADD CONSTRAINT FKOriginalEmailRecipients
      FOREIGN KEY (originalEmailId) REFERENCES originalEmail(id)
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE recipients
    DROP FOREIGN KEY FKOriginalEmailRecipients
  `);

    await queryRunner.query(`
    ALTER TABLE recipients
    DROP COLUMN originalEmailId
  `);
  }
}
