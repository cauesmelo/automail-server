import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AdduserTypeColumnToUsersTable1603646216897
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN userType ENUM('free', 'premium') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users DROP COLUMN userType
    `);
  }
}
