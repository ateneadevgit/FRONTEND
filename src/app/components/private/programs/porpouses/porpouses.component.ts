import { ConfigService } from 'src/app/services/config/config.service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { Workflow } from 'src/enums/workflow.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { PreviewDocument } from 'src/models/preview-document.interface';
import { EvaluatePorpouse } from 'src/models/workflow.interface';
import { AlertService } from 'src/app/services/message/alert.service';

@Component({
  selector: 'app-porpouses',
  templateUrl: './porpouses.component.html',
  styleUrls: ['./porpouses.component.scss'],
})
export class PorpousesComponent implements OnInit {
  selectFaculty?: string;

  porpouses: any[] = [];
  faculties: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  levelFormation: CatalogsByIdResponse[] = [];
  statusPorpuse: CatalogsByIdResponse[] = [];
  role = 0;
  visibleEvaluateModal = false;
  evaluatePorpouse: any;

  typeFormation: CatalogsByIdResponse[] = [];
  typeRegister: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  send = false;
  workflowStatus = Workflow;
  visibleHistoryModal = false;

  fileName = '';
  fileExtension = '';
  allowedExtension = '';
  allowedFileSize = 0;
  documentBase64?: string;

  programIdHistory = 0;
  filterByFaculty = '';
  filterByCampus = '';

  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;

  previewDocument?: PreviewDocument;
  visiblePreviewDocument = false;

  constructor(
    private programsService: ProgramsService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private workflowService: WorkflowService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private configService: ConfigService,
    private alertService: AlertService,
  ) {
    this.programsService.reload.subscribe(() => {
      this.getPorpouses();
    });

    this.programsService.filterByFaculty.subscribe((filter) => {
      if (!filter) {
        this.filterByFaculty = '';
      } else {
        this.filterByFaculty = String(filter?.catalogItemId);
      }
      this.getPorpouses();
    });

    this.programsService.filterByCampus.subscribe((filter) => {
      if (!filter) {
        this.filterByCampus = '';
      } else {
        this.filterByCampus = String(filter?.catalogItemId);
      }
      this.getPorpouses();
    });
  }

  async ngOnInit() {
    await this.getRole();
    await this.loadConfigData();
    await this.loadFaculties();
    await this.loadCampus();
    await this.loadLevelFormation();
    await this.loadStatusPorpouse();
    await this.loadTypeFormation();
    await this.loadTypeRegister();
    await this.loadModality();
    setTimeout(() => {
      this.getPorpouses();
    }, 2500);
  }

  changeToReviewPorpouse(program: any) {
    if (this.role === 2 && program?.id_status === 3) {
      const payload: EvaluatePorpouse = {
        evaluation: Workflow.REVIEW,
      };
      this.workflow(program?.id_program, payload);
    }
  }

