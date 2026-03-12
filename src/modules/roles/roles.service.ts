import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { IRolesService } from './interfaces/roles-service.interface';

@Injectable()
export class RolesService implements IRolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async userHasRole(userId: number, roleName: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({
      where: {
        nome: roleName,
        usuarios: {
          id: userId,
        },
      },
      relations: ['usuarios'],
    });

    return !!role;
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
