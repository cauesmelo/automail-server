import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddUserEmailColumnToFollowUpSequenceTable1605131605952
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE followUpSequence
      ADD COLUMN userEmail VARCHAR(255) NOT NULL
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE followUpSequence
    DROP COLUMN userEmail
    `);
  }
}
