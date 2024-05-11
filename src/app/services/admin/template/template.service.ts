import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITemplate, ITemplateRequest } from 'src/models/admin/template.interface';
import { BodyResponse } from 'src/models/body.interface';

/**
 * Servicio para interactuar con los templates del sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de templates del sistema.
   * @returns Un observable que emite la lista de templates.
   */
  getTempaltes() {
    return this.http.get<BodyResponse<ITemplate[]>>(`${environment.API_PUBLIC}/template`);
  }

  /**
   * Obtiene la información de un template específico.
   * @param templateId El ID del template que se desea obtener.
   * @returns Un observable que emite la información del template.
   */
  getTemplateById(templateId: number) {
    return this.http.get<BodyResponse<ITemplate>>(
      `${environment.API_PUBLIC}/template/${templateId}`,
    );
  }

  /**
   * Actualiza la información de un template existente.
   * @param payload La información actualizada del template.
   * @param templateId El ID del template que se desea actualizar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateTemplate(payload: ITemplateRequest, templateId: number) {
    return this.http.put<BodyResponse<ITemplate>>(
      `${environment.API_PUBLIC}/template/${templateId}`,
      payload,
    );
  }
}
