export interface IRolesService {
  userHasRole(userId: number, roleName: string): Promise<boolean>;
}
