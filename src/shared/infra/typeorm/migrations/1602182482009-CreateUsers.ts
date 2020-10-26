import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1602182482009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'premium',
            type: 'boolean',
          },
          {
            name: 'deleted',
            type: 'boolean',
          },
          {
            name: 'companyName',
            type: 'varchar',
          },
          {
            name: 'premiumInitialDate',
            type: 'timestamp',
          },
          {
            name: 'premiumEndDate',
            type: 'timestamp',
          },
          {
            name: 'billingDate',
            type: 'date',
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
    await queryRunner.dropTable('users');
  }
}
