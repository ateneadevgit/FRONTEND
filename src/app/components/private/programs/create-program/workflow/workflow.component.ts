import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { LoadDocumentsModule } from 'src/enums/load-documents-module.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { Workflow, WorkflowStatus } from 'src/enums/workflow.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { LoadDocumentsModal } from 'src/models/load-documents-modal.interface';
import { PreviewDocument } from 'src/models/preview-document.interface';
import { Column } from 'src/models/tables.interface';
import { Router } from '@angular/router';
import {
  Attachment,
  LoadDocumentsWorkflow,
  SendEvaluationWorkflow,
  SendStepFeedback,
  StepsWorkflow,
  SummaryWorkflow,
  TempleteWorkflow,
} from 'src/models/workflow.interface';
import dataType from 'src/assets/data/sumarytype.json';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {
  @Input() currentStep?: StepsWorkflow;
  @Input() workFlowId?: number;
  @Input() idProgram?: string;
  @Input() selectCondition?: CatalogsByIdResponse;
  @Input() isPaper?: boolean;

  @Output() openSyllabus = new EventEmitter<boolean>();

  workflowStatus = WorkflowStatus;
  files!: TreeNode[];
  cols!: Column[];
  sidebarComments = false;
  viewLoadDocuments?: LoadDocumentsModal;
  loadDocumentsModule = LoadDocumentsModule;
  countDocuments = 0;
  previewDocument?: PreviewDocument;
  visiblePreviewDocument = false;
  disabeldSummary = true;
  hasAnnexesvisible = false;
  annexesDocuments: TempleteWorkflow[] = [];
  status: CatalogsByIdResponse[] = [];
  statusWorkflow: CatalogsByIdResponse[] = [];
  role = 0;
  html = '';
  visibleApproveCampus = false;
  activeButtonApproveCampus = false;
  dataTypes = dataType;
  createdBy = '';
  currentAttachment: Attachment[] = [];
  attachToReview = 0;
  selectedAttach: Attachment | null = null;
  dissaprovedMessage = '';

  idSummary = 0;
  summaryEvaluate = false;
  constructor(
    private workflowService: WorkflowService,
    private utilService: UtilsService,
    private messageService: MessageService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    public permissionsService: PermissionsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.idProgram = this.activateRoute?.snapshot?.paramMap.get('id') ?? undefined;
    this.role = this.loginService.getRole();
    this.createdBy = this.loginService.getEmail();
  }

  async ngOnInit() {
    if (!this.currentStep) return;
    await this.loadStatus();
    this.permissions();
    // this.currentStep.attachment = this.currentStep.attachment.filter((item) => item.enabled);
    //this.currentAttachment = this.currentStep.attachment;
    this.setStatusName();
    this.catalogsService.getCatalogItemByIs(this.workflowStatus.ON_UPDATE).subscribe((response) => {
      this.dissaprovedMessage = response.data.catalogItemName;
    });
    this.cols = this.getCols();
    this.files = this.getFileSystemNodesData();
    this.annexesDocuments = this.currentStep.template;
    this.getSummary(false);
    setTimeout(() => {
      this.validatePermissionApproveCampus();
      //this.setStatusName();
    }, 1500);
  }

  permissions() {
    this.permissionsService.mappingPermissions(this.currentStep?.actions ?? []);
  }

  setStatusName() {
    this.currentStep?.attachment.forEach((item) => {
      item.setstatus =
        this.status.find((index) => index?.catalogItemId === item?.status)?.catalogItemName ?? null;
      item.setdcStatus =
        this.statusWorkflow.find((index) => index?.catalogItemId === item?.dcStatus)
          ?.catalogItemName ?? null;
      item.setvaStatus =
        this.statusWorkflow.find((index) => index?.catalogItemId === item?.vaStatus)
          ?.catalogItemName ?? null;
      item.setacStatus =
        this.statusWorkflow.find((index) => index?.catalogItemId === item?.acStatus)
          ?.catalogItemName ?? null;

      item.attachmentChild.forEach((child) => {
        child.setstatus =
          this.status.find((index) => index?.catalogItemId === item?.status)?.catalogItemName ??
          null;
        child.setdcStatus =
          this.statusWorkflow.find((index) => index?.catalogItemId === item?.dcStatus)
            ?.catalogItemName ?? null;
        child.setvaStatus =
          this.statusWorkflow.find((index) => index?.catalogItemId === item?.vaStatus)
            ?.catalogItemName ?? null;
        child.setacStatus =
          this.statusWorkflow.find((index) => index?.catalogItemId === item?.acStatus)
            ?.catalogItemName ?? null;
      });
    });
    this.currentAttachment = this.currentStep?.attachment || [];
    this.currentAttachment.sort((a, b) => b.attachId - a.attachId);
  }

  loadStatus() {
    this.catalogsService
      .getAllCatalogsByid(CatalogsEnum.DOCUMENTS_WORKFLOW)
      .subscribe((response) => {
        const { data } = response;
        this.status = data;
      });
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.STATUS_WORKFLOW).subscribe((response) => {
      const { data } = response;
      this.statusWorkflow = data;
    });
  }

  getCols() {
    return [
      { field: 'name', header: 'Nombre' },
      { field: 'createdDate', header: 'Fecha' },
      { field: 'version', header: 'Versión' },
      { field: 'setstatus', header: 'Estado' },
      { field: 'setdcStatus', header: 'Decano' },
      { field: 'setacStatus', header: 'Aseguramiento de Calidad' },
      { field: 'setvaStatus', header: 'Vicerrectoría Académica' },
    ];
  }

  loadDocuments(module: string, header = '') {
    this.viewLoadDocuments = {
      header: header,
      visible: true,
      module: module,
    };
  }

  returnData(data: LoadDocumentsModal) {
    let fatherId = null;
    if (data.module === LoadDocumentsModule.LOAD_EXHIBIT) {
      const currentDocument = this.getCurrentAttachment()?.attachId || null;
      if (!currentDocument) return;
      fatherId = currentDocument;
    }

    this.viewLoadDocuments = undefined;
    const version = `${
      data.module === LoadDocumentsModule.LOAD_EXHIBIT
        ? this.getCurrentAttachment()?.version.split('.')[0]
        : (this.currentStep?.attachment.length ?? 0) + 1
    }.${
      data.module === LoadDocumentsModule.LOAD_EXHIBIT
        ? (this.getCurrentAttachment()?.attachmentChild.length ?? 0) + 1
        : 0
    }`;

    if (
      data.file?.fileContent === '' ||
      data.file?.fileContent === null ||
      data.file?.fileContent === undefined
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'No se adjuntó ningun archivo',
        detail: 'Inténtalo nuevamente',
      });
    } else {
      const payload: LoadDocumentsWorkflow = {
        attachments: [
          {
            bytes: data.file?.fileContent ?? '',
            extension: data.file?.fileExtension ?? '',
            fatherId: fatherId,
            feedback: data?.html ?? '',
            name: data?.fileName ?? '',
            version: version.replace(' ', ''),
          },
        ],
        createdBy: null,
        roleId: null,
        stepId: this.currentStep?.stepId ?? 0,
        workflowId: this.workFlowId ?? 0,
      };

      this.workflowService.attachByStep(payload).subscribe({
        next: () => {
          this.workflowService.reload.emit(true);
        },
        error: () => {
          this.workflowService.reload.emit(true);
        },
      });
    }
  }

  closeModal() {
    this.viewLoadDocuments = undefined;
  }

  getFileSystemNodesData() {
    const currentStep = this.currentStep?.attachment;
    const column: TreeNode[] = [];

    currentStep?.forEach((element) => {
      if (element.enabled || (!element.enabled && element.isOriginal)) {
        if (!element.isOriginal) {
          this.countDocuments++;
        }

        const children: TreeNode[] = [];
        if (element.attachmentChild.length > 0) {
          element.attachmentChild.forEach((element) => {
            if (element.enabled) {
              const child = {
                data: element,
              };
              children.push(child);
            }
          });
        }
        const node: TreeNode = {
          data: element,
          children: children,
        };
        column.push(node);
      }
    });
    return column;
  }

  deleteAttachment(rowData: Attachment) {
    this.workflowService.deleteDocument(rowData.attachId).subscribe({
      next: () => {
        this.workflowService.reload.emit(true);
      },
      error: () => {
        console.log('error eliminando');
      },
    });
  }

  closeModalPreviewDocument($event: boolean) {
    this.visiblePreviewDocument = $event;
    this.previewDocument = undefined;
  }

  previewDocumentEvent(rowData: Attachment) {
    this.previewDocument = {
      url: rowData.urlFile,
      type: this.utilService.getFileExtension(rowData.urlFile),
    };
    this.visiblePreviewDocument = true;
  }

  downloadDocument(rowData: Attachment) {
    if (!rowData.urlFile) {
      this.messageService.add({
        severity: 'warn',
        summary: '',
        detail: 'No hay documento adjunto',
      });
      return;
    }
    window.open(rowData.urlFile, 'blank');
  }

  sendToReview() {
    if (this.validatePermissionToSentToReview()) {
      const payload: SendEvaluationWorkflow = {
        attachment: [this.attachToReview],
        createdBy: null,
        roleId: null,
        stepId: this.currentStep?.stepId ?? 0,
        workflowId: this.workFlowId ?? 0,
      };
      this.deleteNotSelectedToReview(this.attachToReview);
      this.workflowService.sendToEvaluation(payload).subscribe({
        next: () => {
          this.workflowService.reload.emit(true);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Envío a revisión',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  validatePermissionToSentToReview() {
    let canContinue = false;
    if (
      this.permissionsService.permissions.canLoadFiles &&
      !this.permissionsService.permissions.canEvaluate
    ) {
      this.attachToReview = this.getCurrentAttachment()?.attachId || 0;
      canContinue = true;
    } else if (
      this.permissionsService.permissions.canLoadFiles &&
      this.permissionsService.permissions.canEvaluate
    ) {
      if (this.selectedAttach === null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Envío a revisión',
          detail: 'Debes seleccionar un documento para enviar a revision',
        });
      } else if (
        this.selectedAttach.createdBy !== this.createdBy &&
        !this.currentStep?.hasEvaluated
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Envío a revisión',
          detail: 'Debes evaluar el documento antes de enviarlo a revisión',
        });
      } else if (this.selectedAttach.createdBy === this.createdBy && this.hasOtherFiles()) {
        this.messageService.add({
          severity: 'error',
          summary: 'Envío a revisión',
          detail: 'Debes evaluar el documento antes de enviarlo a revisión',
        });
      } else if (this.hasOnlyOwnFiles()) {
        this.attachToReview = this.selectedAttach.attachId;
        canContinue = true;
      } /*else if (
        this.selectedAttach.createdBy === this.createdBy &&
        !this.currentStep?.hasEvaluated
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Envío a revisión',
          detail: 'Debes evaluar el documento antes de enviar el paso a revisión',
        });
      } */ else {
        this.attachToReview = this.selectedAttach.attachId;
        canContinue = true;
      }
    }
    return canContinue;
  }

  createHtml($event: string) {
    this.html = $event;
  }

  getSummary(review: boolean) {
    this.workflowService
      .getSummary(this.currentStep?.stepId ?? 0, Number(this.workFlowId))
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.idSummary = data.summaryId;
          this.html = data?.summary;
          if (review) {
            this.sendSummarytoReview();
          } else {
            this.getSendSummarytoEvaluate(); // Consulta si el resumen fue enviado a revision
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error cargando resumen',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
  }
  getSendSummarytoEvaluate() {
    if (this.idSummary && this.idSummary !== 0) {
      this.workflowService.getSendSummarytoEvaluate(this.idSummary).subscribe({
        next: (response) => {
          const { data } = response;
          this.summaryEvaluate = data;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error cargando resumen',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  sendSummary(review: boolean) {
    if (!this.html || this.html.length < 5) {
      this.messageService.add({
        severity: 'error',
        summary: 'Resumen debe tener mínimo 5 caracteres',
        detail: 'Inténtalo nuevamente',
      });
      return;
    }
    const payload: SummaryWorkflow = {
      createdBy: null,
      roleId: null,
      stepId: this.currentStep?.stepId ?? 0,
      summary: this.html,
      workflowId: this.workFlowId ?? 0,
    };

    this.workflowService.summary(payload).subscribe({
      next: () => {
        if (review) {
          this.getSummary(true);
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Resumen guardado',
            detail: '',
          });
          this.workflowService.reload.emit(true);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en resumen',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }

  sendSummarytoReview() {
    if (this.html.length < 5) return;
    if (this.idSummary && this.idSummary !== 0) {
      this.workflowService.sendSummaryToReview(this.idSummary).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Resumen guardado y enviado a revisión',
            detail: '',
          });
          this.workflowService.reload.emit(true);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error en resumen',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  openDialogApproveCampus() {
    if (this.permissionsService.permissions.canApproveCampus) {
      this.visibleApproveCampus = true;
    } else {
      this.sendDenyApproveCampus(true, false);
    }
  }

  sendDenyApproveCampus(active: boolean, summary: boolean) {
    if (this.workFlowId && this.currentStep) {
      const payload: SendStepFeedback = {
        campusId: null,
        createdBy: null,
        feedback: null,
        isSummary: summary,
        feedbackStatus: active ? Workflow.APPROVED : Workflow.COMPLETNESS,
        roleId: null,
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
              detail: active ? 'Aprobación realizada correctamente' : 'En actualización',
            });
            this.workflowService.reload.emit(true);
          }
        },
        error: () => {
          this.workflowService.reload.emit(true);
          this.messageService.add({
            severity: 'error',
            summary: 'Error aprobando el campus',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  closeDialogApproveCampus() {
    this.visibleApproveCampus = false;
    this.workflowService.reload.emit(true);
  }

  validatePermissionApproveCampus() {
    if (this.currentStep) {
      if (
        (this.currentStep.status === WorkflowStatus.ON_REVIEW && // En revision
          !this.currentStep.hasEvaluated) ||
        (this.currentStep.status === WorkflowStatus.ON_PROJECTION &&
          !this.currentStep.hasEvaluated &&
          !this.currentStep.isSent &&
          this.currentStep.attachment.filter((item) => item.enabled === true).length > 0)
      ) {
        // Documentos activos
        this.activeButtonApproveCampus = true;
      } else {
        this.activeButtonApproveCampus = false;
      }
    }
  }

  sendOpenSyllabus() {
    this.router.navigate([
      `${RoutesApp.PROGRAMS}/${RoutesApp.CREATE_PROGRAM}/${this.idProgram}/${RoutesApp.SYLLABUS}/step/${this.currentStep?.stepId}/workflow/${this.workFlowId}`,
    ]);
    // this.openSyllabus.emit(true);
  }
  navigateCurriculumSumary(typeId: number) {
    this.router.navigate([
      `${RoutesApp.PROGRAMS}/${RoutesApp.CREATE_PROGRAM}/${this.idProgram}/${RoutesApp.RAE}/step/${this.currentStep?.stepId}/${'workflow'}/${this.workFlowId}/${'type'}/${typeId}/${'condition'}/${this.selectCondition?.catalogItemName}`,
    ]);
  }

  annexesShowDialog() {
    if (this.annexesDocuments?.length) {
      this.hasAnnexesvisible = true;
    } else {
      this.showToast('error', '', 'No cuenta con anexos mínimos requeridos');
    }
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  hasCreatedDocument(): boolean {
    let hasCreated = false;
    this.currentAttachment.forEach((attach) => {
      if (attach.createdBy === this.createdBy && !attach.isDeclined && !attach.isOriginal)
        hasCreated = true;
    });
    return hasCreated;
  }

  hasAllowedFiles() {
    let hasNotAllowed = 0;
    this.currentAttachment.forEach((attach) => {
      if (attach.isDeclined || attach.isOriginal) hasNotAllowed += 1;
    });
    return this.currentAttachment?.length > hasNotAllowed;
  }

  getCurrentAttachment(): Attachment | null {
    let currentAttach: Attachment | null = null;
    this.currentAttachment.forEach((attach) => {
      if (attach.createdBy === this.createdBy && !attach.isDeclined) currentAttach = attach;
    });
    return currentAttach;
  }

  canEvaluatedFiles(): boolean {
    let disaprovedFiles = 0;
    this.currentAttachment.forEach((attach) => {
      if (attach.isDeclined || attach.isOriginal) disaprovedFiles += 1;
    });
    return this.currentAttachment.length > disaprovedFiles;
  }

  hasOnlyOwnFiles(): boolean {
    let disaprovedFiles = 0;
    this.currentAttachment.forEach((attach) => {
      if (attach.createdBy === this.createdBy && attach.isDeclined) disaprovedFiles += 1;
    });
    return this.currentAttachment.length > disaprovedFiles;
  }

  hasOtherFiles(): boolean {
    let othersFiles = 0;
    this.currentAttachment.forEach((attach) => {
      if (attach.createdBy !== this.createdBy && !attach.isDeclined && !attach.isOriginal)
        othersFiles += 1;
    });
    return othersFiles > 0;
  }

  deleteNotSelectedToReview(attachToReview: number) {
    this.currentAttachment.forEach((attach) => {
      if (attach.attachId !== attachToReview && !attach.isDeclined && !attach.isOriginal)
        this.deleteAttachment(attach);
    });
  }

  canUploadAttach(): boolean {
    let ownValidFiles = 0;
    this.currentAttachment.forEach((attach) => {
      if (attach.createdBy === this.createdBy && !attach.isDeclined && !attach.isOriginal)
        ownValidFiles += 1;
    });
    return ownValidFiles > 0;
  }
}
