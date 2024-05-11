/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import { IRoleRequest, Roleslist } from 'src/models/roles-list.interface';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los roles disponibles en el sistema.
   * @returns La respuesta del servidor con la lista de roles.
   */
  getAllRoles() {
    return this.http.get<BodyResponse<Roleslist[]>>(`${environment.API_PUBLIC}/role`);
  }

  /**
   * Obtiene los roles que no tienen permiso en un módulo específico.
   * @param moduleId El ID del módulo.
   * @returns La respuesta del servidor con la lista de roles.
   */
  getRolesWithNotPermissionInModule(moduleId: number) {
    return this.http.get<BodyResponse<Roleslist[]>>(
      `${environment.API_PUBLIC}/role/not-included/module-id/${moduleId}`,
    );
  }

  /**
   * Crea un nuevo rol en el sistema.
   * @param payload Los datos del rol a crear.
   * @returns La respuesta del servidor con la lista de roles actualizada.
   */
  createRole(payload: IRoleRequest) {
    return this.http.post<BodyResponse<Roleslist[]>>(`${environment.API_PUBLIC}/role`, payload);
  }

  /**
   * Actualiza un rol existente en el sistema.
   * @param payload Los datos actualizados del rol.
   * @param roleId El ID del rol a actualizar.
   * @returns La respuesta del servidor con la lista de roles actualizada.
   */
  updateRole(payload: IRoleRequest, roleId: number) {
    return this.http.put<BodyResponse<Roleslist[]>>(
      `${environment.API_PUBLIC}/role/${roleId}`,
      payload,
    );
  }

  /**
   * Habilita o deshabilita un rol en el sistema.
   * @param roleId El ID del rol a habilitar o deshabilitar.
   * @param enabled Indica si se habilita o deshabilita el rol.
   * @returns La respuesta del servidor con la lista de roles actualizada.
   */
  enableDisableRole(roleId: number, enabled: boolean) {
    return this.http.delete<BodyResponse<Roleslist[]>>(
      `${environment.API_PUBLIC}/role/${roleId}/enabled/${enabled}`,
    );
  }
}
