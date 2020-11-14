import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddDaysAfterColumnInEmailModelTable1605318816329
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE emailModel
      ADD COLUMN daysAfter INTEGER NOT NULL
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE emailModel
      DROP COLUMN daysAfter
      `);
  }
}
