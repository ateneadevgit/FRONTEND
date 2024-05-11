/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyResponse } from 'src/models/body.interface';
import { Createporpouse } from 'src/models/porpouse.interface';
import { environment } from 'src/environments/environment';
import { EvaluatePorpouse } from 'src/models/workflow.interface';
import {
  ContentProgram,
  DataEditProgram,
  EvaluateModulesEdit,
  IAttachmentCreate,
  IAttachmentMinutes,
  IDataSummary,
  IModule,
  IObjectJson,
  IObjectTemp,
  ModulesEditApprove,
  Program,
  ProgramHistorical,
  ProgramModule,
  UpgradeProgram,
} from 'src/models/program.interface';
import { CommentsWorkflow, IGetCommentsEdit, ReplyEditModule } from 'src/models/comments.interface';
import { Observable } from 'rxjs';
import { TrceabilityWorkflow } from 'src/models/traceability.interface';
@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  public reload = new EventEmitter<any>();

  public filterByFaculty = new EventEmitter<any>();

  public filterByCampus = new EventEmitter<any>();

  constructor(private http: HttpClient) {}
  /**
   * Obtiene todos los programas disponibles.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<Program[]> que contiene una lista de programas.
   */
  getPrograms(): Observable<BodyResponse<Program[]>> {
    return this.http.get<BodyResponse<Program[]>>(`${environment.API_PUBLIC}/program`);
  }
  /**
   * Obtiene un programa específico por su ID.
   * @param idProgram El ID del programa que se desea obtener.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ContentProgram> que contiene los detalles del programa.
   */
  getProgram(idProgram: number) {
    return this.http.get<BodyResponse<ContentProgram>>(
      `${environment.API_PUBLIC}/program/${idProgram}`,
    );
  }
  /**
   * Crea un nuevo propósito (o propuesta) de programa.
   * @param porpouse El objeto Createporpouse que contiene los datos para crear el propósito.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la creación del propósito.
   */
  createPorpouse(porpouse: Createporpouse) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/proposal`,
      porpouse,
    );
  }
  /**
   * Actualiza un propósito de programa existente.
   * @param program El ID del programa al que pertenece el propósito que se desea actualizar.
   * @param payload El objeto EvaluatePorpouse que contiene los datos actualizados del propósito.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la actualización del propósito.
   */
  updatePorpouse(program: string, payload: EvaluatePorpouse) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/proposal/${program}`,
      payload,
    );
  }
  /**
   * Rechaza y desactiva un programa.
   * @param program El ID del programa que se desea rechazar y desactivar.
   * @param payload El objeto EvaluatePorpouse que contiene los datos para rechazar y desactivar el programa.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado del rechazo y desactivación del programa.
   */
  declineAndDisabled(program: string, payload: EvaluatePorpouse) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/decline-disable/program/${program}`,
      payload,
    );
  }

  /**
   * Obtiene todas las propuestas de programas.
   * @param facultyFilter Opcional. El ID de la facultad para filtrar las propuestas.
   * @param facultyCampus Opcional. El ID del campus para filtrar las propuestas.
   * @param page Opcional. El número de página para la paginación.
   * @param size Opcional. El tamaño de la página para la paginación.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que contiene las propuestas de programas.
   */
  getAllPropousal(facultyFilter = '', facultyCampus = '', page = 1, size = 10) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/program/proposal?page=${page}&size=${size}${
        facultyCampus !== '' ? '&campusId=' + facultyCampus : ''
      }${facultyFilter !== '' ? '&facultyId=' + facultyFilter : ''}`,
    );
  }
  /**
   * Obtiene una propuesta de programa por su ID.
   * @param program El ID del programa que se desea obtener.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que contiene los detalles de la propuesta de programa.
   */
  getPropousalById(program: number) {
    return this.http.get<BodyResponse<any>>(`${environment.API_PUBLIC}/program/${program}`);
  }

  /**
   * Obtiene programas por estado.
   * @param status El estado de los programas que se desean obtener.
   * @param facultyFilter Opcional. El ID de la facultad para filtrar los programas.
   * @param facultyCampus Opcional. El ID del campus para filtrar los programas.
   * @param page El número de página para la paginación.
   * @param size El tamaño de la página para la paginación.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que contiene los programas por estado.
   */
  getProgramByStatus(
    status: string,
    facultyFilter = '',
    facultyCampus = '',
    page: number,
    size: number,
  ) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/program/by-status?page=${page}&size=${size}&programStatus=${status}${
        facultyFilter !== '' ? '&facultyId=' + facultyFilter : ''
      }${facultyCampus !== '' ? '&campusId=' + facultyCampus : ''}`,
    );
  }
  /**
   * Obtiene el historial de un programa por su ID.
   * @param id El ID del programa para el cual se desea obtener el historial.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que contiene el historial del programa.
   */
  getHistoryById(id: number) {
    return this.http.get<BodyResponse<any>>(`${environment.API_PUBLIC}/program/historic/${id}`);
  }
  /**
   * Obtiene módulos de programa que no son editables.
   * @param isEnlarge Indica si se desean módulos expandidos.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ProgramModule[]> que contiene los módulos del programa.
   */
  getProgramModule(isEnlarge: boolean) {
    return this.http.get<BodyResponse<ProgramModule[]>>(
      `${environment.API_PUBLIC}/program/module/no-editable?isEnlarge=${isEnlarge}`,
    );
  }
  /**
   * Obtiene módulos de programa que son editables.
   * @param isEnlarge Indica si se desean módulos expandidos.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ProgramModule[]> que contiene los módulos del programa.
   */
  getProgramModuleEdit(isEnlarge: boolean) {
    return this.http.get<BodyResponse<ProgramModule[]>>(
      `${environment.API_PUBLIC}/program/module?isEnlarge=${isEnlarge}`,
    );
  }
  /**
   * Obtiene el historial específico de un programa y módulo.
   * @param programId El ID del programa del cual se desea obtener el historial.
   * @param moduleId El ID del módulo del cual se desea obtener el historial.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ProgramHistorical[]> que contiene el historial específico del programa y módulo.
   */
  getProgramHistoricalSpecific(programId: number, moduleId: number) {
    return this.http.get<BodyResponse<ProgramHistorical[]>>(
      `${environment.API_PUBLIC}/program//history/program-id/${programId}/module-id/${moduleId}`,
    );
  }
  /**
   * Obtiene el historial de programa por módulo y tipo.
   * @param programId El ID del programa del cual se desea obtener el historial.
   * @param moduleId El ID del módulo del cual se desea obtener el historial.
   * @param typeId El ID del tipo de historial que se desea obtener.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ProgramHistorical[]> que contiene el historial de programa por módulo y tipo.
   */
  getProgramHistoryByModuleAndType(programId: number, moduleId: number, typeId: number) {
    return this.http.get<BodyResponse<ProgramHistorical[]>>(
      `${environment.API_PUBLIC}/program//history/program-id/${programId}/module-id/${moduleId}/type/${typeId}`,
    );
  }

  //Crea una nueva edicion de programa
  /**
   * Crea una nueva edición de programa.
   * @param programId El ID del programa para el cual se desea crear una nueva edición.
   * @param payload La información necesaria para crear la nueva edición del programa.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la operación.
   */
  upgradeProgram(programId: number, payload: UpgradeProgram) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/upgrade/${programId}`,
      payload,
    );
  }
  /**
   * Obtiene la edición del módulo de un programa.
   * @param idProgram El ID del programa del cual se desea obtener la edición del módulo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ModulesEditApprove> que contiene la edición del módulo del programa.
   */
  getModuleEdition(idProgram: number) {
    return this.http.get<BodyResponse<ModulesEditApprove>>(
      `${environment.API_PUBLIC}/program/upgrade/edition/${idProgram}`,
    );
  }
  /**
   * Obtiene los módulos a evaluar de un programa.
   * @param idProgram El ID del programa del cual se desean obtener los módulos a evaluar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<IModule[]> que contiene los módulos a evaluar del programa.
   */
  getModuleEvaluate(idProgram: number) {
    return this.http.get<BodyResponse<IModule[]>>(
      `${environment.API_PUBLIC}/program/upgrade/evaluate/${idProgram}`,
    );
  }
  /**
   * Envía la evaluación de los módulos de un programa.
   * @param idProgram El ID del programa del cual se desean evaluar los módulos.
   * @param payload La información necesaria para la evaluación de los módulos.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  sendModuleEvaluate(idProgram: number, payload: EvaluateModulesEdit) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/program/upgrade/evaluate/${idProgram}`,
      payload,
    );
  }
  /**
   * Envía la evaluación de los módulos de un programa.
   * @param idProgram El ID del programa del cual se desean evaluar los módulos.
   * @param payload La información necesaria para la evaluación de los módulos.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  getProposalRenovation(idProgram: number) {
    return this.http.get<BodyResponse<DataEditProgram>>(
      `${environment.API_PUBLIC}/program/upgrade/program-id/${idProgram}`,
    );
  }
  //crea objeto temporal
  /**
   * Crea un objeto temporal asociado a un programa.
   * @param programId El ID del programa para el cual se desea crear el objeto temporal.
   * @param payload La información necesaria para crear el objeto temporal.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la operación.
   */
  createdObjectTemp(programId: number, payload: IObjectTemp) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/object/program/${programId}`,
      payload,
    );
  }

  //obtiene objeto temporal
  /**
   * Obtiene el objeto temporal asociado a un programa y módulo.
   * @param idProgram El ID del programa del cual se desea obtener el objeto temporal.
   * @param moduleId El ID del módulo del cual se desea obtener el objeto temporal.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<IObjectJson> que contiene el objeto temporal asociado al programa y módulo.
   */
  getObjectTemp(idProgram: number, moduleId: number) {
    return this.http.get<BodyResponse<IObjectJson>>(
      `${environment.API_PUBLIC}/program/object/module-id/${moduleId}/program-id/${idProgram}`,
    );
  }
  /**
   * Actualiza el objeto temporal asociado a un programa.
   * @param idProgram El ID del programa para el cual se desea actualizar el objeto temporal.
   * @param payload La información necesaria para actualizar el objeto temporal.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la operación.
   */
  updateObjectTemp(idProgram: number, payload: IObjectTemp) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/object/program-id/${idProgram}`,
      payload,
    );
  }

  //comentarios Edicion

  /**
   * Envía una revisión de edición.
   * @param payload La información necesaria para enviar la revisión de edición.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la operación.
   */
  sendReviewEdit(payload: ReplyEditModule) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/review/`,
      payload,
    );
  }

  /**
   * Obtiene la revisión de edición por ID y tipo.
   * @param id El ID del objeto sobre el cual se realizó la edición.
   * @param type El tipo de objeto sobre el cual se realizó la edición.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<CommentsWorkflow[]> que contiene la revisión de edición.
   */
  getReviewEdit(id: string, type: string) {
    const payload: IGetCommentsEdit = {
      type: Number(type),
      userId: null,
      objectId: Number(id),
    };
    return this.http.post<BodyResponse<CommentsWorkflow[]>>(
      `${environment.API_PUBLIC}/program/review/get`,
      payload,
    );
  }

  // Enviar modulo a revision

  /**
   * Envía un módulo a revisión.
   * @param payload La información necesaria para enviar el módulo a revisión.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la operación.
   */
  sendModuleToReview(payload: IObjectTemp) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/object/send-review`,
      payload,
    );
  }
  /**
   * Evalúa un objeto asociado a un programa.
   * @param idProgram El ID del programa para el cual se desea evaluar el objeto.
   * @param payload La información necesaria para evaluar el objeto.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que indica el resultado de la operación.
   */
  evaluateObject(idProgram: number, payload: IObjectTemp) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/object/evaluate/program/${idProgram}`,
      payload,
    );
  }
  /**
   * Obtiene una asignatura por su núcleo.
   * @param moduleId El ID del módulo del cual se desea obtener la asignatura.
   * @param programId El ID del programa al cual pertenece el módulo.
   * @param coreId El ID del núcleo de la asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<IObjectTemp> que contiene la asignatura por su núcleo.
   */
  getSubjectByCore(moduleId: string, programId: string, coreId: string) {
    return this.http.get<BodyResponse<IObjectTemp>>(
      `${environment.API_PUBLIC}/program/object/module-id/${moduleId}/program-id/${programId}/by-core/${coreId}`,
    );
  }

  //get data summary

  /**
   * Obtiene un resumen de currículum por programa.
   * @param type El tipo de resumen de currículum que se desea obtener.
   * @param programId El ID del programa para el cual se desea obtener el resumen de currículum.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<IDataSummary> que contiene el resumen de currículum por programa.
   */
  getCurricumSummaryByProgram(type: string, programId: string) {
    return this.http.get<BodyResponse<IDataSummary>>(
      `${environment.API_PUBLIC}/workflow/curriculum/summary/type/${type}/object-id/${programId}`,
    );
  }

  //Obtener estado de edicion

  /**
   * Obtiene el estado de edición de un programa por su ID.
   * @param programId El ID del programa para el cual se desea obtener el estado de edición.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<number> que contiene el estado de edición del programa.
   */
  getUpgradeProgramStatus(programId: string) {
    return this.http.get<BodyResponse<number>>(
      `${environment.API_PUBLIC}/program/${programId}/upgrade-status`,
    );
  }

  /**
   * Obtiene los programas técnicos por ID de facultad.
   * @param facultyId El ID de la facultad para la cual se desean obtener los programas técnicos.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any[]> que contiene los programas técnicos por ID de facultad.
   */
  getProgramsTechnical(facultyId: string) {
    return this.http.get<BodyResponse<any[]>>(
      `${environment.API_PUBLIC}/program/technical/faculty-id/${facultyId}`,
    );
  }

  /**
   * Obtiene las pautas de adjuntos del programa.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any[]> que contiene las pautas de adjuntos del programa.
   */
  getProgramAttachmentGuideline() {
    return this.http.get<BodyResponse<any[]>>(
      `${environment.API_PUBLIC}/program/attachment/guideline`,
    );
  }
  /**
   * Obtiene los minutos de adjuntos.
   * @param pyload La información necesaria para obtener los minutos de adjuntos.
   * @returns Un Observable que emite una respuesta de tipo any[] que contiene los minutos de adjuntos.
   */
  getAttachmentminute(pyload: IAttachmentMinutes) {
    return this.http.post<any[]>(`${environment.API_PUBLIC}/program/attachment/minute`, pyload);
  }

  createAttachmentminute(pyload: IAttachmentCreate) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/attachment`,
      pyload,
    );
  }
  /**
   * Obtiene los programas por ID de facultad.
   * @param facultyId El ID de la facultad para la cual se desean obtener los programas.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<Program[]> que contiene los programas por ID de facultad.
   */
  getProgramsByFacultyId(facultyId: number): Observable<BodyResponse<Program[]>> {
    return this.http.get<BodyResponse<Program[]>>(
      `${environment.API_PUBLIC}/program/faculty-id/${facultyId}`,
    );
  }
  /**
   * Obtiene la trazabilidad de un programa por su ID.
   * @param idProgram El ID del programa para el cual se desea obtener la trazabilidad.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<TrceabilityWorkflow> que contiene la trazabilidad del programa.
   */
  getTraceability(idProgram: string) {
    return this.http.get<BodyResponse<TrceabilityWorkflow>>(
      `${environment.API_PUBLIC}/traceability/program-id/${idProgram}`,
    );
  }
  /**
   * Obtiene los programas por IDs de facultades.
   * @param faculties Los IDs de las facultades para las cuales se desean obtener los programas.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<Program[]> que contiene los programas por IDs de facultades.
   */
  getProgramByFaculties(faculties: number[]) {
    return this.http.post<BodyResponse<Program[]>>(
      `${environment.API_PUBLIC}/program/faculty`,
      faculties,
    );
  }
  /**
   * Obtiene el adjunto de pauta por ID de módulo.
   * @param idModule El ID del módulo para el cual se desea obtener el adjunto de pauta.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> que contiene el adjunto de pauta por ID de módulo.
   */
  getGuidelineAttachmentById(idModule: number) {
    return this.http.get<BodyResponse<string>>(
      `${environment.API_PUBLIC}/program/attachment/guideline/${idModule}`,
    );
  }
}
