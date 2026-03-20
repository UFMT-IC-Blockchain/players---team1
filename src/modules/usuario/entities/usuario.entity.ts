import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('usuario', { schema: 'public' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'login', length: 10 })
  login: string;

<<<<<<< HEAD
  @Column('text', { name: 'senha' })
=======
  @Column('character varying', { name: 'senha', length: 10, nullable: true })
>>>>>>> ae2624fb8048cf5034d59562a0fcaa20a0f7f5ee
  senha: string;

  @ManyToMany(() => Role, (role) => role.usuarios)
  roles: Role[];
}
