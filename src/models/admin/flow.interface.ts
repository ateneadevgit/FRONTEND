import { Roleslist } from '../roles-list.interface';

export interface IFlow {
  workflowId: number;
  name: string;
  description: string | null;
}

export interface IFlowRequest {
  description: string | null;
  name: string;
}

export interface IFlowStep {
  stepId: number;
  name: string;
  isRequired: boolean;
  hasSummary: boolean;
  orderStep: number;
  enabled: boolean;
  minimumRequired: string | null;
  minimumRequiredId: number;
}

export interface IStepTemplateRequest {
  template: string;
  stepId: number;
  enabled: boolean;
}

export interface IListAction {
  actionId: number;
  actionName: string;
  description: string;
  isSelected: boolean;
}

export interface IRoleAction {
  actionIds: IListAction[];
  role: Roleslist | null;
  roleId: number;
  expanded: boolean;
  isSelected: boolean;
}

export interface IStepRequest {
  hasSummary: boolean;
  isPrerrequeriment: boolean;
  name: string;
  roleActions: IRoleAction[];
  stepOrder: number;
}

export interface IStepModel {
  name: string;
  stepOrder: number;
  isPrerrequeriment: boolean;
  hasSummary: boolean;
  roleActions: IRoleAction[];
  minimumRequired: string | null;
  expanded: boolean;
}
