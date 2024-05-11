/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse } from 'src/models/body.interface';
import {
  ICompetence,
  ICreatedCompetence,
  ICreatedProblem,
  IFeedbackProblem,
  IProblemBank,
  ISearchProblemList,
} from 'src/models/problem-bank.interface';

@Injectable({
  providedIn: 'root',
})
export class ProblemBankService {
  constructor(private http: HttpClient) {}

  /**
   * Guarda un nuevo problema en el banco de problemas.
   * @param payload Los datos del problema a guardar.
   * @returns La respuesta del servidor.
   */
  saveProblemBank(payload: ICreatedProblem) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/problem`,
      payload,
    );
  }

  /**
   * Actualiza un problema existente en el banco de problemas.
   * @param payload Los datos del problema actualizado.
   * @param idProblem El ID del problema a actualizar.
   * @returns La respuesta del servidor.
   */
  updateProblemBank(payload: ICreatedProblem, idProblem: number) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/problem/${idProblem}`,
      payload,
    );
  }

  /**
   * Habilita o deshabilita un problema en el banco de problemas.
   * @param idProblem El ID del problema a habilitar o deshabilitar.
   * @param status El estado de habilitación/deshabilitación del problema.
   * @returns La respuesta del servidor.
   */
  disabledProblemBank(idProblem: number, status: boolean) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/problem/${idProblem}/dis-enable/${status}`,
    );
  }

  /**
   * Evalúa un problema en el banco de problemas.
   * @param payload Los datos de la evaluación del problema.
   * @param idProblem El ID del problema a evaluar.
   * @returns La respuesta del servidor.
   */
  evaluateProblemBank(payload: IFeedbackProblem, idProblem: number) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/problem/${idProblem}/evaluate`,
      payload,
    );
  }

  /**
   * Obtiene una lista de problemas del banco de problemas.
   * @param payload Los parámetros de búsqueda para los problemas.
   * @returns La respuesta del servidor con la lista de problemas.
   */
  getProblemBank(payload: ISearchProblemList) {
    return this.http.post<BodyResponse<IProblemBank[]>>(
      `${environment.API_PUBLIC}/workflow/problem/get`,
      payload,
    );
  }

  /**
   * Guarda una nueva competencia en el sistema.
   * @param payload Los datos de la competencia a guardar.
   * @returns La respuesta del servidor.
   */
  saveCompetence(payload: ICreatedCompetence) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/competences`,
      payload,
    );
  }

  /**
   * Actualiza una competencia existente en el sistema.
   * @param payload Los datos de la competencia actualizada.
   * @param idCompetence El ID de la competencia a actualizar.
   * @returns La respuesta del servidor.
   */
  updateCompetence(payload: ICreatedCompetence, idCompetence: number) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/competences/${idCompetence}`,
      payload,
    );
  }

  /**
   * Obtiene la lista de competencias del sistema.
   * @param isNif Indica si se deben obtener las competencias de tipo NIF.
   * @returns La respuesta del servidor con la lista de competencias.
   */
  getCompetences(isNif: boolean) {
    return this.http.get<BodyResponse<ICompetence[]>>(
      `${environment.API_PUBLIC}/workflow/competences/is-nif/${isNif}`,
    );
  }

  /**
   * Obtiene una lista de problemas del banco de problemas filtrados por NIF.
   * @param payload Los parámetros de búsqueda para los problemas.
   * @returns La respuesta del servidor con la lista de problemas filtrados por NIF.
   */
  getProblemBankNif(payload: ISearchProblemList) {
    return this.http.post<BodyResponse<IProblemBank[]>>(
      `${environment.API_PUBLIC}/workflow/problem/nif`,
      payload,
    );
  }
}
