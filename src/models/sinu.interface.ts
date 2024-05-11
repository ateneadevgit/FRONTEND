export interface DirectorsRole {
  userId: string;
  userEmail: string;
  roleId: number;
  selected: boolean;
}

export interface IUserRoleSearch {
  roles: number[];
}
