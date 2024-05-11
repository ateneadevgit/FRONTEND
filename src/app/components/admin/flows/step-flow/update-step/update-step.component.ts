/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FlowService } from 'src/app/services/admin/flow/flow.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import {
  IListAction,
  IRoleAction,
  IStepModel,
  IStepRequest,
} from 'src/models/admin/flow.interface';
import { Roleslist } from 'src/models/roles-list.interface';

@Component({
  selector: 'app-update-step',
  templateUrl: './update-step.component.html',
  styleUrls: ['./update-step.component.scss'],
})
export class UpdateStepComponent implements OnInit {
  @Input() stepId?: number;
  @Input() workflowId?: number;
  @Output() succesCreate = new EventEmitter();

  hasSummary = false;
  isPrerrequirement = false;
  roleList: Roleslist[] = [];
  roleListNotExcluded: Roleslist[] = [];
  roleId: Roleslist | null = null;
  actionList: IListAction[] = [];
  roleAction: IRoleAction[] = [];
  currentStepData: IStepModel | null = null;
  alreadyRoleIds: number[] = [];
  newActions: IListAction[] = [];
  updateRoleActionRelationKey = false;

  constructor(
    private flowService: FlowService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private roleService: RolesService,
  ) {}

  ngOnInit(): void {
    this.alredyRolesAssigned();
  }

  defaultRole: Roleslist | null = null;

  formStep = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    order: new FormControl('', [Validators.maxLength(255)]),
    isPrerrequirement: new FormControl(false, [Validators.required]),
    hasSummary: new FormControl(false, [Validators.required]),
    role: new FormControl(this.defaultRole, [Validators.required]),
  });

  get formStepControls() {
    return this.formStep.controls;
  }

  alredyRolesAssigned() {
    this.flowService.getRolesRelatedWithStep(this.stepId || 0).subscribe((response) => {
      this.alreadyRoleIds = response.data;
      this.getRoles();
      this.getRolesWithoutExclution();
    });
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        const { data } = response;
        let dataRole = data;
        dataRole.forEach((role) => {
          if (this.alreadyRoleIds.includes(role.roleId)) {
            dataRole = dataRole.filter((alreadyRole) => alreadyRole.roleId !== role.roleId);
          }
        });
        this.roleList = dataRole;
      },
    });
  }

  getRolesWithoutExclution() {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        const { data } = response;
        this.roleListNotExcluded = data;
        this.getStepById();
      },
    });
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

  getStepById() {
    this.flowService.getStepById(this.workflowId || 0, this.stepId || 0).subscribe((response) => {
      response.data.roleActions.forEach((action) => {
        action.role =
          this.roleListNotExcluded.find((role) => role.roleId === action.roleId) || null;
        action.isSelected = true;
        action.expanded = false;
      });
      response.data.expanded = false;
      this.currentStepData = response.data;
      this.formStep.controls.name.setValue(this.currentStepData.name);
      this.formStep.controls.order.setValue(this.currentStepData.stepOrder.toString());
      this.isPrerrequirement = this.currentStepData.isPrerrequeriment;
      this.hasSummary = this.currentStepData.hasSummary;
      this.roleAction = this.currentStepData.roleActions;
      this.roleAction.forEach((action) => {
        action.actionIds.forEach((id) => (id.isSelected = true));
      });
    });
  }

  openCloseExpandedReqUpdate(item: IRoleAction) {
    item.expanded = item?.expanded === true ? false : true;
  }

  updateStep() {
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
        roleActions: [],
      };
      this.flowService.updateStep(this.workflowId || 0, this.stepId || 0, newStep).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Acción realizada con éxito',
          });
          this.succesCreate.emit();
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

  addActionToRole(item: IListAction) {
    if (item.isSelected) {
      this.newActions.push(item);
    } else {
      const index = this.newActions.indexOf(item);
      if (index !== -1) {
        this.newActions.splice(index, 1);
      }
    }
  }

  saveNewActionToRole() {
    const newAction: IRoleAction = {
      actionIds: this.newActions,
      roleId: this.roleId?.roleId || 0,
      expanded: false,
      isSelected: false,
      role: null,
    };
    this.flowService.addRoleActionToStep(this.stepId || 0, newAction).subscribe({
      next: () => {
        this.alredyRolesAssigned();
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

  deleteRoleActionFromSteo(item: IRoleAction) {
    this.flowService.deleteRolefromStep(this.stepId || 0, item.roleId).subscribe({
      next: () => {
        this.alredyRolesAssigned();
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
    this.flowService.updateRoleActionToStep(this.stepId || 0, item).subscribe({
      next: () => {
        this.updateRoleActionRelationKey = false;
        this.alredyRolesAssigned();
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
