import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';
import Phases from '../model/entity/Phases';

export class AddPhasesVideoHelp1555438371414 implements MigrationInterface {

    private where = 'step = :step AND phase = :phase AND num=:num AND action=:action';

    private vs = [
        {
            video: 'mnemic1.mp4',
            params: { step: 3, phase: 1, num: 1, action: 'BRIEF' },
        },
        {
            video: 'mnemic2.mp4',
            params: { step: 3, phase: 2, num: 3, action: 'BRIEF' },
        },
        {
            video: 'selfrating.mp4',
            params: { step: 4, phase: 1, num: 1, action: 'BRIEF' },
        },
        {
            video: 'langs3.mp4',
            params: { step: 4, phase: 2, num: 3, action: 'BRIEF' },
        },
        {
            video: 'words100_1.mp4',
            params: { step: 5, phase: 1, num: 1, action: 'BRIEF' },
        },
        {
            video: 'words100_2.mp4',
            params: { step: 5, phase: 2, num: 3, action: 'BRIEF' },
        },
        {
            video: 'san.mp4',
            params: { step: 6, phase: 1, num: 1, action: 'BRIEF' },
        },
        {
            video: 'lesson.mp4',
            params: { step: 7, phase: 1, num: 1, action: 'BRIEF' },
        },
        {
            video: 'words100_1.mp4',
            params: { step: 8, phase: 1, num: 1, action: 'BRIEF' },
        },
        {
            video: 'words100_2.mp4',
            params: { step: 8, phase: 2, num: 3, action: 'BRIEF' },
        },
    ];

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query('ALTER TABLE `Phases` ADD COLUMN `video` VARCHAR(500) NULL AFTER `component`');

        for (const v of this.vs) {
            await getConnection()
                .createQueryBuilder()
                .update(Phases)
                .set({video: v.video})
                .where(this.where, v.params)
                .execute();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
