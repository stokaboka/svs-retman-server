import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class InitDatabase1544706296141 implements MigrationInterface {

    private tableDictionary: Table = new Table({
        name: 'Dictionary',
        columns: [
            { name: 'id',       type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
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
            { name: 'id',       type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'group',    type: 'varchar',    length: '255' },
            { name: 'role',     type: 'varchar',    length: '255' },

        ],
    });

    private tableUsers: Table = new Table({
       name: 'Users',
       columns: [
           { name: 'id',        type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
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
            { name: 'id',       type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'user_id',  type: 'int' },
            { name: 'group_id', type: 'int' },
        ],
        foreignKeys: [
            { name: 'UsersGroupsUserId',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'Users',
                onDelete: 'CASCADE',
            },
            { name: 'UsersGroupsGroupId',
                columnNames: ['group_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'Groups',
                onDelete: 'CASCADE',
            },
        ],
    });

    private tableLessons: Table = new Table({
        name: 'Lessons',
        columns: [
            { name: 'id',       type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'num',     type: 'int' },
            { name: 'title',    type: 'varchar',    length: '255' },
            { name: 'scope',    type: 'varchar',    length: '255' },
            { name: 'brief_text',     type: 'varchar',    length: '1000' },
            { name: 'brief_sound1',    type: 'varchar',    length: '255' },
            { name: 'brief_sound2',    type: 'varchar',    length: '255' },
            { name: 'brief_time',     type: 'int' },
            { name: 'test_text',     type: 'varchar',    length: '1000' },
            { name: 'test_sound1',    type: 'varchar',    length: '255' },
            { name: 'test_sound2',    type: 'varchar',    length: '255' },
            { name: 'test_time',     type: 'int' },
            { name: 'stages',     type: 'int' },
            { name: 'pages',     type: 'int' },

        ],
    });

    private tableLessonsStages: Table = new Table({
        name: 'LessonsStages',
        columns: [
            { name: 'id',       type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'text',     type: 'varchar',    length: '1000' },
            { name: 'lesson',     type: 'int' },
            { name: 'sound1',    type: 'varchar',    length: '255' },
            { name: 'sound2',    type: 'varchar',    length: '255' },
            { name: 'time',     type: 'int' },
        ],
        foreignKeys: [
            { name: 'LessonsStagesId',
                columnNames: ['lesson'],
                referencedColumnNames: ['id'],
                referencedTableName: 'Lessons',
                onDelete: 'CASCADE',
            },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<any> {

        // await queryRunner.createDatabase('svs-retman', false);
        // await queryRunner.createSchema('svs-retman');

        await queryRunner.createTable(this.tableDictionary, true);
        await queryRunner.createTable(this.tableGroups, true);
        await queryRunner.createTable(this.tableUsers, true);
        await queryRunner.createTable(this.tableUsersGroups, true);

        await queryRunner.createTable(this.tableLessons, true);
        await queryRunner.createTable(this.tableLessonsStages, true);

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

        await queryRunner.dropTable(this.tableLessons, true);
        await queryRunner.dropTable(this.tableLessonsStages, true);

        await queryRunner.dropDatabase('svs-retman', true);

    }

}
