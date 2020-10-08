import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddListIdToEmails1602194908335
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'emails',
      new TableColumn({
        name: 'listId',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'emails',
      new TableForeignKey({
        name: 'listEmail',
        columnNames: ['listId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lists',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('emails', 'listEmail');
    await queryRunner.dropColumn('emails', 'listId');
  }
}
