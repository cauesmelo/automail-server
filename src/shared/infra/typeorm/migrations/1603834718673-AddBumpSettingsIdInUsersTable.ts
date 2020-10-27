import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddBumpSettingsIdInUsersTable1603834718673
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN bumpSettingsId CHAR(36)
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE users
    DROP COLUMN bumpSettingsId
    `);
  }
}
