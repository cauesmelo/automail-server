import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBumpSettings1603653362750
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bumpSettings',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'timezone',
            type: 'varchar',
          },
          {
            name: 'bumpDays',
            type: `set('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')`,
          },
          {
            name: 'bumpTimeStart',
            type: 'timestamp',
          },
          {
            name: 'bumpTimeEnd',
            type: 'timestamp',
          },
          {
            name: 'bumpCopy',
            type: 'boolean',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bumpSettings');
  }
}
