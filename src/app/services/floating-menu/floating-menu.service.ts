import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import { MenuItemsFloating } from 'src/models/menu-items-floating';
/**
 * Servicio para obtener el menú flotante según el rol de usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class FloatingMenuService {
  constructor(private http: HttpClient) {}
  /**
   * Obtiene el menú flotante según el ID de rol especificado.
   * @param roleId El ID del rol de usuario.
   * @returns Un observable que emite la respuesta del servidor con los elementos del menú flotante.
   */
  getFloatingMenu(roleId: number) {
    return this.http.get<BodyResponse<MenuItemsFloating[]>>(
      `${environment.API_PUBLIC}/permission/floating/module/by-role/` + roleId,
    );
  }
}