  changeStatus(status: string) {
    if (!this.documentBase64) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Documento es obligatorio',
        detail: 'Inténtalo nuevamente',
      });
      return;
    }
    const payload: EvaluatePorpouse = {
      evaluation: status,
      fileFeedback: {
        fileContent: this.utilsService.getBase64File(this.documentBase64),
        fileExtension: this.utilsService.getBase64FileExtension(this.documentBase64),
      },
    };
    this.workflow(this.evaluatePorpouse.idProgram, payload);
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  evaluate(porpouse: any) {
    this.evaluatePorpouse = undefined;
    if (porpouse.id_status === 7) return;
    if (this.role === 5 && porpouse.id_status === 4) return;
    if (
      (porpouse.id_status !== 7 &&
        this.role === 2 &&
        (porpouse.id_status === 3 || porpouse.id_status === 4)) ||
      (this.role === 5 && porpouse.id_status !== 3)
    ) {
      this.evaluatePorpouse = porpouse;

      this.programsService.getPropousalById(porpouse.id_program).subscribe({
        next: (response) => {
          this.evaluatePorpouse = response.data;
          this.evaluatePorpouse.setFaculty = this.faculties.find(
            (item) => item.catalogItemId === this.evaluatePorpouse?.idFaculty,
          );
          this.evaluatePorpouse.setLevelFormation = this.levelFormation.find(
            (item) => item.catalogItemId === this.evaluatePorpouse?.idLevelFormation,
          );
          this.evaluatePorpouse.setTypeRegistry = this.typeRegister.find(
            (item) => item.catalogItemId === this.evaluatePorpouse?.idRegistryType,
          );
          this.evaluatePorpouse.setTypeFormation = this.typeFormation.find(
            (item) => item.catalogItemId === this.evaluatePorpouse?.idTypeFormation,
          );

          this.evaluatePorpouse.setModality = this.setModality(this.evaluatePorpouse.modalityList);
          this.evaluatePorpouse.setCampus = this.setCampus(this.evaluatePorpouse.campusList);

          this.visibleEvaluateModal = true;
          this.changeToReviewPorpouse(porpouse);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error listando programa',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  loadStatusPorpouse() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.STATUS_PORPOUSE).subscribe((response) => {
      const { data } = response;
      this.statusPorpuse = data;
    });
  }

  getPorpouses() {
    this.porpouses = [];
    this.programsService
      .getAllPropousal(this.filterByFaculty, this.filterByCampus, 1, 10)
      .subscribe((response) => {
        const data = response.data.content;
        this.totalRecords = response.data.totalNumberItems;

        data.forEach((element: string) => {
          this.porpouses.push(JSON.parse(element));
        });

        this.porpouses.forEach((element) => {
          element.setFaculty = this.faculties.find(
            (item) => item.catalogItemId === element.id_faculty,
          )?.catalogItemName;
          element.setLevelFormation = this.levelFormation.find(
            (item) => item.catalogItemId === element.id_level_formation,
          )?.catalogItemName;
          element.setCampus = this.setCampus(element.campus_list);
          element.setStatus = this.statusPorpuse.find(
            (item) => item.catalogItemId === element.id_status,
          )?.catalogItemName;
        });
      });
  }

  setCampus(campus: string) {
    const splitCampus = campus.split(',');
    const searchCampus: string[] = [];
    splitCampus.forEach((element) => {
      const tmp = this.campus.filter((item) => item.catalogItemId === Number(element.trim()));
      searchCampus.push(tmp[0].catalogItemName);
    });
    return searchCampus;
  }

  setModality(campus: string) {
    const splitCampus = campus.split(',');
    const searchCampus: string[] = [];
    splitCampus.forEach((element) => {
      const tmp = this.modality.filter((item) => item.catalogItemId === Number(element.trim()));
      searchCampus.push(tmp[0].catalogItemName);
    });
    return searchCampus;
  }

  loadConfigData() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
    });
  }

  loadTypeFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TYPE_FORMATION).subscribe((response) => {
      const { data } = response;
      this.typeFormation = data;
    });
  }

  loadLevelFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVEL_FORMTATION).subscribe((response) => {
      const { data } = response;
      this.levelFormation = data;
    });
  }

  loadTypeRegister() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TYPE_REGISTER).subscribe((response) => {
      const { data } = response;
      this.typeRegister = data;
    });
  }
  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
  }

  loadModality() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY).subscribe((response) => {
      const { data } = response;
      this.modality = data;
    });
  }

  loadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (!this.allowedExtension.includes(fileExtension)) {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: `La extensión del archivo no está permitida. Actualmente solo se permiten archivos con las siguientes extensiones: ${this.allowedExtension}`,
        });
      } else {
        const fileSize = file.size;
        const maxSize = this.allowedFileSize * 1024 * 1024;
        if (fileSize > maxSize) {
          this.alertService.showErrorMessage({
            title: `Archivo supera el limite de ${this.allowedFileSize}MB`,
            message: 'Inténtalo nuevamente',
          });
        } else {
          this.fileName = file.name;
          this.fileExtension = fileExtension;
          this.convertToBase64(file);
        }
      }
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      const base64String = (<FileReader>event.target).result;
      if (base64String) {
        this.documentBase64 = String(base64String);
      }
    };
    reader.readAsDataURL(file);
  }

  downloadDocument(url: string) {
    window.open(url, 'blank');
  }

  workflow(program: any, payload: EvaluatePorpouse) {
    this.workflowService.evaluatePorpouse(program, payload).subscribe({
      next: () => {
        this.documentBase64 = undefined;
        if (payload.evaluation !== Workflow.REVIEW) {
          this.visibleEvaluateModal = false;
        }
        this.getPorpouses();
      },
      error: () => {
        /*  this.messageService.add({
          severity: 'error',
          summary: 'Error cambiando de estado',
          detail: 'Inténtalo nuevamente',
        }); */
      },
    });
  }

  decanoUpdateWorkflow(program: any) {
    if (!this.documentBase64) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Documento es obligatorio',
        detail: 'Inténtalo nuevamente',
      });
      return;
    }
    const payload: EvaluatePorpouse = {
      evaluation: Workflow.REVIEW,
      fileFeedback: {
        fileContent: this.utilsService.getBase64File(this.documentBase64),
        fileExtension: this.utilsService.getBase64FileExtension(this.documentBase64),
      },
    };

    this.programsService.updatePorpouse(program?.idProgram, payload).subscribe({
      next: () => {
        this.documentBase64 = undefined;
        if (payload.evaluation !== Workflow.REVIEW) {
          this.visibleEvaluateModal = false;
        }
        this.getPorpouses();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error cambiando de estado',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
    /* this.workflowService.evaluatePorpouse(program, payload).subscribe({
      next: () => {
        this.documentBase64 = undefined;
        if (payload.evaluation !== Workflow.REVIEW) {
          this.visibleEvlauteModal = false;
        }
        this.getPorpouses();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error cambiando de estado',
          detail: 'Inténtalo nuevamente',
        });
      },
    }); */
  }

  openHistory(history: number) {
    this.programIdHistory = history;
    this.visibleHistoryModal = true;
  }

  close() {
    this.visibleHistoryModal = false;
    this.programIdHistory = 0;
  }

  closeModalPreviewDocument($event: boolean) {
    this.visiblePreviewDocument = $event;
    this.previewDocument = undefined;
  }

  previewDocumentEvent(rowData: string) {
    this.previewDocument = {
      url: rowData,
      type: this.utilsService.getFileExtension(rowData),
    };
    this.visiblePreviewDocument = true;
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }
}
