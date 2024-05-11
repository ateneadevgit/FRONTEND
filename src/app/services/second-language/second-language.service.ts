import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import {
  SecondLanguage,
  SecondLanguageGroup,
  SecondLanguageRQ,
} from 'src/models/program.interface';

@Injectable({
  providedIn: 'root',
})
export class SecondLanguageService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los grupos de segundos idiomas disponibles.
   * @returns La respuesta del servidor con la lista de grupos de segundos idiomas.
   */
  getSecondLanguageByGroup() {
    return this.http.get<BodyResponse<SecondLanguageGroup[]>>(
      `${environment.API_PUBLIC}/program/second-language/group`,
    );
  }

  /**
   * Obtiene un segundo idioma por su ID.
   * @param secondLanguageId El ID del segundo idioma.
   * @returns La respuesta del servidor con los detalles del segundo idioma.
   */
  getSecondLanguageById(secondLanguageId: number) {
    return this.http.get<BodyResponse<SecondLanguage>>(
      `${environment.API_PUBLIC}/program/second-language/${secondLanguageId}`,
    );
  }

  /**
   * Crea un nuevo segundo idioma.
   * @param payload Los datos del segundo idioma a crear.
   * @returns La respuesta del servidor con el mensaje de éxito.
   */
  createSecondLanguage(payload: SecondLanguageRQ) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/second-language`,
      payload,
    );
  }

  /**
   * Actualiza un segundo idioma existente.
   * @param secondLanguageId El ID del segundo idioma a actualizar.
   * @param payload Los datos actualizados del segundo idioma.
   * @returns La respuesta del servidor con el mensaje de éxito.
   */
  updateSecondLanguage(secondLanguageId: number, payload: SecondLanguageRQ) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/second-language/${secondLanguageId}`,
      payload,
    );
  }

  /**
   * Elimina un segundo idioma por su ID.
   * @param secondLanguageId El ID del segundo idioma a eliminar.
   * @returns La respuesta del servidor con el mensaje de éxito.
   */
  deleteSecondLanguage(secondLanguageId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/second-language/${secondLanguageId}`,
    );
  }
}
