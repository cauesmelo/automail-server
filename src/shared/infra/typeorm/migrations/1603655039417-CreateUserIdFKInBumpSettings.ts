import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateUserIdFKInBumpSettings1603655039417
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE bumpSettings
    ADD COLUMN userId CHAR(36) NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE bumpSettings
      ADD CONSTRAINT FKUserId
      FOREIGN KEY (userId) REFERENCES users(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE bumpSettings
      DROP FOREIGN KEY FKUserId
    `);

    await queryRunner.query(`
    ALTER TABLE bumpSettings
    DROP COLUMN userId
    `);
  }
}
