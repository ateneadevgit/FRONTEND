import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse, IAuthorizerRefresh, ITokenRefresh } from 'src/models/body.interface';
import { Login, LoginResponse } from 'src/models/login.interface';
import { CryptsService } from '../utils/crypts.service';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private cryptsService: CryptsService,
  ) {}
  /**
   * Realiza una solicitud de inicio de sesión al servidor.
   * @param login La información de inicio de sesión del usuario.
   * @returns Un Observable que emite una respuesta de inicio de sesión.
   */
  login(login: Login) {
    return this.http.post<BodyResponse<LoginResponse>>(`${environment.API_PUBLIC}/login`, login);
  }
  /**
   * Obtiene los elementos del menú basados en el rol del usuario.
   * @param rol El rol del usuario.
   * @returns Un Observable que emite una lista de elementos de menú.
   */
  getMenuItems(rol = 0) {
    return this.http.get<BodyResponse<MenuItem[]>>(
      `${environment.API_PUBLIC}/permission/module/by-role/${rol}`,
    );
  }
  /**
   * Refresca el token de autorización del usuario.
   * @param token El token de actualización.
   * @returns Un Observable que emite una respuesta con el nuevo token de autorización.
   */
  refreshToken(token: ITokenRefresh) {
    return this.http.post<BodyResponse<IAuthorizerRefresh>>(
      `${environment.API_PUBLIC}/authorizer/refresh`,
      token,
    );
  }
  /**
   * Cierra la sesión del usuario.
   */
  logOut() {
    //localStorage.clear();
    localStorage.removeItem(SessionStorageItems.SESSION);
  }
  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns `true` si el usuario ha iniciado sesión; de lo contrario, `false`.
   */
  isLoggedIn() {
    const sessionToken = sessionStorage.getItem(SessionStorageItems.SESSION);
    return sessionToken ? true : false;
  }
  /**
   * Obtiene el rol del usuario almacenado en la sesión.
   * @returns El rol del usuario.
   */
  getRole() {
    return this.cryptsService.decryptData(SessionStorageItems.SESSION)?.userData?.role;
  }
  /**
   * Obtiene el correo electrónico del usuario almacenado en la sesión.
   * @returns El correo electrónico del usuario.
   */
  getEmail() {
    return this.cryptsService.decryptData(SessionStorageItems.SESSION)?.userData?.email;
  }
  /**
   * Obtiene el programa asociado al usuario almacenado en la sesión.
   * @returns Un arreglo de identificadores de programas o `null` si no hay ninguno.
   */
  getProgram(): number[] | null {
    return this.cryptsService.decryptData(SessionStorageItems.SESSION)?.userData?.programId;
  }
}
