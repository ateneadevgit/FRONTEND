import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IParam, IParamRequest } from 'src/models/admin/params.interface';
import { BodyResponse } from 'src/models/body.interface';
import { IConfigRequest } from 'src/models/settings.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}
  /**
   * Obtiene la configuración de un ajuste específico por su nombre.
   * @param settingName El nombre del ajuste del que se desea obtener la configuración.
   * @returns Un observable que emite la configuración del ajuste.
   */
  getSettingById(settingName: string) {
    const configSearch: IConfigRequest = {
      settingName: settingName,
    };
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/settings`, configSearch);
  }
  /**
   * Obtiene todas las configuraciones de ajustes disponibles.
   * @returns Un observable que emite todas las configuraciones de ajustes disponibles.
   */
  getSettings() {
    return this.http.get<BodyResponse<IParam[]>>(`${environment.API_PUBLIC}/settings`);
  }
  /**
   * Actualiza la configuración de un ajuste específico.
   * @param settingId El ID del ajuste que se desea actualizar.
   * @param payload La nueva configuración del ajuste.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateSetting(settingId: number, payload: IParamRequest) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/settings/${settingId}`,
      payload,
    );
  }
}
