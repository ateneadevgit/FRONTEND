export interface IModule {
  moduleId: number;
  name: string;
  icon: string;
  path: string;
  isMenu: boolean;
  createdAt: Date;
  createdBy: string;
  description: string | null;
}

export interface IModuleRequest {
  name: string;
  description: string | null;
}

export interface IPermissionModule {
  moduleId: number;
  roleId: number;
  canCreate: boolean;
  canUpdate: boolean;
  canView: boolean;
  canDelete: boolean;
  roleName: string;
}

export interface IPermissionRequest {
  hasWrite: boolean;
  hasEdit: boolean;
  hasView: boolean;
  hasDelete: boolean;
  moduleId: number;
  roleId: number;
}
