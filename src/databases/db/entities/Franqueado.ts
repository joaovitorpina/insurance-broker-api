import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Cliente } from './Cliente';

@Entity('Franqueados')
export class Franqueado {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    NomeConta: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Email: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    EmailCotacao: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    EmailCobranca: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Telefone: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    Celular: string;

    @Column({ type: 'bigint', nullable: true })
    IdCol: number;

    @CreateDateColumn()
    Criado: Date;

    @UpdateDateColumn()
    Atualizado: Date;

    @OneToMany((type) => Cliente, (cliente) => cliente.Franqueado)
    Clientes: Cliente[];
}
