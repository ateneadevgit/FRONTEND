/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { FlowService } from 'src/app/services/admin/flow/flow.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { RoutesApp } from 'src/enums/routes.enum';
import {
  IFlow,
  IFlowStep,
  IListAction,
  IRoleAction,
  IStepRequest,
  IStepTemplateRequest,
} from 'src/models/admin/flow.interface';
import { Roleslist } from 'src/models/roles-list.interface';

@Component({
  selector: 'app-step-flow',
  templateUrl: './step-flow.component.html',
  styleUrls: ['./step-flow.component.scss'],
})
export class StepFlowComponent implements OnInit {
  currentFlow: IFlow | null = null;
  breadcrumbItems: MenuItem[] = [];
  workflowStepList: IFlowStep[] = [];
  currentStep: IFlowStep | null = null;
  stepTemplateKey = false;
  popupTemplate = '';
  content = '';
  contentSize = 0;
  editTemplate = false;
  createStepKey = false;
  roleList: Roleslist[] = [];
  alreadyAssigned: number[] = [];
  roleId: Roleslist | null = null;
  actionList: IListAction[] = [];
  roleAction: IRoleAction[] = [];
  selectedAction: IListAction[] = [];
  updateRoleActionRelationKey = false;
  hasSummary = false;
  isPrerrequirement = false;
  viewStepKey = false;
  updateStepKey = false;
  checkIsPriority = true;

  constructor(
    private flowService: FlowService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private roleService: RolesService,
  ) {}

  defaultRole: Roleslist | null = null;

