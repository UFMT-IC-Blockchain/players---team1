import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get('check/:userId/:roleName')
  async checkRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleName') roleName: string,
  ) {
    const hasRole = await this.rolesService.userHasRole(userId, roleName);
    return { hasRole };
  }
}
