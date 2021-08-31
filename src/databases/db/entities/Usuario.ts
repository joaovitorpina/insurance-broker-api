import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity('Usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    Id : number

    @Column({ type: 'varchar', length: 128 })
    Key: string
}
