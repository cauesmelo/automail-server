import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddFollowUpSequenceIdInRecipientsTable1603666224959
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE recipients
      ADD CONSTRAINT FKFollowUpIdRecipients
      FOREIGN KEY (followUpSequenceId) REFERENCES followUpSequence(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE recipients
    DROP FOREIGN KEY FKFollowUpIdRecipients
  `);
  }
}