  formStep = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    order: new FormControl('', [Validators.maxLength(255)]),
    isPrerrequirement: new FormControl(false, [Validators.required]),
    hasSummary: new FormControl(false, [Validators.required]),
    role: new FormControl(this.defaultRole, [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  get formStepControls() {
    return this.formStep.controls;
  }

  ngOnInit(): void {
    this.currentFlow =
      localStorage.getItem('flow')?.toString() !== undefined
        ? JSON.parse(localStorage.getItem('flow')?.toString() ?? '')
        : null;
    this.breadcrumbItems = [
      { label: 'Flujos de creación', routerLink: '/' + RoutesApp.FLOWS },
      { label: this.currentFlow?.name },
    ];
    this.getWorkflowStep();
  }

  getWorkflowStep() {
    this.flowService.getWorkflowStep(this.currentFlow?.workflowId || 0).subscribe((response) => {
      this.workflowStepList = response.data;
    });
  }

  openStepTemplate(item: IFlowStep) {
    this.currentStep = item;

    if (item.minimumRequired === null) {
      this.popupTemplate = 'Creación de anexos mínimos requeridos';
    } else {
      this.popupTemplate = 'Actualización de anexos mínimos requeridos';
      this.content = item.minimumRequired;
      this.editTemplate = true;
    }
    this.stepTemplateKey = true;
  }

  createTemplate() {
    if (this.content.length <= 0 || this.content.length > 10000) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newTemplate: IStepTemplateRequest = {
        template: this.content,
        stepId: this.currentStep?.stepId || 0,
        enabled: this.checkIsPriority,
      };
      if (this.editTemplate) {
        console.log(this.editTemplate);

        this.updateTemplate(newTemplate);
      } else {
        this.saveTemplate(newTemplate);
      }
    }
  }

  createHtml(event: any) {
    this.content = event;
    this.contentSize = event.length;
  }

  cleanTemplateForm() {
    this.content = '';
    this.contentSize = 0;
    this.currentStep = null;
    this.editTemplate = false;
    this.checkIsPriority = true;
    this.stepTemplateKey = false;
  }

  saveTemplate(payload: IStepTemplateRequest) {
    this.flowService.createStepTemplate(payload).subscribe({
      next: () => {
        this.getWorkflowStep();
        this.cleanTemplateForm();
        this.alertService.showSuccessMessage({
          message: 'Acción realizada con éxito',
        });
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  updateTemplate(payload: IStepTemplateRequest) {
    this.flowService
      .updateStepTemplate(this.currentStep?.minimumRequiredId || 0, payload)
      .subscribe({
        next: () => {
          this.getWorkflowStep();
          this.cleanTemplateForm();
          this.alertService.showSuccessMessage({
            message: 'Acción realizada con éxito',
          });
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        const { data } = response;
        this.roleList = data;
      },
    });
  }

  alredyRolesAssigned() {
    this.flowService
      .getRolesRelatedWithStep(this.currentStep?.stepId || 0)
      .subscribe((response) => {
        this.alreadyAssigned = response.data;
      });
  }

  openCreateStep() {
    this.getRoles();
    this.createStepKey = true;
  }

  changeRole(event: any) {
    this.roleId = event.value;
    this.getActions();
  }

  getActions() {
    this.flowService.getActions().subscribe((response) => {
      const actions = response.data;
      actions.forEach((action) => (action.isSelected = false));
      this.actionList = actions;
    });
  }

  asociateRoleAndAction() {
    const newRoleAction: IRoleAction = {
      role: this.roleId,
      roleId: this.roleId?.roleId || 0,
      actionIds: this.selectedAction,
      expanded: false,
      isSelected: false,
    };
    this.roleAction.push(newRoleAction);
    this.roleId = null;
    this.formStep.controls.role.setValue(null);
    this.actionList = [];
    this.selectedAction = [];
  }

  addActionToRole(item: IListAction) {
    if (item.isSelected) {
      this.selectedAction.push(item);
    } else {
      const index = this.selectedAction.indexOf(item);
      if (index !== -1) {
        this.selectedAction.splice(index, 1);
      }
    }
  }

  openCloseExpandedReqUpdate(item: IRoleAction) {
    item.expanded = item?.expanded === true ? false : true;
  }

  deleteRoleActionRelation(item: IRoleAction) {
    const index = this.roleAction.indexOf(item);
    if (index !== -1) {
      this.roleAction.splice(index, 1);
    }
  }

  openUpdateRoleActionRelation(item: IRoleAction) {
    this.flowService.getActions().subscribe((response) => {
      const selectedActionsId: number[] = [];
      item.actionIds.forEach((action) => {
        selectedActionsId.push(action.actionId);
      });

      const actions = response.data;
      actions.forEach((action) => {
        action.isSelected = selectedActionsId.includes(action.actionId) ? true : false;
      });
      item.actionIds = actions;
      this.updateRoleActionRelationKey = true;
      item.expanded = true;
    });
  }

  updateRoleActionRelation(item: IRoleAction) {
    item.actionIds = item.actionIds.filter((action) => action.isSelected === true);
    this.updateRoleActionRelationKey = false;
  }

  createStep() {
    if (this.formStep.get('name')?.invalid || this.formStep.get('order')?.invalid) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else if (this.roleAction.length <= 0) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Se debe agregar por lo menos un rol',
      });
    } else {
      const newStep: IStepRequest = {
        hasSummary: this.hasSummary,
        isPrerrequeriment: this.isPrerrequirement,
        name: this.formStepControls['name'].value || '',
        stepOrder: Number(this.formStepControls['order'].value) || 0,
        roleActions: this.roleAction,
      };
      this.flowService.createStep(this.currentFlow?.workflowId || 0, newStep).subscribe({
        next: () => {
          this.cleanStepForm();
          this.alertService.showSuccessMessage({
            message: 'Acción realizada con éxito',
          });
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  cleanStepForm() {
    this.formStep.controls.name.setValue('');
    this.formStep.controls.order.setValue('0');
    this.updateRoleActionRelationKey = false;
    this.hasSummary = false;
    this.isPrerrequirement = false;
    this.roleAction = [];
    this.selectedAction = [];
    this.formStep.reset();
    this.createStepKey = false;
  }

  openViewStep(item: IFlowStep) {
    this.currentStep = item;
    this.viewStepKey = true;
  }

  disableEnableStep(item: IFlowStep) {
    const enabled = !item.enabled ? false : true;
    this.flowService
      .enableDisableStep(this.currentFlow?.workflowId || 0, item.stepId, enabled)
      .subscribe({});
  }

  openUpdateStep(item: IFlowStep) {
    this.currentStep = item;
    this.updateStepKey = true;
  }

  closeModalUpdateStep() {
    this.getWorkflowStep();
    this.updateStepKey = false;
    this.cleanTemplateForm();
  }
}
