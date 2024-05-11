/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { SinuService } from 'src/app/services/sinu/sinu.service';
import { TableService } from 'src/app/services/table/table.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { Workflow } from 'src/enums/workflow.enum';
import { CatalogsByIdResponse, CatalogsResponse } from 'src/models/catalogs.interface';
import { DirectorsRole } from 'src/models/sinu.interface';
import { EvaluatePorpouse, IUserAssigned } from 'src/models/workflow.interface';

@Component({
  selector: 'app-construction-programs',
  templateUrl: './construction-programs.component.html',
  styleUrls: ['./construction-programs.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ConstructionProgramsComponent implements OnInit {
  routesApp = RoutesApp;
  catalogs: CatalogsResponse[] = [];
  rowsFirstLevel: any = [];
  rowsSecondLevel: any = [];
  columns: string[] = [];
  rows: any = [];
  faculties: CatalogsByIdResponse[] = [];
  levelFormation: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  statusPorpuse: CatalogsByIdResponse[] = [];
  checked = true;
  role = 0;
  filterByFaculty = '';
  filterByCampus = '';
  typeRegister: CatalogsByIdResponse[] = [];
  visibleDeclineProgram = false;
  visibleAssignAC = false;
  detailDeclineProgram?: any;
  documentBase64?: string;
  evaluatePorpouse: any;
  RoleEnum = Role;
  listQuality: DirectorsRole[] = [];
  listAssignedUser: IUserAssigned[] = [];
  filteredListQuality: DirectorsRole[] = [];
  search = '';
  searchQa = '';
  idProgram = 0;
  allowedExtension = '';
  allowedFileSize = 0;
  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;
  fileName = '';
  fileExtension = '';

  typeFormation: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];

  constructor(
    private programsService: ProgramsService,
    private tableService: TableService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private workflowService: WorkflowService,
    private sinuService: SinuService,
    private alertService: AlertService,
    private configService: ConfigService,
  ) {
    this.programsService.filterByFaculty.subscribe((filter) => {
      if (!filter) {
        this.filterByFaculty = '';
      } else {
        this.filterByFaculty = String(filter?.catalogItemId);
      }
      this.loadPrograms();
    });
  }

  async ngOnInit() {
    this.getRole();
    await this.loadCampus();
    await this.loadLevelFormation();
    await this.loadStatusPorpouse();
    await this.loadFaculties();
    await this.loadTypeRegister();
    this.getAllowedExtension();
    await this.loadTypeFormation();
    await this.loadTypeRegister();
    await this.loadModality();
    setTimeout(() => {
      this.loadPrograms();
    }, 2000);
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  loadTypeFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TYPE_FORMATION).subscribe((response) => {
      const { data } = response;
      this.typeFormation = data;
    });
  }

  loadModality() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY).subscribe((response) => {
      const { data } = response;
      this.modality = data;
    });
  }

  loadTypeRegister() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TYPE_REGISTER).subscribe((response) => {
      const { data } = response;
      this.typeRegister = data;
    });
  }

  loadPrograms() {
    this.rows = [];
    this.programsService
      .getProgramByStatus(
        Workflow.REVIEW,
        this.filterByFaculty,
        this.filterByCampus,
        this.pageNumber,
        this.pageSize,
      )
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.totalRecords = data.totalNumberItems;
          data.content.forEach((element: any) => {
            this.rows.push(JSON.parse(element));
          });

          this.rows.forEach((element: any) => {
            element.setFaculty = this.faculties.find(
              (item) => item.catalogItemId === element?.id_faculty,
            );
            element.setRegistryType = this.typeRegister.find(
              (item) => item?.catalogItemId === element?.id_registry_type,
            );
            element.setCampus = this.setCampus(element?.campus_list);
            element.setLevelFormation = this.levelFormation.find(
              (item) => item.catalogItemId === element?.id_level_formation,
            );
            element.setStatus = this.statusPorpuse.find(
              (item) => item.catalogItemId === element.id_status,
            )?.catalogItemName;
          });
        },
      });
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
    });
  }

  loadProgram() {
    this.programsService
      .getProgramByStatus(Workflow.ACTIVE, '', '', this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.totalRecords = data.totalNumberItems;
          data.content.forEach((element: any) => {
            this.rowsFirstLevel.push(JSON.parse(element));
          });
          for (const key in this.rowsFirstLevel[0]) {
            this.columns.push(this.tableService.nameColumn(key));
          }

          this.rowsFirstLevel.forEach((element: any) => {
            const temp: any = [];
            for (const key in element) {
              temp.push(element[key]);
            }
            this.rowsSecondLevel.push(temp);
          });
        },
      });
  }

  setCampus(campus: string) {
    if (!campus) return;
    const splitCampus = campus.split(',');
    const searchCampus: string[] = [];
    splitCampus.forEach((element) => {
      const tmp = this.campus.filter((item) => item.catalogItemId === Number(element.trim()));
      searchCampus.push(tmp[0].catalogItemName);
    });
    return searchCampus;
  }

  loadLevelFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVEL_FORMTATION).subscribe((response) => {
      const { data } = response;
      this.levelFormation = data;
    });
  }

  loadStatusPorpouse() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.STATUS_PORPOUSE).subscribe((response) => {
      const { data } = response;
      this.statusPorpuse = data;
    });
  }

  editProgram(idProgram: number) {
    this.router.navigate([`${RoutesApp.PROGRAMS}/${RoutesApp.CREATE_PROGRAM}/${idProgram}`]);
  }

  cancelDecline() {
    this.detailDeclineProgram = undefined;
    this.visibleDeclineProgram = false;
  }

  delcineProgram(program: any) {
    this.detailDeclineProgram = undefined;
    this.detailDeclineProgram = program;
    this.confirmationService.confirm({
      header: ' ',
      message: '¿Está seguro de declinar el programa académico?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'workflow-status in-update',
      rejectButtonStyleClass: 'workflow-status in-projection',
      acceptLabel: 'Declinar',
      rejectLabel: 'Cancelar',
      rejectIcon: '',
      acceptIcon: '',
      accept: () => {
        //
        this.getProgramById(program);
      },
    });
  }

  getProgramById(program: any) {
    console.log('Im here');

    this.programsService.getPropousalById(program.id_program).subscribe({
      next: (response) => {
        console.log('Evalua proposal ---> ');
        console.log(response.data);

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
        console.log(this.typeRegister);

        this.evaluatePorpouse.setTypeFormation = this.typeFormation.find(
          (item) => item.catalogItemId === this.evaluatePorpouse?.idTypeFormation,
        );

        this.evaluatePorpouse.setModality = this.setModality(this.evaluatePorpouse?.modalityList);
        this.evaluatePorpouse.setCampus = this.setCampus(this.evaluatePorpouse?.campusList);
        this.visibleDeclineProgram = true;
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

  setModality(campus: string) {
    const splitCampus = campus.split(',');
    const searchCampus: string[] = [];
    splitCampus.forEach((element) => {
      const tmp = this.modality.filter((item) => item?.catalogItemId === Number(element.trim()));
      searchCampus.push(tmp[0].catalogItemName);
    });
    return searchCampus;
  }

  decline() {
    if (!this.documentBase64) {
      this.messageService.add({
        severity: 'error',
        summary: 'Documento es obligatorio',
        detail: 'Inténtalo nuevamente',
      });
      return;
    }
    const payload: EvaluatePorpouse = {
      createdBy: null,
      fileFeedback: {
        fileContent: this.utilsService.getBase64File(this.documentBase64 ?? ''),
        fileExtension: this.fileExtension,
      },
      roleId: null,
      evaluation: 'declined',
    };
    this.programsService
      .declineAndDisabled(this.detailDeclineProgram.id_program, payload)
      .subscribe({
        next: () => {
          this.loadPrograms();
          this.visibleDeclineProgram = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Declinando el programa',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
  }

  loadFile(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop();
      this.fileExtension = fileExtension;
      if (!this.allowedExtension.includes(fileExtension)) {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: `La extensión del archivo no está permitida. Actualmente solo se permiten archivos con las siguientes extensiones: ${this.allowedExtension}`,
        });
      } else {
        const fileSize = file.size;
        const maxSize = this.allowedFileSize * 1024 * 1024;
        this.fileName = file.name;
        if (fileSize > maxSize) {
          this.messageService.add({
            severity: 'error',
            summary: `Archivo supera el limite de ${this.allowedFileSize}MB`,
            detail: 'Inténtalo nuevamente',
          });
          event.target.value = '';
        } else {
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

  onAssignQalityClick(idProgram: number) {
    this.sinuService.getAllDirectors(this.RoleEnum.ASEGURAMIENTO_DE_CALIDAD).subscribe({
      next: (response) => {
        this.listQuality = response.data;
        this.idProgram = idProgram;
        this.getAssignedUser(idProgram);
        this.visibleAssignAC = true;
      },
    });
  }

  getAssignedUser(idProgram: number) {
    this.workflowService
      .getUserRelatedWithProgram(idProgram, this.RoleEnum.ASEGURAMIENTO_DE_CALIDAD)
      .subscribe({
        next: (response) => {
          this.listAssignedUser = response.data;
        },
      });
  }

  relateUserToWorkflow(quality: DirectorsRole) {
    this.workflowService.relateUserToWorkflow(Number(this.idProgram), quality).subscribe({
      next: () => {
        this.closeAssignQalityLevel();
        this.alertService.showSuccessMessage({
          message: 'Aseguramiento de calidad asignado correctamente',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Asignando aseguramiento de calidad',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }

  closeAssignQalityLevel() {
    this.visibleAssignAC = false;
    this.idProgram = 0;
    this.searchQa = '';
    this.filteredListQuality = [];
  }

  filterTable() {
    this.filteredListQuality = this.listQuality.filter((director: any) => {
      return director.userEmail.toLowerCase().includes(this.searchQa.toLowerCase());
    });
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }
}
