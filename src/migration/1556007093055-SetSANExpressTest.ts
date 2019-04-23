import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Phases from '../model/entity/Phases';

export class SetSANExpressTest1556007093055 implements MigrationInterface {

    private vs = [
        {
            values: { component: 'SANExpressTest' },
            where: 'component = :component',
            params: { component: 'SANTest' },
        },
    ];

    public async up(queryRunner: QueryRunner): Promise<any> {
        for (const v of this.vs) {
            await getConnection()
                .createQueryBuilder()
                .update(Phases)
                .set(v.values)
                .where(v.where, v.params)
                .execute();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
