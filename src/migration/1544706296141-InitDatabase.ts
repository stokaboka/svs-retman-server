import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class InitDatabase1544706296141 implements MigrationInterface {

    private tableDictionary: Table = new Table({
        name: 'Dictionary',
        columns: [
            { name: 'id',       type: 'int',        isPrimary: true },
            { name: 'word1',    type: 'varchar',    length: '255' },
            { name: 'word2',    type: 'varchar',    length: '255' },
            { name: 'lang1',    type: 'char',       length: '10' },
            { name: 'lang2',    type: 'char',       length: '10' },
            { name: 'scope',    type: 'varchar',    length: '255' },
        ],
    });

    private tableGroups: Table = new Table({
        name: 'Groups',
        columns: [
            { name: 'id',       type: 'int',        isPrimary: true },
            { name: 'group',    type: 'varchar',    length: '255' },
            { name: 'role',     type: 'varchar',    length: '255' },

        ],
    });

    private tableUsers: Table = new Table({
       name: 'Users',
       columns: [
           { name: 'id',        type: 'int',        isPrimary: true },
           { name: 'login',     type: 'varchar',    length: '255', isUnique: true },
           { name: 'password',  type: 'varchar',    length: '255' },
           { name: 'firstName', type: 'varchar',    length: '255' },
           { name: 'secondName',type: 'varchar',    length: '255' },
           { name: 'lastName',  type: 'varchar',    length: '255' },
           { name: 'birthday',  type: 'datetime' },
       ],
    });

    private tableUsersGroups: Table = new Table({
        name: 'UsersGroups',
        columns: [
            { name: 'id',       type: 'int', isPrimary: true },
            { name: 'user_id',  type: 'int' },
            { name: 'group_id', type: 'int' },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<any> {

            await queryRunner.createDatabase('svs-retman', true);

            await queryRunner.createTable(this.tableDictionary);
            await queryRunner.createTable(this.tableGroups);
            await queryRunner.createTable(this.tableUsers);
            await queryRunner.createTable(this.tableUsersGroups);

            await queryRunner.createForeignKey('UsersGroups',
                new TableForeignKey({
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Users',
                    onDelete: 'CASCADE',
                }));

            await queryRunner.createForeignKey('UsersGroups',
                new TableForeignKey({
                    columnNames: ['group_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'Groups',
                    onDelete: 'CASCADE',
                }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        const tUsersGroups = await queryRunner.getTable('UsersGroups');

        const foreignKeyUserId = tUsersGroups.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
        const foreignKeyGroupId = tUsersGroups.foreignKeys.find((fk) => fk.columnNames.indexOf('group_id') !== -1);

        if (foreignKeyUserId) {
            await queryRunner.dropForeignKey('UsersGroups', foreignKeyUserId);
        }
        if (foreignKeyGroupId) {
            await queryRunner.dropForeignKey('UsersGroups', foreignKeyGroupId);
        }

        await queryRunner.dropTable(this.tableDictionary.name, true);
        await queryRunner.dropTable(this.tableGroups.name, true);
        await queryRunner.dropTable(this.tableUsers.name, true);
        await queryRunner.dropTable(this.tableUsersGroups.name, true);

        await queryRunner.dropDatabase('svs-retman', true);

    }

}
