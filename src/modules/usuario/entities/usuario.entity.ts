import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity("usuario", { schema: "public" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "login", length: 10 })
  login: string;

  @Column("character varying", { name: "senha", length: 10 })
  senha: string;

  @ManyToMany(() => Role, (role) => role.usuarios)
  roles: Role[];
}
