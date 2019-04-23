import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Phases from '../model/entity/Phases';

export class SetSANExpressTestResultComponent1556021300591 implements MigrationInterface {

    private vs = [
        {
            values: { component: 'SANExpressResult'},
            where: 'action = :action AND result = :result',
            params: { action: 'BRIEF', result: 'san' },
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
