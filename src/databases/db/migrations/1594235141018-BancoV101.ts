import { MigrationInterface, QueryRunner } from 'typeorm';

export class BancoV1011594235141018 implements MigrationInterface {
    name = 'BancoV1011594235141018'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `NomeConta` `NomeConta` varchar(1000) NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `Email` `Email` varchar(150) NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `EmailCotacao` `EmailCotacao` varchar(150) NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `EmailCobranca` `EmailCobranca` varchar(150) NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `Telefone` `Telefone` varchar(150) NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `Celular` `Celular` varchar(150) NULL');
      await queryRunner.query('ALTER TABLE `Clientes` CHANGE `Nome` `Nome` varchar(300) NULL');
      await queryRunner.query('ALTER TABLE `Clientes` CHANGE `NomeAbreviado` `NomeAbreviado` varchar(150) NULL');
      await queryRunner.query('ALTER TABLE `Clientes` CHANGE `CPFCNPJ` `CPFCNPJ` varchar(30) NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `Clientes` CHANGE `CPFCNPJ` `CPFCNPJ` varchar(30) NOT NULL');
      await queryRunner.query('ALTER TABLE `Clientes` CHANGE `NomeAbreviado` `NomeAbreviado` varchar(150) NOT NULL');
      await queryRunner.query('ALTER TABLE `Clientes` CHANGE `Nome` `Nome` varchar(300) NOT NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `Celular` `Celular` varchar(150) NOT NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `Telefone` `Telefone` varchar(150) NOT NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `EmailCobranca` `EmailCobranca` varchar(150) NOT NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `EmailCotacao` `EmailCotacao` varchar(150) NOT NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `Email` `Email` varchar(150) NOT NULL');
      await queryRunner.query('ALTER TABLE `Franqueados` CHANGE `NomeConta` `NomeConta` varchar(1000) NOT NULL');
    }
}
