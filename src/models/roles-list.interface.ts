export interface Roleslist {
  roleId: number;
  nameRole: string;
  sinuId: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  description: string | null;
}

export interface IRoleRequest {
  description: string | null;
  sinuId: string;
  nameRole: string;
}
