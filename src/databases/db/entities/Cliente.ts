import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Franqueado } from './Franqueado';

@Entity('Clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ type: 'varchar', length: 300, nullable: true })
    Nome: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    NomeAbreviado: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    CPFCNPJ: string;

    @CreateDateColumn()
    Criado: Date;

    @UpdateDateColumn()
    Atualizado: Date;

    @ManyToOne((type) => Franqueado, (franqueado) => franqueado.Clientes)
    Franqueado: Franqueado;
}
