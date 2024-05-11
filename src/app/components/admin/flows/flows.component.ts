import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlowService } from 'src/app/services/admin/flow/flow.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { IFlow, IFlowRequest } from 'src/models/admin/flow.interface';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss'],
})
export class FlowsComponent implements OnInit {
  workflowList: IFlow[] = [];
  updateFlowKey = false;
  currentFlow = 0;

  constructor(
    private flowService: FlowService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private routeService: Router,
  ) {}

  formFlow = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  get formControls() {
    return this.formFlow.controls;
  }

  ngOnInit(): void {
    this.getWorkflows();
  }

  getWorkflows() {
    this.flowService.getWorkflows().subscribe((response) => {
      this.workflowList = response.data;
    });
  }

  openCreateDialod(item: IFlow) {
    this.formFlow.controls.name.setValue(item.name);
    this.formFlow.controls.description.setValue(item.description);
    this.currentFlow = item.workflowId;
    this.updateFlowKey = true;
  }

  updateFlow() {
    if (this.formFlow.get('name')?.invalid || this.formFlow.get('description')?.invalid) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newFlow: IFlowRequest = {
        name: this.formControls['name'].value || '',
        description: this.formControls['description'].value || null,
      };
      this.flowService.updateWorkflow(this.currentFlow, newFlow).subscribe({
        next: () => {
          this.getWorkflows();
          this.updateFlowKey = false;
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

  redirectStep(item: IFlow) {
    localStorage.setItem('flow', JSON.stringify(item));
    this.routeService.navigate([`${RoutesApp.FLOWS}/${RoutesApp.STEP_FLOW}/${item.workflowId}`]);
  }
}
