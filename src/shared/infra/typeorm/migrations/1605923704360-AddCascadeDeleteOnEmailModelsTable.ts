import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddCascadeDeleteOnEmailModelsTable1605923704360
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE emailModel
      DROP CONSTRAINT FKFollowUpIdEmailModel
      `);

    await queryRunner.query(`
      ALTER TABLE emailModel
      ADD CONSTRAINT FKFollowUpIdEmailModel
      FOREIGN KEY (followUpSequenceId) REFERENCES followUpSequence(id)
      ON DELETE CASCADE
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE emailModel
      DROP CONSTRAINT FKFollowUpIdEmailModel
      `);

    await queryRunner.query(`
      ALTER TABLE emailModel
      ADD CONSTRAINT FKFollowUpIdEmailModel
      FOREIGN KEY (followUpSequenceId) REFERENCES followUpSequence(id)
      `);
  }
}
