import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IModule,
  IModuleRequest,
  IPermissionModule,
  IPermissionRequest,
} from 'src/models/admin/module.interface';
import { BodyResponse } from 'src/models/body.interface';
/**
 * Servicio para interactuar con los módulos del sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de módulos del sistema.
   * @returns Un observable que emite la lista de módulos.
   */
  getModules() {
    return this.http.get<BodyResponse<IModule[]>>(`${environment.API_PUBLIC}/module`);
  }

  /**
   * Actualiza la información de un módulo existente.
   * @param moduleId El ID del módulo a actualizar.
   * @param payload La información actualizada del módulo.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateModule(moduleId: number, payload: IModuleRequest) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/module/${moduleId}`,
      payload,
    );
  }

  /**
   * Obtiene los permisos asociados a un módulo específico.
   * @param moduleId El ID del módulo del que se desean obtener los permisos.
   * @returns Un observable que emite la lista de permisos asociados al módulo.
   */
  getPermissionModule(moduleId: number) {
    return this.http.get<BodyResponse<IPermissionModule[]>>(
      `${environment.API_PUBLIC}/permission/module-id/${moduleId}`,
    );
  }

  /**
   * Crea un nuevo conjunto de permisos asociados a un módulo.
   * @param payload La información de los permisos a crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createPermissionModule(payload: IPermissionRequest) {
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/permission`, payload);
  }

  /**
   * Actualiza los permisos asociados a un módulo.
   * @param payload La información actualizada de los permisos.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updatePermissionModule(payload: IPermissionRequest) {
    return this.http.put<BodyResponse<string>>(`${environment.API_PUBLIC}/permission`, payload);
  }
}
