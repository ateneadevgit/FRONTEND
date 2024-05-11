import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Workflow } from 'src/enums/workflow.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { SendStepFeedback, StepsWorkflow } from 'src/models/workflow.interface';

@Component({
  selector: 'app-approve-campus',
  templateUrl: './approve-campus.component.html',
  styleUrls: ['./approve-campus.component.scss'],
})
export class ApproveCampusComponent {
  idProgram;
  @Input() workFlowId?: number;
  @Input() currentStep?: StepsWorkflow;
  @Output() closeDialog = new EventEmitter<boolean>();
  campus: CatalogsByIdResponse[] = [];
  selectedCampus: number[] = [];
  campusProgram: CatalogsByIdResponse[] = [];
  checked = false;
  constructor(
    private workflowService: WorkflowService,
    private activateRoute: ActivatedRoute,
    private catalogsService: CatalogsService,
    private messageService: MessageService,
  ) {
    this.idProgram = this.activateRoute?.snapshot?.paramMap.get('id') ?? undefined;
    this.loadCampus();
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
      this.getCampusByProgram();
    });
  }

  getCampusByProgram() {
    if (!this.idProgram) return;
    this.workflowService.getCampus(this.idProgram).subscribe((response) => {
      const { data } = response;
      data.forEach((item) => {
        const campusData = this.campus.find((campus) => campus.catalogItemId === item);
        if (campusData) this.campusProgram.push(campusData);
      });
    });
  }

  sendApproveCampus() {
    if (this.workFlowId && this.currentStep) {
      const payload: SendStepFeedback = {
        campusId: this.selectedCampus,
        createdBy: null,
        feedback: null,
        feedbackStatus: Workflow.APPROVED,
        roleId: null,
        isSummary: false,
        stepId: this.currentStep.stepId,
        workflowId: this.workFlowId,
      };

      this.workflowService.stepFeedback(payload).subscribe({
        next: (response) => {
          const { data } = response;
          if (data == 'OK') {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Aprobación de campus realizada correctamente',
            });
            this.setCloseDialog();
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error aprobando el campus',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  setCloseDialog() {
    this.selectedCampus = [];
    this.closeDialog.emit(true);
  }
}
