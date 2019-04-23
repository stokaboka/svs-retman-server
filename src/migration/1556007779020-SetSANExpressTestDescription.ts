import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Phases from '../model/entity/Phases';

export class SetSANExpressTestDescription1556007779020 implements MigrationInterface {

    private vs = [
        {
            values: { text: '<p>Подумайте и оцените следующие параметры Вашего состояния:<br>самочувствия, активности и настроения, в соответствии с условной шкалой, где середина шкалы – норма</p> <p>Поставьте маркер в выбранное Вами место шкалы и нажмите левую клавишу "мыши"</p>'},
            where: 'component = :component',
            params: { component: 'SANExpressTest' },
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
