import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import { DirectorsRole, IUserRoleSearch } from 'src/models/sinu.interface';

@Injectable({
  providedIn: 'root',
})
export class SinuService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los directores asociados a un rol específico.
   * @param roleId El ID del rol para el que se desean obtener los directores.
   * @returns La respuesta del servidor con la lista de directores.
   */
  getAllDirectors(roleId: number) {
    return this.http.get<BodyResponse<DirectorsRole[]>>(
      `${environment.API_PUBLIC}/sinu/user/by-role/${roleId}`,
    );
  }

  /**
   * Obtiene usuarios por roles específicos.
   * @param payload Los criterios de búsqueda de usuarios por roles.
   * @returns La respuesta del servidor con la lista de usuarios que cumplen con los criterios.
   */
  getUsersByRoles(payload: IUserRoleSearch) {
    return this.http.post<BodyResponse<DirectorsRole[]>>(
      `${environment.API_PUBLIC}/sinu/user/by-role`,
      payload,
    );
  }
}
