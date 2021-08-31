import {MigrationInterface, QueryRunner} from "typeorm";

export class BancoV1111597259802173 implements MigrationInterface {
    name = 'BancoV1111597259802173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Franqueados` ADD `IdCol` bigint NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Franqueados` DROP COLUMN `IdCol`");
    }

}
