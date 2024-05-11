/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyResponse, IPagination } from 'src/models/body.interface';
import {
  CommentsWorkflow,
  RQComments,
  ReplyComments,
  ReplyWorkflow,
} from 'src/models/comments.interface';
import { CurriculumItem, ILearningEvaluation } from 'src/models/curriculum-item.interface';
import { PreloadDataSyllabus, SyllabusData } from 'src/models/syllabus.interface';
import {
  ApproveTraza,
  SendCurriculmSummary,
  UpdateCurriculumSummary,
} from 'src/models/sumary.intefaces';
import {
  ISubjectData,
  StudyPlanStudent,
  TrceabilityWorkflow,
} from 'src/models/traceability.interface';
import {
  ComponenteWorkflow,
  CreateWorkflow,
  EvaluatePorpouse,
  FilterProgramSubject,
  IActivityRequest,
  ICreateLearningAssessment,
  IIntegryActivities,
  ILevelTypes,
  IRsCurriculumNif,
  ITeacherSubject,
  IUserAssigned,
  LoadDocumentsWorkflow,
  ReponseComponentCurriculum,
  SendEvaluationWorkflow,
  SendStepFeedback,
  SummaryWorkflow,
  UpdateCurriculumRequests,
  Workflow,
} from 'src/models/workflow.interface';
import { Observable } from 'rxjs';
import { INif } from 'src/models/nifs.interface';
import { DirectorsRole } from 'src/models/sinu.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  public reload = new EventEmitter<boolean>();
  public isActivity = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  /**
   * Evalúa una propuesta.
   * @param program El ID del programa para el cual se realizará la evaluación.
   * @param workflow La información necesaria para la evaluación.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la evaluación.
   */
  evaluatePorpouse(program: string, workflow: EvaluatePorpouse) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/proposal/${program}`,
      workflow,
    );
  }

  /**
   * Obtiene el flujo de trabajo por ID de programa y tipo de condición.
   * @param idProgram El ID del programa para el cual se desea obtener el flujo de trabajo.
   * @param typeCondition El tipo de condición para el cual se desea obtener el flujo de trabajo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<Workflow> que contiene el flujo de trabajo por ID de programa y tipo de condición.
   */
  getWorkflow(idProgram: string, typeCondition: string) {
    return this.http.get<BodyResponse<Workflow>>(
      `${environment.API_PUBLIC}/workflow/step/by-object/${idProgram}?type=${typeCondition}`,
    );
  }

  /**
   * Verifica si el flujo de trabajo ha comenzado.
   * @param idProgram El ID del programa para el cual se desea verificar si el flujo de trabajo ha comenzado.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<boolean> que indica si el flujo de trabajo ha comenzado.
   */
  hasFlowStarted(idProgram: string) {
    return this.http.get<BodyResponse<boolean>>(
      `${environment.API_PUBLIC}/workflow/base/started/${idProgram}`,
    );
  }
  /**
   * Crea un flujo de trabajo.
   * @param payload La información necesaria para crear el flujo de trabajo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  createWorkflow(payload: CreateWorkflow) {
    return this.http.post<BodyResponse<any>>(`${environment.API_PUBLIC}/workflow/base`, payload);
  }
  /**
   * Adjunta documentos por paso.
   * @param payload La información necesaria para adjuntar documentos por paso.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  attachByStep(payload: LoadDocumentsWorkflow) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/step/attach`,
      payload,
    );
  }
  /**
   * Elimina un documento.
   * @param id El ID del documento que se desea eliminar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<boolean> que indica el resultado de la operación.
   */
  deleteDocument(id: number) {
    return this.http.delete<BodyResponse<boolean>>(
      `${environment.API_PUBLIC}/workflow/step/attach/${id}`,
    );
  }
  /**
   * Envía un paso para evaluación.
   * @param payload La información necesaria para enviar un paso para evaluación.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  sendToEvaluation(payload: SendEvaluationWorkflow) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/step/send/evaluation`,
      payload,
    );
  }
  /**
   * Obtiene comentarios por flujo de trabajo y paso.
   * @param workFlowId El ID del flujo de trabajo para el cual se desean obtener los comentarios.
   * @param stepId El ID del paso para el cual se desean obtener los comentarios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<CommentsWorkflow[]> que contiene los comentarios por flujo de trabajo y paso.
   */
  getComments(workFlowId: number, stepId: number) {
    return this.http.get<BodyResponse<CommentsWorkflow[]>>(
      `${environment.API_PUBLIC}/workflow/step/review?workflowId=${workFlowId}&stepId=${stepId}`,
    );
  }
  /**
   * Responde a un comentario.
   * @param replyWorkflow La información necesaria para responder a un comentario.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  reply(replyWorkflow: ReplyWorkflow) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/step/review?workflowId`,
      replyWorkflow,
    );
  }
  /**
   * Obtiene comentarios de revisión.
   * @param pyload La información necesaria para obtener comentarios de revisión.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<CommentsWorkflow[]> que contiene comentarios de revisión.
   */
  getReview(pyload: RQComments) {
    return this.http.post<BodyResponse<CommentsWorkflow[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/chat/get`,
      pyload,
    );
  }
  /**
   * Crea un comentario de revisión.
   * @param replyWorkflow La información necesaria para crear un comentario de revisión.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  createReview(replyWorkflow: ReplyComments) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/chat`,
      replyWorkflow,
    );
  }

  /**
   *
   * Marca los mensajes de chat del currículo como leídos.
   * @param pyload Arreglo de identificadores de mensajes de chat.
   * @returns Un observable que emite una respuesta del tipo BodyResponse<any>.
   */
  readCurriculumChat(pyload: number[]) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/chat/read`,
      pyload,
    );
  }

  /**
   * Registra la trazabilidad de un programa.
   * @param payload La información de la trazabilidad del programa.
   * @param programId El ID del programa para el cual se desea registrar la trazabilidad.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  traceability(payload: TrceabilityWorkflow, programId: string) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/traceability/program-id/${programId}`,
      payload,
    );
  }
  /**
   * Obtiene la trazabilidad de un programa.
   * @param programId El ID del programa para el cual se desea obtener la trazabilidad.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<TrceabilityWorkflow> que contiene la trazabilidad del programa.
   */
  getTraceability(programId: string) {
    return this.http.get<BodyResponse<TrceabilityWorkflow>>(
      `${environment.API_PUBLIC}/traceability/program-id/${programId}`,
    );
  }
  /**
   * Actualiza la trazabilidad de un programa.
   * @param payload La información de la trazabilidad del programa.
   * @param programId El ID del programa para el cual se desea actualizar la trazabilidad.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  updateTraceability(payload: TrceabilityWorkflow, programId: string) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/traceability/program-id/${programId}`,
      payload,
    );
  }
  /**
   * Obtiene los campus asociados a un programa.
   * @param programId El ID del programa para el cual se desean obtener los campus.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<number[]> con los IDs de los campus asociados al programa.
   */
  getCampus(programId: string) {
    return this.http.get<BodyResponse<number[]>>(
      `${environment.API_PUBLIC}/program/${programId}/campus`,
    );
  }

  /**
   * Verifica si un programa es formal.
   * @param programId El ID del programa que se desea verificar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<boolean> indicando si el programa es formal o no.
   */
  isFormal(programId: string) {
    return this.http.get<BodyResponse<boolean>>(
      `${environment.API_PUBLIC}/program/${programId}/is-formal`,
    );
  }

  /**
   * Envía retroalimentación sobre un paso del flujo de trabajo.
   * @param payload La información de la retroalimentación del paso.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> que indica el resultado de la operación.
   */
  stepFeedback(payload: SendStepFeedback) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/step/feedback`,
      payload,
    );
  }
  /**
   * Obtiene los planes de estudios asociados a un programa.
   * @param programId El ID del programa para el cual se desean obtener los planes de estudios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ReponseComponentCurriculum[]> con los planes de estudios asociados al programa.
   */
  getPlanStdies(programId: string) {
    return this.http.get<BodyResponse<ReponseComponentCurriculum[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${programId}`,
    );
  }
  /**
   * Crea un nuevo componente de plan de estudios.
   * @param payload La información del componente de plan de estudios que se desea crear.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  createComponetCurriculum(payload: ComponenteWorkflow) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum`,
      payload,
    );
  }
  /**
   * Actualiza un componente de plan de estudios existente.
   * @param payload La información actualizada del componente de plan de estudios.
   * @param componentId El ID del componente de plan de estudios que se desea actualizar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  updateComponetCurriculum(payload: UpdateCurriculumRequests, componentId: number) {
    return this.http.put<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${componentId}`,
      payload,
    );
  }
  /**
   * Obtiene los elementos de plan de estudios de un programa según su tipo.
   * @param programId El ID del programa para el cual se desean obtener los elementos de plan de estudios.
   * @param type El tipo de elemento de plan de estudios que se desea obtener.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<CurriculumItem[]> con los elementos de plan de estudios del programa y tipo especificados.
   */
  getCurriculumByType(programId: string, type: string) {
    return this.http.get<BodyResponse<CurriculumItem[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${programId}/by-type/${type}`,
    );
  }
  /**
   * Calcula el porcentaje de avance de los elementos de plan de estudios de un programa.
   * @param programId El ID del programa para el cual se desea calcular el porcentaje de avance.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<CurriculumItem[]> con los elementos de plan de estudios del programa y su respectivo porcentaje de avance.
   */
  calculatePercentaje(programId: string) {
    return this.http.get<BodyResponse<CurriculumItem[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${programId}/calculate/percentage`,
    );
  }
  /**
   * Obtiene los elementos de plan de estudios de un programa según su elemento padre.
   * @param programId El ID del programa para el cual se desean obtener los elementos de plan de estudios.
   * @param father El elemento padre del cual se desean obtener los elementos de plan de estudios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<CurriculumItem[]> con los elementos de plan de estudios del programa y su elemento padre especificado.
   */
  getCurriculumByFather(programId: string, father: string) {
    return this.http.get<BodyResponse<CurriculumItem[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${programId}/by-father/${father}`,
    );
  }
  /**
   * Obtiene información de precarga para el plan de estudios de un programa.
   * @param curriculumId El ID del plan de estudios para el cual se desea obtener la información de precarga.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<PreloadDataSyllabus> con la información de precarga del plan de estudios.
   */
  getSyllabusPreloadInformation(curriculumId: string) {
    return this.http.get<BodyResponse<PreloadDataSyllabus>>(
      `${environment.API_PUBLIC}/workflow/syllabus/preload-information/${curriculumId}`,
    );
  }
  /**
   * Crea datos de plan de estudios para un programa.
   * @param payload La información de plan de estudios que se desea crear.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  createDataSyllabus(payload: SyllabusData) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/syllabus`,
      payload,
    );
  }
  /**
   * Actualiza datos de plan de estudios para un programa.
   * @param payload La información actualizada de plan de estudios.
   * @param idSyllabus El ID del plan de estudios que se desea actualizar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  updateDataSyllabus(payload: SyllabusData, idSyllabus: number) {
    return this.http.put<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/syllabus/${idSyllabus}`,
      payload,
    );
  }
  /**
   * Obtiene el archivo PDF del plan de estudios de un programa.
   * @param curriculumId El ID del plan de estudios para el cual se desea obtener el archivo PDF.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el archivo PDF del plan de estudios.
   */
  getSyllabusPdf(curriculumId: string) {
    return this.http.get<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/syllabus/curriculum-id/${curriculumId}`,
    );
  }
  /**
   * Verifica si existe un plan de estudios asociado a un programa.
   * @param curriculumId El ID del plan de estudios para el cual se desea verificar su existencia.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<boolean> indicando si existe el plan de estudios.
   */
  getExistsSyllabus(curriculumId: number) {
    return this.http.get<BodyResponse<boolean>>(
      `${environment.API_PUBLIC}/workflow/syllabus/exist/curriculum-id/${curriculumId}`,
    );
  }
  /**
   * Elimina un componente de plan de estudios.
   * @param component El ID del componente de plan de estudios que se desea eliminar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  deleteComponentCurriculum(component: number) {
    return this.http.delete<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${component}`,
    );
  }
  /**
   * Crea un resumen de plan de estudios para un programa.
   * @param payload La información del resumen de plan de estudios que se desea crear.
   * @returns Un Observable que emite una respuesta de tipo any indicando el resultado de la operación.
   */
  createCurriculumSummary(payload: SendCurriculmSummary) {
    return this.http.post<any>(`${environment.API_PUBLIC}/workflow/curriculum/summary`, payload);
  }
  /**
   * Actualiza un resumen de plan de estudios existente.
   * @param payload La información actualizada del resumen de plan de estudios.
   * @param id El ID del resumen de plan de estudios que se desea actualizar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  updateCurriculumSummary(payload: UpdateCurriculumSummary, id: number) {
    return this.http.put<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/summary/${id}`,
      payload,
    );
  }
  /**
   * Obtiene un resumen de plan de estudios según su tipo y los IDs de flujo de trabajo y paso.
   * @param type El tipo de resumen de plan de estudios.
   * @param workFlowId El ID del flujo de trabajo asociado al resumen de plan de estudios.
   * @param stepId El ID del paso asociado al resumen de plan de estudios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el resumen de plan de estudios solicitado.
   */
  getCurriculumSummary(type: number, workFlowId: number, stepId: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/summary/${type}?workflowId=${workFlowId}&stepId=${stepId}`,
    );
  }
  /**
   * Obtiene el nombre de un programa académico.
   * @param programId El ID del programa del cual se desea obtener el nombre.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el nombre del programa académico.
   */
  getProgramName(programId: string) {
    return this.http.get<BodyResponse<any>>(`${environment.API_PUBLIC}/program/${programId}`);
  }
  /**
   * Aprueba una traza de flujo de trabajo para un programa académico.
   * @param payload La información de la traza de flujo de trabajo que se desea aprobar.
   * @param idProgram El ID del programa académico al cual se desea asociar la traza de flujo de trabajo aprobada.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  approveTraza(payload: ApproveTraza, idProgram: string) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/step/feedback/traceability/program-id/${idProgram}`,
      payload,
    );
  }
  /**
   * Crea un resumen de flujo de trabajo.
   * @param payload La información del resumen de flujo de trabajo que se desea crear.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  summary(payload: SummaryWorkflow) {
    return this.http.post<BodyResponse<any>>(`${environment.API_PUBLIC}/workflow/summary`, payload);
  }
  /**
   * Obtiene un resumen de flujo de trabajo según los IDs de paso y flujo de trabajo.
   * @param stepId El ID del paso asociado al resumen de flujo de trabajo.
   * @param workflowId El ID del flujo de trabajo asociado al resumen de flujo de trabajo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el resumen de flujo de trabajo solicitado.
   */
  getSummary(stepId: number, workflowId: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/summary?workflowId=${workflowId}&stepId=${stepId}`,
    );
  }
  /**
   * Obtiene las asignaturas asociadas a un programa académico.
   * @param idProgram El ID del programa académico del cual se desean obtener las asignaturas.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ISubjectData[]> con las asignaturas del programa.
   */
  getSubjects(idProgram: string) {
    return this.http.get<BodyResponse<ISubjectData[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${idProgram}/subjects`,
    );
  }
  /**
   * Envía un resumen de flujo de trabajo a revisión.
   * @param idSummary El ID del resumen de flujo de trabajo que se desea enviar a revisión.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> indicando el resultado de la operación.
   */
  sendSummaryToReview(idSummary: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/summary/${idSummary}`,
    );
  }
  /**
   * Obtiene un resumen de flujo de trabajo que ha sido enviado a evaluar.
   * @param idSummary El ID del resumen de flujo de trabajo que se desea obtener.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el resumen de flujo de trabajo solicitado.
   */
  getSendSummarytoEvaluate(idSummary: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/summary/${idSummary}/sended`,
    );
  }
  /**
   * Obtiene el currículo por tipo de resumen de flujo de trabajo.
   * @param programId El ID del programa académico asociado al resumen de flujo de trabajo.
   * @param type El tipo de resumen de flujo de trabajo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el currículo solicitado.
   */
  getCurricularByType(programId: string, type: string) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/summary/curricular/object-id/${programId}/type/${type}`,
    );
  }
  /**
   * Obtiene el resumen de currículo por tipo.
   * @param programId El ID del programa académico asociado al resumen de currículo.
   * @param type El tipo de resumen de currículo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el resumen de currículo solicitado.
   */
  getCurriculumSummaryType(programId: string, type: string) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/summary/type/${type}/object-id/${programId}`,
    );
  }
  /**
   * Obtiene el plan de estudios de un programa académico para un semestre específico.
   * @param programId El ID del programa académico del cual se desea obtener el plan de estudios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<StudyPlanStudent> con el plan de estudios solicitado.
   */
  getCurriculumStudent(programId: string) {
    return this.http.get<BodyResponse<StudyPlanStudent>>(
      `${environment.API_PUBLIC}/workflow/curriculum/semester/object-id/${programId}`,
    );
  }
  /**
   * Obtiene el archivo PDF del plan de estudios de un programa académico.
   * @param programId El ID del programa académico del cual se desea obtener el archivo PDF del plan de estudios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con la URL del archivo PDF del plan de estudios.
   */
  getPdfStudyPlan(programId: string) {
    return this.http.get<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/curriculum/pdf/object-id/${programId}`,
    );
  }
  /**
   * Obtiene los detalles del plan de estudios por ID de currículo.
   * @param idCurriculum El ID del currículo del cual se desean obtener los detalles del plan de estudios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con los detalles del plan de estudios solicitados.
   */
  getDetailIdStudyPlan(idCurriculum: number): Observable<BodyResponse<any>> {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/detail/${idCurriculum}`,
    );
  }

  /**
   * Obtiene los detalles de un plan de estudios por su ID de currículo.
   * @param idCurriculum El ID del currículo del cual se desean obtener los detalles.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con los detalles del plan de estudios solicitados.
   */
  getDetailSyllabusId(idCurriculum: number): Observable<BodyResponse<any>> {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/syllabus/curriculum-id/${idCurriculum}`,
    );
  }
  /**
   * Obtiene un NIF por tipo.
   * @param type El tipo de NIF que se desea obtener.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<INif> con el NIF solicitado.
   */
  getNifByType(type: number) {
    return this.http.get<BodyResponse<INif>>(`${environment.API_PUBLIC}/workflow/nif/type/${type}`);
  }
  /**
   * Crea un nuevo NIF.
   * @param news El nuevo NIF que se desea crear.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createNif(news: INif) {
    return this.http.post<BodyResponse<string>>(`${environment.API_PUBLIC}/workflow/nif`, news);
  }
  /**
   * Agrega secciones a un NIF existente.
   * @param nifId El ID del NIF al cual se desea agregar secciones.
   * @param news Las nuevas secciones que se desean agregar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  addSecctionByNif(nifId: number, news: INif[]) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/nif/${nifId}`,
      news,
    );
  }
  /**
   * Actualiza un NIF existente.
   * @param nifId El ID del NIF que se desea actualizar.
   * @param news Los nuevos datos del NIF.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateNIf(nifId: number, news: any) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/nif/${nifId}`,
      news,
    );
  }
  /**
   * Elimina un NIF existente.
   * @param nifId El ID del NIF que se desea eliminar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  deleteNIf(nifId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/nif/${nifId}`,
    );
  }
  /**
   * Obtiene el NIF del currículo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<IRsCurriculumNif> con el NIF del currículo.
   */
  getCurriculumNif(): Observable<BodyResponse<any>> {
    return this.http.get<BodyResponse<IRsCurriculumNif>>(
      `${environment.API_PUBLIC}/workflow/curriculum/nif`,
    );
  }

  /**
   * Crea un nuevo subcomponente de currículo NIF.
   * @param pyload Los datos del nuevo subcomponente de currículo NIF.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createSubCoreNif(pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/curriculum/nif`,
      pyload,
    );
  }
  /**
   * Obtiene los detalles del currículo por su ID.
   * @param idCurriculum El ID del currículo del cual se desean obtener los detalles.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con los detalles del currículo solicitados.
   */
  getCurriculumDetail(idCurriculum: number): Observable<BodyResponse<any>> {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/detail/${idCurriculum}`,
    );
  }
  /**
   * Obtiene los datos del sílabo por ID de currículo.
   * @param curriculumId El ID del currículo del cual se desean obtener los datos del sílabo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con los datos del sílabo solicitados.
   */
  getSyllabusData(curriculumId: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/syllabus/data/curriculum-id/${curriculumId}`,
    );
  }
  /**
   * Obtiene los datos de la guía de asignatura por ID de currículo.
   * @param curriculumId El ID del currículo del cual se desean obtener los datos de la guía de asignatura.
   * @param pyload Los datos de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con los datos de la guía de asignatura solicitados.
   */
  getSubjectGuideData(curriculumId: number, pyload: any) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/guide/curriculum-id/${curriculumId}/data`,
      pyload,
    );
  }
  /**
   * Obtiene los datos de precarga de la guía de asignatura por ID de currículo.
   * @param curriculumId El ID del currículo del cual se desean obtener los datos de precarga de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con los datos de precarga de la guía de asignatura solicitados.
   */
  getPreloadDataSubjectGuideData(curriculumId: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/guide/pre-load/curriculum-id/${curriculumId}`,
    );
  }
  /**
   * Obtiene el PDF de los datos del sílabo por ID de currículo.
   * @param curriculumId El ID del currículo del cual se desea obtener el PDF de los datos del sílabo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el PDF de los datos del sílabo solicitados.
   */
  getSyllabusDataNifPdf(curriculumId: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/syllabus/curriculum-id/${curriculumId}`,
    );
  }
  /**
   * Obtiene el PDF de los datos de la guía de asignatura por ID de currículo.
   * @param curriculumId El ID del currículo del cual se desea obtener el PDF de los datos de la guía de asignatura.
   * @param pyload Los datos de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con el PDF de los datos de la guía de asignatura solicitados.
   */
  getSubjectGuideNifPdf(curriculumId: number, pyload: any) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/guide/pdf/curriculum-id/${curriculumId}`,
      pyload,
    );
  }
  /**
   * Crea una actividad de guía de asignatura.
   * @param guideId El ID de la guía de asignatura a la cual se desea agregar la actividad.
   * @param pyload Los datos de la actividad de guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createSubjetGuideActivity(guideId: number, pyload: IActivityRequest[]) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/${guideId}/activity`,
      pyload,
    );
  }
  /**
   * Actualiza una actividad de guía de asignatura.
   * @param activityId El ID de la actividad de guía de asignatura que se desea actualizar.
   * @param pyload Los datos de la actividad de guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateSubjetGuideActivity(activityId: number, pyload: IActivityRequest) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/activity/${activityId}`,
      pyload,
    );
  }
  /**
   * Obtiene los programas de asignatura de la guía de asignatura.
   * @param pyload Los filtros para la búsqueda de programas de asignatura.
   * @param pageObj El objeto de paginación que contiene la página y el tamaño de la página.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con los programas de asignatura obtenidos.
   */
  getProgramSubjectGuideSubjectPrograms(pyload: FilterProgramSubject, pageObj: IPagination) {
    return this.http.post<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/curriculum/program-subject?page=${pageObj.page}&size=${pageObj.size}`,
      pyload,
    );
  }
  /**
   * Obtiene los docentes por asignatura.
   * @param curriculumId El ID del currículo del cual se desean obtener los docentes.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ITeacherSubject[]> con los docentes obtenidos.
   */
  getTeachersBySubject(curriculumId: number) {
    return this.http.get<BodyResponse<ITeacherSubject[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${curriculumId}/teacher`,
    );
  }
  /**
   * Asigna un coordinador a un currículo.
   * @param curriculumId El ID del currículo al cual se desea asignar el coordinador.
   * @param pyload Los datos del coordinador a asignar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  assignCoordinatorCurriculum(curriculumId: number, pyload: any[]) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${curriculumId}/coordinator`,
      pyload,
    );
  }
  /**
   * Elimina una actividad de guía de asignatura.
   * @param activityId El ID de la actividad de guía de asignatura que se desea eliminar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  deleteSubjetGuideActivity(activityId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/activity/${activityId}`,
    );
  }
  /**
   * Crea una actividad de integración.
   * @param activityId El ID de la actividad de integración.
   * @param pyload Los datos de la actividad de integración.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createIntegrateActivity(activityId: number, pyload: IIntegryActivities[]) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/activity/curriculum-id/${activityId}`,
      pyload,
    );
  }
  /**
   * Actualiza una actividad de integración.
   * @param activityId El ID de la actividad de integración que se desea actualizar.
   * @param pyload Los datos de la actividad de integración.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateIntegrateActivity(activityId: number, pyload: IIntegryActivities) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/activity/${activityId}`,
      pyload,
    );
  }
  /**
   * Elimina una actividad de integración.
   * @param activityId El ID de la actividad de integración que se desea eliminar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  deleteIntegrateActivity(activityId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/activity/${activityId}`,
    );
  }
  /**
   * Crea una guía de asignatura.
   * @param curriculumId El ID del currículo al cual se asociará la guía de asignatura.
   * @param pyload Los datos de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createSubjetGuide(curriculumId: number, pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/curriculum-id/${curriculumId}`,
      pyload,
    );
  }
  /**
   * Actualiza una guía de asignatura.
   * @param sujectGuideId El ID de la guía de asignatura que se desea actualizar.
   * @param pyload Los datos actualizados de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateSubjetGuideNif(sujectGuideId: number, pyload: any) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/curriculum-id/${sujectGuideId}`,
      pyload,
    );
  }
  /**
   * Actualiza un currículo.
   * @param curriculumId El ID del currículo que se desea actualizar.
   * @param pyload Los datos actualizados del currículo.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateCurriculumNif(curriculumId: number, pyload: any) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${curriculumId}`,
      pyload,
    );
  }
  /**
   * Actualiza un plan de estudio (Syllabus).
   * @param curriculumId El ID del plan de estudio (Syllabus) que se desea actualizar.
   * @param pyload Los datos actualizados del plan de estudio (Syllabus).
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateSyllabusNif(curriculumId: number, pyload: any) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/syllabus/${curriculumId}`,
      pyload,
    );
  }
  /**
   * Actualiza los NIFs complementarios de un currículo.
   * @param curriculumId El ID del currículo al cual se actualizarán los NIFs complementarios.
   * @param pyload Los datos de los NIFs complementarios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateCurriculumComplementaryNifs(curriculumId: number, pyload: any) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${curriculumId}/complementary-nif`,
      pyload,
    );
  }
  /**
   * Obtiene los usuarios relacionados con un programa y un rol específicos.
   * @param programId El ID del programa.
   * @param roleId El ID del rol.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<IUserAssigned[]> con la lista de usuarios relacionados.
   */
  getUserRelatedWithProgram(programId: number, roleId: number) {
    return this.http.get<BodyResponse<IUserAssigned[]>>(
      `${environment.API_PUBLIC}/workflow/user/object-id/${programId}/role-id/${roleId}`,
    );
  }
  /**
   * Relaciona un usuario a un flujo de trabajo (workflow) específico.
   * @param programId El ID del programa.
   * @param userData Los datos del usuario y su rol.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  relateUserToWorkflow(programId: number, userData: DirectorsRole) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/base/relate-user/object-id/${programId}`,
      userData,
    );
  }

  relateUserToWorkflowFather(programId: number, userData: DirectorsRole) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/base/relate-user/father/object-id/${programId}`,
      userData,
    );
  }

  /**
   * Evalúa una actividad de una guía de asignatura.
   * @param guideId El ID de la guía de asignatura.
   * @param pyload Los datos de la evaluación de la actividad.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  evaluateActivitySubjectGuide(guideId: number, pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/${guideId}/activity/evaluate`,
      pyload,
    );
  }
  /**
   * Evalúa una guía de asignatura.
   * @param guideId El ID de la guía de asignatura.
   * @param pyload Los datos de la evaluación de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  evaluateSubjectGuide(guideId: number, pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/${guideId}/evaluate`,
      pyload,
    );
  }
  /**
   * Evalúa la renovación de una guía de asignatura.
   * @param guideId El ID de la guía de asignatura.
   * @param pyload Los datos de la evaluación de la renovación de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  evaluateRenovationSubjectGuide(guideId: number, pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/renovation/${guideId}`,
      pyload,
    );
  }
  /**
   * Obtiene las actividades pasadas de una guía de asignatura.
   * @param guideId El ID de la guía de asignatura.
   * @param pyload Los datos de la solicitud de actividades pasadas.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<IActivityRequest[]> con la lista de actividades pasadas.
   */
  getPastActivitiesSubjectGuide(guideId: number, pyload: any) {
    return this.http.post<BodyResponse<IActivityRequest[]>>(
      `${environment.API_PUBLIC}/workflow/guide/${guideId}/activity/past`,
      pyload,
    );
  }
  /**
   * Agrega una actividad pasada al período actual de una guía de asignatura.
   * @param guideId El ID de la guía de asignatura.
   * @param pyload Los datos de la actividad pasada.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  addPastActivityToCurrentPeriod(guideId: number, pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/activity/past`,
      pyload,
    );
  }
  /**
   * Crea una renovación de una guía de asignatura.
   * @param guideId El ID de la guía de asignatura.
   * @param pyload Los datos de la renovación de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createRenovationSubjectGuide(guideId: number, pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/guide/${guideId}/renovation`,
      pyload,
    );
  }
  /**
   * Obtiene las renovaciones de una guía de asignatura.
   * @param guideId El ID de la guía de asignatura.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any[]> con la lista de renovaciones.
   */
  getRenovationsBySubjectGuide(guideId: number) {
    return this.http.get<BodyResponse<any[]>>(
      `${environment.API_PUBLIC}/workflow/guide/${guideId}/renovation`,
    );
  }
  /**
   * Obtiene los niveles de un programa.
   * @param programId El ID del programa.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ILevelTypes[]> con la lista de niveles.
   */
  getLevelsByProgram(programId: number) {
    return this.http.get<BodyResponse<ILevelTypes[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/levels/object-id/${programId}`,
    );
  }
  /**
   * Obtiene las evaluaciones de aprendizaje por tipo de un programa.
   * @param programId El ID del programa.
   * @param type El tipo de evaluación.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<ILearningEvaluation[]> con la lista de evaluaciones.
   */
  getCurriculumEvaluationByType(programId: number, type: number) {
    return this.http.get<BodyResponse<ILearningEvaluation[]>>(
      `${environment.API_PUBLIC}/workflow/curriculum/object-id/${programId}/by-type/${type}/complementary-evaluation`,
    );
  }
  /**
   * Obtiene las evaluaciones de aprendizaje por plan de estudios.
   * @param curriculumId El ID del plan de estudios.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<any> con las evaluaciones de aprendizaje.
   */
  getLearningAssessmentByCurriculumId(curriculumId: number) {
    return this.http.get<BodyResponse<any>>(
      `${environment.API_PUBLIC}/workflow/learning/curriculum-id/${curriculumId}`,
    );
  }
  /**
   * Crea una evaluación de aprendizaje para un plan de estudios.
   * @param curriculumId El ID del plan de estudios.
   * @param pyload Los datos de la evaluación de aprendizaje a crear.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createLearningAssessment(curriculumId: number, pyload: ICreateLearningAssessment) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/learning/curriculum-id/${curriculumId}`,
      pyload,
    );
  }
  /**
   * Actualiza una evaluación de aprendizaje existente.
   * @param learningAssessmentId El ID de la evaluación de aprendizaje a actualizar.
   * @param pyload Los nuevos datos de la evaluación de aprendizaje.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateLearningAssessment(learningAssessmentId: number, pyload: ICreateLearningAssessment) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/learning/${learningAssessmentId}`,
      pyload,
    );
  }
  /**
   * Elimina una evaluación de aprendizaje existente.
   * @param learningAssessmentId El ID de la evaluación de aprendizaje a eliminar.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  deleteLearningAssessment(learningAssessmentId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/learning/${learningAssessmentId}`,
    );
  }
  /**
   * Crea una evaluación complementaria para un plan de estudios.
   * @param curriculumId El ID del plan de estudios.
   * @param pyload Los datos de la evaluación complementaria a crear.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  createComplementaryEvaluation(curriculumId: number, pyload: any) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${curriculumId}/complementary-evaluation`,
      pyload,
    );
  }
  /**
   * Actualiza una evaluación complementaria existente para un plan de estudios.
   * @param curriculumId El ID del plan de estudios.
   * @param pyload Los nuevos datos de la evaluación complementaria.
   * @returns Un Observable que emite una respuesta de tipo BodyResponse<string> con el resultado de la operación.
   */
  updateComplementaryEvaluation(curriculumId: number, pyload: any) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/curriculum/${curriculumId}/complementary-evaluation`,
      pyload,
    );
  }
}
