import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class InitDatabase1544706296141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        // const hasDatabase = await queryRunner.hasDatabase('svs-retman');
        // if (!hasDatabase) {
            await queryRunner.createDatabase('svs-retman', true);
        // }

        await queryRunner.createTable(
            new Table(
                name: 'Dictionary',
                columns: [

        ]
            )
        );


        CREATE TABLE `Dictionary` (`id` int NOT NULL AUTO_INCREMENT, `word1` varchar(255) NOT NULL, `word2` varchar(255) NOT NULL, `lang1` char(10) NOT NULL, `lang2` char(10) NOT NULL, `scope` varchar(255) NOT NULL, UNIQUE INDEX `IDX_ad8e0884ae478b9ebf1d560a25` (`word1`), PRIMARY KEY (`id`)) ENGINE=InnoDB
        query: CREATE TABLE `Groups` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, UNIQUE INDEX `IDX_d7650def7a54c77759fb05070b` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB
        query: CREATE TABLE `Users` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `secondName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `birthday` datetime NOT NULL, UNIQUE INDEX `IDX_03599a389e75563b8314f74278` (`login`), PRIMARY KEY (`id`)) ENGINE=InnoDB
        query: CREATE TABLE `UsersGroups` (`id` int NOT NULL AUTO_INCREMENT, `idUser` int NOT NULL, `idGroup` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
