import { Component, Input, OnInit } from '@angular/core';
import { FlowService } from 'src/app/services/admin/flow/flow.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { IRoleAction, IStepModel } from 'src/models/admin/flow.interface';
import { Roleslist } from 'src/models/roles-list.interface';

@Component({
  selector: 'app-view-step',
  templateUrl: './view-step.component.html',
  styleUrls: ['./view-step.component.scss'],
})
export class ViewStepComponent implements OnInit {
  @Input() stepId?: number;
  @Input() workflowId?: number;

  currentStepData: IStepModel | null = null;
  roleList: Roleslist[] = [];
  isSelected = true;

  constructor(
    private flowService: FlowService,
    private roleService: RolesService,
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getStepById() {
    this.flowService.getStepById(this.workflowId || 0, this.stepId || 0).subscribe((response) => {
      response.data.roleActions.forEach((action) => {
        action.role = this.roleList.find((role) => role.roleId === action.roleId) || null;
        action.isSelected = true;
        action.expanded = false;
      });
      response.data.expanded = false;
      this.currentStepData = response.data;
    });
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        const { data } = response;
        this.roleList = data;
        this.getStepById();
      },
    });
  }

  openCloseExpandedRelation(item: IRoleAction) {
    item.expanded = item?.expanded === true ? false : true;
  }

  openCloseExpandedStep() {
    if (this.currentStepData) {
      this.currentStepData.expanded = !this.currentStepData.expanded;
    }
  }
}
