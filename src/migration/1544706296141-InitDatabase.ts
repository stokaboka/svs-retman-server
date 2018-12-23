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
           { name: 'secondName', type: 'varchar',    length: '255' },
           { name: 'lastName',  type: 'varchar',    length: '255' },
           { name: 'birthday',  type: 'datetime' },
       ],
    });

    private tableUsersGroups: Table = new Table({
        name: 'UsersGroups',
        columns: [
            { name: 'id',       type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'userId',  type: 'int' },
            { name: 'groupId', type: 'int' },
        ],
        // foreignKeys: [
        //     { name: 'UsersGroupsUserId',
        //         columnNames: ['user_id'],
        //         referencedColumnNames: ['id'],
        //         referencedTableName: 'Users',
        //         onDelete: 'CASCADE',
        //     },
        //     { name: 'UsersGroupsGroupId',
        //         columnNames: ['group_id'],
        //         referencedColumnNames: ['id'],
        //         referencedTableName: 'Groups',
        //         onDelete: 'CASCADE',
        //     },
        // ],
    });

    private tableSteps: Table = new Table({
        name: 'Steps',
        columns: [
            { name: 'id',       type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'title',    type: 'varchar',    length: '255' },
            { name: 'lessons',  type: 'int'},
            { name: 'brief',  type: 'int'},
            { name: 'test',  type: 'int'},
            { name: 'learning',  type: 'int'},
            { name: 'briefText',     type: 'varchar',    length: '1000' },
        ],
    });

    private tableLessons: Table = new Table({
        name: 'Phases',
        columns: [
            { name: 'id',       type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'stepId',  type: 'int' },
            { name: 'num',      type: 'int' },
            { name: 'title',    type: 'varchar',    length: '255' },
            { name: 'scope',    type: 'varchar',    length: '255' },
            { name: 'briefText',     type: 'varchar',    length: '1000' },
            { name: 'briefSound1',    type: 'varchar',    length: '255' },
            { name: 'briefSound2',    type: 'varchar',    length: '255' },
            { name: 'briefTime',     type: 'int' },
            { name: 'testText',     type: 'varchar',    length: '1000' },
            { name: 'testSound1',    type: 'varchar',    length: '255' },
            { name: 'testSound2',    type: 'varchar',    length: '255' },
            { name: 'testTime',     type: 'int' },
            { name: 'stages',     type: 'int' },
            { name: 'pages',     type: 'int' },

        ],
        // foreignKeys: [
        //     { name: 'PhasesStepId',
        //         columnNames: ['stepId'],
        //         referencedColumnNames: ['id'],
        //         referencedTableName: 'Steps',
        //         onDelete: 'CASCADE',
        //     },
        // ],
    });

    private tableLessonStages: Table = new Table({
        name: 'LessonStages',
        columns: [
            { name: 'id',           type: 'int',        isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'lang',         type: 'varchar',    length: '255' },
            { name: 'briefText',   type: 'varchar',    length: '1000' },
            { name: 'stepId',      type: 'int' },
            { name: 'phaseNum',    type: 'int' },
            { name: 'lesson',       type: 'int' },
            { name: 'stage',        type: 'int' },
            { name: 'scope',        type: 'varchar',    length: '255' },
            { name: 'sound',        type: 'varchar',    length: '255' },
            { name: 'time',         type: 'int' },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<any> {

        // await queryRunner.dropTable('migrations', true);
        //
        // await queryRunner.dropTable('UsersGroups', true);
        // await queryRunner.dropTable('Groups', true);
        // await queryRunner.dropTable('Users', true);
        //
        // await queryRunner.dropTable('Dictionary', true);
        // await queryRunner.dropTable('Steps', true);
        // await queryRunner.dropTable('Phases', true);
        // await queryRunner.dropTable('LessonStages', true);

        // await queryRunner.createDatabase('svs-retman', false);
        // await queryRunner.createSchema('svs-retman');

        await queryRunner.createTable(this.tableDictionary, true);
        await queryRunner.createTable(this.tableGroups, true);
        await queryRunner.createTable(this.tableUsers, true);
        await queryRunner.createTable(this.tableUsersGroups, true);

        await queryRunner.createTable(this.tableSteps, true);

        await queryRunner.createTable(this.tableLessons, true);
        await queryRunner.createTable(this.tableLessonStages, true);

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

        await queryRunner.dropTable(this.tableSteps, true);
        await queryRunner.dropTable(this.tableLessons, true);
        await queryRunner.dropTable(this.tableLessonStages, true);

        await queryRunner.dropDatabase('svs-retman', true);

    }

}
