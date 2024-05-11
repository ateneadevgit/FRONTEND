/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import { IEvenGeneral, IEventList, IFilterEvent } from 'src/models/program.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}
  /**
   * Crea un evento general.
   * @param payload La información del evento general a crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createEventGeneral(pyload: IEvenGeneral) {
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/event/general`, pyload);
  }
  /**
   * Crea un evento personal.
   * @param payload La información del evento personal a crear.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createEventPersonal(pyload: IEvenGeneral) {
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/event/personal`, pyload);
  }
  /**
   * Actualiza un evento.
   * @param eventId El ID del evento a actualizar.
   * @param payload La información actualizada del evento.
   * @param isPersonal Indica si el evento es personal.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateEvent(eventId: number, pyload: IEvenGeneral, isPersonal: boolean) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/event/${eventId}/is-personal/${isPersonal}`,
      pyload,
    );
  }
  /**
   * Elimina un evento.
   * @param eventId El ID del evento a eliminar.
   * @param isPersonal Indica si el evento es personal.
   * @returns Un observable que emite la respuesta del servidor.
   */
  deleteEvent(eventId: number, isPersonal: boolean) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/event/${eventId}/is-personal/${isPersonal}`,
    );
  }
  /**
   * Obtiene eventos filtrados.
   * @param payload Los criterios de filtro para la búsqueda de eventos.
   * @returns Un observable que emite la respuesta del servidor.
   */
  getEvents(pyload: IFilterEvent) {
    return this.http.post<BodyResponse<IEventList[]>>(
      `${environment.API_PUBLIC}/event/get`,
      pyload,
    );
  }
}
