import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IFlow,
  IFlowRequest,
  IFlowStep,
  IListAction,
  IRoleAction,
  IStepModel,
  IStepRequest,
  IStepTemplateRequest,
} from 'src/models/admin/flow.interface';
import { BodyResponse } from 'src/models/body.interface';
/**
 * Servicio para la gestión de flujos de trabajo y pasos de flujo de trabajo.
 */
@Injectable({
  providedIn: 'root',
})
export class FlowService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de flujos de trabajo.
   * @returns Un observable que emite la lista de flujos de trabajo.
   */
  getWorkflows() {
    return this.http.get<BodyResponse<IFlow[]>>(`${environment.API_PUBLIC}/workflow`);
  }

  /**
   * Actualiza un flujo de trabajo existente.
   * @param flowId El ID del flujo de trabajo a actualizar.
   * @param payload La información actualizada del flujo de trabajo.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateWorkflow(flowId: number, payload: IFlowRequest) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/${flowId}`,
      payload,
    );
  }

  /**
   * Obtiene una lista de pasos de flujo de trabajo para un flujo de trabajo específico.
   * @param workflowId El ID del flujo de trabajo.
   * @returns Un observable que emite la lista de pasos de flujo de trabajo.
   */
  getWorkflowStep(workflowId: number) {
    return this.http.get<BodyResponse<IFlowStep[]>>(
      `${environment.API_PUBLIC}/workflow/workflow-step/${workflowId}`,
    );
  }

  /**
   * Actualiza una plantilla de paso de flujo de trabajo existente.
   * @param templateId El ID de la plantilla de paso a actualizar.
   * @param payload La información actualizada de la plantilla de paso.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateStepTemplate(templateId: number, payload: IStepTemplateRequest) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step-template/${templateId}`,
      payload,
    );
  }

  /**
   * Crea una nueva plantilla de paso de flujo de trabajo.
   * @param payload La información de la nueva plantilla de paso.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createStepTemplate(payload: IStepTemplateRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step-template`,
      payload,
    );
  }

  /**
   * Obtiene una lista de roles relacionados con un paso de flujo de trabajo.
   * @param stepId El ID del paso de flujo de trabajo.
   * @returns Un observable que emite la lista de IDs de roles relacionados con el paso.
   */
  getRolesRelatedWithStep(stepId: number) {
    return this.http.get<BodyResponse<number[]>>(
      `${environment.API_PUBLIC}/workflow/step-role-action/step-id/${stepId}/roles`,
    );
  }

  /**
   * Obtiene una lista de acciones disponibles para los pasos del flujo de trabajo.
   * @returns Un observable que emite la lista de acciones.
   */
  getActions() {
    return this.http.get<BodyResponse<IListAction[]>>(`${environment.API_PUBLIC}/workflow/action`);
  }

  /**
   * Crea un nuevo paso de flujo de trabajo para un flujo de trabajo específico.
   * @param workflowId El ID del flujo de trabajo al que se agregará el paso.
   * @param payload La información del nuevo paso de flujo de trabajo.
   * @returns Un observable que emite la respuesta del servidor.
   */
  createStep(workflowId: number, payload: IStepRequest) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step/workflow-id/${workflowId}`,
      payload,
    );
  }

  /**
   * Habilita o deshabilita un paso de flujo de trabajo.
   * @param workflowId El ID del flujo de trabajo al que pertenece el paso.
   * @param stepId El ID del paso de flujo de trabajo.
   * @param enabled Indica si el paso debe ser habilitado (true) o deshabilitado (false).
   * @returns Un observable que emite la respuesta del servidor.
   */
  enableDisableStep(workflowId: number, stepId: number, enabled: boolean) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step/${stepId}/workflow-id/${workflowId}/enable/${enabled}`,
    );
  }

  /**
   * Obtiene un paso de flujo de trabajo por su ID.
   * @param workflowId El ID del flujo de trabajo al que pertenece el paso.
   * @param stepId El ID del paso de flujo de trabajo.
   * @returns Un observable que emite el modelo del paso de flujo de trabajo.
   */
  getStepById(workflowId: number, stepId: number) {
    return this.http.get<BodyResponse<IStepModel>>(
      `${environment.API_PUBLIC}/workflow/step/${stepId}/workflow-id/${workflowId}`,
    );
  }

  /**
   * Elimina un rol de un paso de flujo de trabajo.
   * @param stepId El ID del paso de flujo de trabajo.
   * @param roleId El ID del rol a eliminar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  deleteRolefromStep(stepId: number, roleId: number) {
    return this.http.delete<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step-role-action/step-id/${stepId}/role-id/${roleId}`,
    );
  }

  /**
   * Agrega una acción de rol a un paso de flujo de trabajo.
   * @param stepId El ID del paso de flujo de trabajo.
   * @param payload La información de la acción de rol a agregar.
   * @returns Un observable que emite la respuesta del servidor.
   */
  addRoleActionToStep(stepId: number, payload: IRoleAction) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step-role-action/step-id/${stepId}`,
      payload,
    );
  }

  /**
   * Actualiza una acción de rol en un paso de flujo de trabajo.
   * @param stepId El ID del paso de flujo de trabajo.
   * @param payload La información actualizada de la acción de rol.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateRoleActionToStep(stepId: number, payload: IRoleAction) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step-role-action/step-id/${stepId}`,
      payload,
    );
  }

  /**
   * Actualiza un paso de flujo de trabajo existente.
   * @param workflowId El ID del flujo de trabajo al que pertenece el paso.
   * @param stepId El ID del paso de flujo de trabajo a actualizar.
   * @param payload La información actualizada del paso de flujo de trabajo.
   * @returns Un observable que emite la respuesta del servidor.
   */
  updateStep(workflowId: number, stepId: number, payload: IStepRequest) {
    return this.http.put<BodyResponse<string>>(
      `${environment.API_PUBLIC}/workflow/step/${stepId}/workflow-id/${workflowId}`,
      payload,
    );
  }
}
