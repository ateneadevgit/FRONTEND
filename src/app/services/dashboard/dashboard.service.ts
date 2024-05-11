import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import {
  IDPrograms,
  IDataMyProgress,
  IGender,
  IMyProgramCourse,
  ISearchProgram,
} from 'src/models/dashboard.inteface';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  /**
   * Obtiene el progreso del programa para un usuario específico.
   * @param id El ID del usuario para el que se desea obtener el progreso del programa.
   * @returns Un observable que emite el progreso del programa para el usuario especificado.
   */
  getProgramProgress(id: number) {
    return this.http.get<BodyResponse<IDataMyProgress>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${id}/progress`,
    );
  }
  /**
   * Obtiene el historial de materias de un usuario específico.
   * @param id El ID del usuario para el que se desea obtener el historial de materias.
   * @returns Un observable que emite el historial de materias para el usuario especificado.
   */
  getProgramsInfo(payload: ISearchProgram) {
    return this.http.post<BodyResponse<IDPrograms[]>>(
      `${environment.API_PUBLIC}/program/own`,
      payload,
    );
  }
  /**
   * Obtiene el historial de materias para un usuario específico.
   * @param id El ID del usuario para el que se desea obtener el historial de materias.
   * @returns Un observable que emite el historial de materias para el usuario especificado.
   */
  getHistorySubject(id: number) {
    return this.http.get<BodyResponse<IMyProgramCourse[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${id}/historic`,
    );
  }
  /**
   * Obtiene el género del usuario.
   * @returns Un observable que emite el género del usuario.
   */
  getUserGender() {
    return this.http.get<BodyResponse<IGender>>(`${environment.API_PUBLIC}/sinu/user/by-gender`);
  }
  /**
   * Obtiene el número de usuarios por facultad.
   * @param idFaculty El ID de la facultad para la que se desea obtener el número de usuarios.
   * @returns Un observable que emite el número de usuarios por facultad.
   */
  getUserByFaculty(idFaculty: number) {
    return this.http.get<BodyResponse<number>>(
      `${environment.API_PUBLIC}/sinu/user/by-faculty/${idFaculty}`,
    );
  }
}
