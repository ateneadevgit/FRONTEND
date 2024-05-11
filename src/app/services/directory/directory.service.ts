import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDirectory, IDirectorySearch } from 'src/models/directory.interface';
import { BodyResponse } from 'src/models/body.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  constructor(private http: HttpClient) {}
  /**
   * Obtiene el directorio de usuarios que coinciden con los parámetros de búsqueda especificados.
   * @param payload El objeto de búsqueda que contiene los parámetros de búsqueda.
   * @returns Un observable que emite el directorio de usuarios que coinciden con los parámetros de búsqueda.
   */
  getDirectory(payload: IDirectorySearch) {
    return this.http.post<BodyResponse<IDirectory[]>>(
      `${environment.API_PUBLIC}/sinu/directory`,
      payload,
    );
  }
}
