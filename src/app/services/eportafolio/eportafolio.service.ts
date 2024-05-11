import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import {
  IAddFavorite,
  IConsumedSpace,
  IFileModel,
  IFileRequest,
  IFolder,
  IFolderRequest,
  IPaginationEportafolio,
  ISearchEportafolio,
} from 'src/models/eportafolio.interface';

@Injectable({
  providedIn: 'root',
})
export class EportafolioService {
  constructor(private http: HttpClient) {}
  /**
   * Obtiene los archivos compartidos según los parámetros de búsqueda especificados.
   * @param payload El objeto de búsqueda que contiene los parámetros de búsqueda.
   * @param page El número de página.
   * @param size El tamaño de la página.
   * @returns Un observable que emite la paginación de archivos compartidos.
   */
  getSharedFiles(payload: ISearchEportafolio, page: number, size: number) {
    return this.http.post<BodyResponse<IPaginationEportafolio>>(
      `${environment.API_PUBLIC}/eportafolio/file/shared?page=${page}&size=${size}`,
      payload,
    );
  }
  /**
   * Agrega un archivo a favoritos.
   * @param payload El objeto de solicitud que contiene la información del archivo a agregar a favoritos.
   * @param fileId El ID del archivo.
   * @returns Un observable que emite la respuesta del servidor.
   */
  addFileToFavorite(payload: IAddFavorite, fileId: number) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/eportafolio/file/${fileId}/favorite/add`,
      payload,
    );
  }

  /**
   * Obtiene la lista de carpetas.
   * @returns Un observable que emite la lista de carpetas.
   */
  getFolders() {
    return this.http.get<BodyResponse<IFolder[]>>(`${environment.API_PUBLIC}/eportafolio/folder`);
  }
  /**
   * Crea una nueva carpeta.
   * @param payload El objeto de solicitud que contiene la información de la nueva carpeta.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createFolder(payload: IFolderRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/eportafolio/folder`,
      payload,
    );
  }

  /**
   * Actualiza una carpeta existente.
   * @param payload El objeto de solicitud que contiene la información actualizada de la carpeta.
   * @param folderId El ID de la carpeta a actualizar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateFolder(payload: IFolderRequest, folderId: number) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/eportafolio/folder/${folderId}`,
      payload,
    );
  }
  /**
   * Elimina una carpeta.
   * @param folderId El ID de la carpeta a eliminar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  deleteFolder(folderId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/eportafolio/folder/${folderId}`,
    );
  }
  /**
   * Obtiene los archivos de una carpeta específica según los parámetros de búsqueda especificados.
   * @param folderId El ID de la carpeta.
   * @param payload El objeto de búsqueda que contiene los parámetros de búsqueda.
   * @param page El número de página.
   * @param size El tamaño de la página.
   * @returns Un observable que emite la paginación de archivos de la carpeta.
   */
  getFilesByFolder(folderId: number, payload: ISearchEportafolio, page: number, size: number) {
    return this.http.post<BodyResponse<IPaginationEportafolio>>(
      `${environment.API_PUBLIC}/eportafolio/file/folder-id/${folderId}?page=${page}&size=${size}`,
      payload,
    );
  }
  /**
   * Crea un nuevo archivo.
   * @param payload El objeto de solicitud que contiene la información del nuevo archivo.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createFile(payload: IFileRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/eportafolio/file`,
      payload,
    );
  }
  /**
   * Elimina un archivo.
   * @param fileId El ID del archivo a eliminar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  deleteFile(fileId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/eportafolio/file/${fileId}`,
    );
  }
  /**
   * Obtiene el espacio consumido por los archivos.
   * @returns Un observable que emite el espacio consumido.
   */
  getConsumedSpace() {
    return this.http.get<BodyResponse<IConsumedSpace>>(
      `${environment.API_PUBLIC}/eportafolio/file/consumed`,
    );
  }
  /**
   * Obtiene un archivo por su ID.
   * @param fileId El ID del archivo.
   * @returns Un observable que emite el archivo.
   */
  getFileById(fileId: number) {
    return this.http.get<BodyResponse<IFileModel>>(
      `${environment.API_PUBLIC}/eportafolio/file/${fileId}`,
    );
  }
  /**
   * Actualiza un archivo.
   * @param payload El objeto de solicitud que contiene la información actualizada del archivo.
   * @param fileId El ID del archivo a actualizar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateFile(payload: IFileRequest, fileId: number) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/eportafolio/file/${fileId}`,
      payload,
    );
  }
  /**
   * Obtiene los archivos marcados como favoritos según los parámetros de búsqueda especificados.
   * @param payload El objeto de búsqueda que contiene los parámetros de búsqueda.
   * @param page El número de página.
   * @param size El tamaño de la página.
   * @returns Un observable que emite la paginación de archivos favoritos.
   */
  getFavoriteFiles(payload: ISearchEportafolio, page: number, size: number) {
    return this.http.post<BodyResponse<IPaginationEportafolio>>(
      `${environment.API_PUBLIC}/eportafolio/file/favorite?page=${page}&size=${size}`,
      payload,
    );
  }
}
