import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddVolumeToPhasesTable1554796498860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('Phases', new TableColumn({
            name: 'soundVolume',
            type: 'int',
            isNullable: false,
            default: 100,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
