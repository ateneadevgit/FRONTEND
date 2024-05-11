import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDocGuideline, IDocGuidelineRequest } from 'src/models/admin/guideline-doc.interface';
import { BodyResponse } from 'src/models/body.interface';

/**
 * Servicio para la gestión de documentos relacionados con los programas académicos.
 */
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de documentos según el tipo especificado.
   * @param type El tipo de documento.
   * @returns Un observable que emite la lista de documentos.
   */
  getDocuments(type: number) {
    return this.http.get<BodyResponse<IDocGuideline[]>>(
      `${environment.API_PUBLIC}/program/attachment/guideline/by-type/${type}`,
    );
  }

  /**
   * Crea un nuevo documento.
   * @param payload La información del documento a crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createDocument(payload: IDocGuidelineRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/attachment`,
      payload,
    );
  }

  /**
   * Actualiza un documento existente.
   * @param documentId El ID del documento a actualizar.
   * @param payload La información actualizada del documento.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateDocumento(documentId: number, payload: IDocGuidelineRequest) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/attachment/${documentId}`,
      payload,
    );
  }

  /**
   * Elimina un documento.
   * @param guidelineId El ID del documento a eliminar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  deleteGuideline(guidelineId: number) {
    return this.http.delete<BodyResponse<IDocGuideline[]>>(
      `${environment.API_PUBLIC}/program/attachment/delete/${guidelineId}`,
    );
  }

  /**
   * Habilita o deshabilita un documento.
   * @param guidelineId El ID del documento.
   * @param enabled Indica si se habilitará o deshabilitará el documento.
   * @returns Un observable que emite la respuesta del servidor.
   */
  disableEnableGuideline(guidelineId: number, enabled: boolean) {
    return this.http.delete<BodyResponse<IDocGuideline[]>>(
      `${environment.API_PUBLIC}/program/attachment/${guidelineId}/enable-disable/${enabled}`,
    );
  }
}
