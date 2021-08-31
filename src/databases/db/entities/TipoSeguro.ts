import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('TiposSeguros')
export class TipoSeguro {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nome: string;

    @Column()
    Descricao:string;

    @Column()
    PessoaFisica: boolean;

    @Column()
    PessoaJuridica: boolean;

    @CreateDateColumn()
    Criado: Date;

    @UpdateDateColumn()
    Atualizado: Date;
}
