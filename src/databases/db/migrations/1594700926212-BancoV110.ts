import {MigrationInterface, QueryRunner} from "typeorm";

export class BancoV1101594700926212 implements MigrationInterface {
    name = 'BancoV1101594700926212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Usuarios` (`Id` int NOT NULL AUTO_INCREMENT, `Key` varchar(128) NOT NULL, PRIMARY KEY (`Id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `Usuarios`");
    }

}
