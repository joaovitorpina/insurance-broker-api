import { MigrationInterface, QueryRunner } from 'typeorm';

export class BancoV1001594234697003 implements MigrationInterface {
    name = 'BancoV1001594234697003'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `Franqueados` (`Id` int NOT NULL AUTO_INCREMENT, `NomeConta` varchar(1000) NOT NULL, `Email` varchar(150) NOT NULL, `EmailCotacao` varchar(150) NOT NULL, `EmailCobranca` varchar(150) NOT NULL, `Telefone` varchar(150) NOT NULL, `Celular` varchar(150) NOT NULL, `Criado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Atualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`Id`)) ENGINE=InnoDB');
      await queryRunner.query('CREATE TABLE `Clientes` (`Id` int NOT NULL AUTO_INCREMENT, `Nome` varchar(300) NOT NULL, `NomeAbreviado` varchar(150) NOT NULL, `CPFCNPJ` varchar(30) NOT NULL, `Criado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Atualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `franqueadoId` int NULL, PRIMARY KEY (`Id`)) ENGINE=InnoDB');
      await queryRunner.query('CREATE TABLE `TiposSeguros` (`Id` int NOT NULL AUTO_INCREMENT, `Nome` varchar(255) NOT NULL, `Descricao` varchar(255) NOT NULL, `PessoaFisica` tinyint NOT NULL, `PessoaJuridica` tinyint NOT NULL, `Criado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Atualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`Id`)) ENGINE=InnoDB');
      await queryRunner.query('ALTER TABLE `Clientes` ADD CONSTRAINT `FK_9e6076538e32889cb19d2de297f` FOREIGN KEY (`franqueadoId`) REFERENCES `Franqueados`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `Clientes` DROP FOREIGN KEY `FK_9e6076538e32889cb19d2de297f`');
      await queryRunner.query('DROP TABLE `TiposSeguros`');
      await queryRunner.query('DROP TABLE `Clientes`');
      await queryRunner.query('DROP TABLE `Franqueados`');
    }
}
