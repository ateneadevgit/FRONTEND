import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyResponse } from 'src/models/body.interface';
import { IDocumentManager, INew } from 'src/models/news.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo documento en el gestor de documentos.
   * @param document Los datos del documento a crear.
   * @returns Un observable con la respuesta del servidor.
   */
  createDocumentManager(document: IDocumentManager) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/document-manager`,
      document,
    );
  }

  /**
   * Obtiene las noticias según el campus proporcionado.
   * @param campus El campus para el cual se desean obtener las noticias.
   * @returns Un observable con la respuesta del servidor.
   */
  getNewsByCampus(campus: number[]) {
    return this.http.post<BodyResponse<INew[]>>(`${environment.API_PUBLIC}/news/get`, {
      campus: campus,
    });
  }

  /**
   * Elimina una noticia por su ID.
   * @param newId El ID de la noticia a eliminar.
   * @returns Un observable con la respuesta del servidor.
   */
  deleteNewsById(newId: number) {
    return this.http.delete<BodyResponse<string>>(`${environment.API_PUBLIC}/news/${newId}`);
  }

  /**
   * Actualiza una noticia por su ID.
   * @param news Los datos actualizados de la noticia.
   * @returns Un observable con la respuesta del servidor.
   */
  updateNewsById(news: INew) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/news/${news.newId}`,
      news,
    );
  }

  /**
   * Crea una nueva noticia.
   * @param news Los datos de la nueva noticia.
   * @returns Un observable con la respuesta del servidor.
   */
  createNews(news: INew) {
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/news`, news);
  }
}
