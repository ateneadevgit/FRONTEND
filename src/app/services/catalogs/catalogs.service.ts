import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import {
  CatalogsByIdResponse,
  CatalogsResponse,
  CreateCatalog,
  ICatalogFilter,
  ICreateCatalogItem,
} from 'src/models/catalogs.interface';
import { Observable, of, tap } from 'rxjs';
/**
 * Servicio para interactuar con los catálogos del sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private readonly CACHE_PREFIX = 'catalogCache_';

  private getCacheKey(id: number): string {
    return `${this.CACHE_PREFIX}${id}`;
  }

  private setCache(id: number, data: BodyResponse<CatalogsByIdResponse[]>): void {
    sessionStorage.setItem(this.getCacheKey(id), JSON.stringify(data));
  }

  private getCache(id: number): BodyResponse<CatalogsByIdResponse[]> | null {
    const cachedData = sessionStorage.getItem(this.getCacheKey(id));
    return cachedData ? JSON.parse(cachedData) : null;
  }

  constructor(private http: HttpClient) {}
  /**
   * Obtiene todos los catálogos del sistema.
   * @returns Un observable que emite una lista de catálogos.
   */
  getAllCatalogs() {
    return this.http.get<BodyResponse<CatalogsResponse[]>>(`${environment.API_PUBLIC}/catalog`);
  }
  /**
   * Obtiene un catálogo específico por su ID.
   * @param catalogId El ID del catálogo que se desea obtener.
   * @returns Un observable que emite la información del catálogo.
   */
  getCatalogById(catalogId: number) {
    return this.http.get<BodyResponse<CatalogsResponse>>(
      `${environment.API_PUBLIC}/catalog/${catalogId}`,
    );
  }

  /**
   * Obtiene todos los ítems de un catálogo por su ID.
   * @param id El ID del catálogo del cual se desean obtener los ítems.
   * @returns Un observable que emite una lista de ítems del catálogo.
   */
  getAllCatalogsByid(id: number): Observable<BodyResponse<CatalogsByIdResponse[]>> {
    // Verifica si los datos están en caché
    const cachedData = this.getCache(id);
    if (cachedData) {
      return of(cachedData);
    }

    // Si no están en caché, realiza la solicitud al backend
    return this.http
      .get<
        BodyResponse<CatalogsByIdResponse[]>
      >(`${environment.API_PUBLIC}/catalog-item/catalog-id/${id}`)
      .pipe(
        tap((response) => {
          // Almacena la respuesta en caché solo si no es null
          if (response !== null) {
            this.setCache(id, response);
          }
        }),
      );
  }
  /**
   * Crea un nuevo catálogo.
   * @param request La información del catálogo que se desea crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createCatalgos(request: CreateCatalog) {
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/catalog`, request);
  }
  /**
   * Obtiene todos los ítems de un catálogo filtrados por un criterio específico.
   * @param payload Los filtros a aplicar para obtener los ítems del catálogo.
   * @param catalogId El ID del catálogo del cual se desean obtener los ítems.
   * @returns Un observable que emite una lista de ítems del catálogo filtrados.
   */
  getAllCatalogsByidFilter(payload: ICatalogFilter, catalogId: number) {
    return this.http.post<BodyResponse<CatalogsByIdResponse[]>>(
      `${environment.API_PUBLIC}/catalog-item/catalog-id/` + catalogId + '/filter',
      payload,
    );
  }
  /**
   * Actualiza la información de un catálogo existente.
   * @param payload La información actualizada del catálogo.
   * @param catalogId El ID del catálogo que se desea actualizar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateCatalog(payload: CreateCatalog, catalogId: number) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/catalog/` + catalogId,
      payload,
    );
  }
  /**
   * Crea un nuevo ítem de catálogo.
   * @param payload La información del nuevo ítem de catálogo que se desea crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createCatalogItem(payload: ICreateCatalogItem) {
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/catalog-item`, payload);
  }
  /**
   * Actualiza la información de un ítem de catálogo existente.
   * @param payload La información actualizada del ítem de catálogo.
   * @param itemId El ID del ítem de catálogo que se desea actualizar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateCatalogItem(payload: ICreateCatalogItem, itemId: number) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/catalog-item/${itemId}`,
      payload,
    );
  }
  /**
   * Obtiene todos los ítems de un catálogo específico.
   * @param catalogId El ID del catálogo del cual se desean obtener los ítems.
   * @returns Un observable que emite una lista de ítems del catálogo.
   */
  getCatalogItemsByCatalog(catalogId: number) {
    return this.http.get<BodyResponse<CatalogsByIdResponse[]>>(
      `${environment.API_PUBLIC}/catalog-item/all/catalog-id/${catalogId}`,
    );
  }
  /**
   * Obtiene la información de un ítem de catálogo específico por su ID.
   * @param itemId El ID del ítem de catálogo que se desea obtener.
   * @returns Un observable que emite la información del ítem de catálogo.
   */
  getCatalogItemByIs(itemId: number) {
    return this.http.get<BodyResponse<CatalogsByIdResponse>>(
      `${environment.API_PUBLIC}/catalog-item/${itemId}`,
    );
  }
  /**
   * Habilita o deshabilita un ítem de catálogo específico.
   * @param itemId El ID del ítem de catálogo que se desea habilitar o deshabilitar.
   * @param enabled Un indicador booleano que especifica si se debe habilitar (true) o deshabilitar (false) el ítem.
   * @returns Un observable que emite la respuesta del servidor.
   */
  enableDisableItem(itemId: number, enabled: boolean) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/catalog-item/${itemId}/enabled/${enabled}`,
    );
  }
}
