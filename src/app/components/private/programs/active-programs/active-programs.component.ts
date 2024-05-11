/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { RenovationStatusProgram, UpgradeStatusProgram } from 'src/enums/catalogs-items.enums';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { SettingEnum } from 'src/enums/setting.enum';

import { Workflow } from 'src/enums/workflow.enum';
import { environment } from 'src/environments/environment';
import { CatalogsByIdResponse, CatalogsResponse } from 'src/models/catalogs.interface';
import { DirectorsRole } from 'src/models/sinu.interface';
import { EvaluatePorpouse, IUserAssigned } from 'src/models/workflow.interface';

@Component({
  selector: 'app-active-programs',
  templateUrl: './active-programs.component.html',
  styleUrls: ['./active-programs.component.scss'],
})
export class ActiveProgramsComponent implements OnInit {
  routesApp = RoutesApp;
  catalogs: CatalogsResponse[] = [];
  rowsFirstLevel: any = [];
  rowsSecondLevel: any = [];
  columns: string[] = [];
  rows: any = [];
  levelFormation: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  statusPorpuse: CatalogsByIdResponse[] = [];
  faculties: CatalogsByIdResponse[] = [];
  renovationStatus: CatalogsByIdResponse[] = [];
  upgradeStatus: CatalogsByIdResponse[] = [];
  checked = true;
  role = 0;
  filterByFaculty = '';
  filterByCampus = '';
  pagination?: any;
  visibleDeclineProgram = false;
  detailDeclineProgram?: any;
  documentBase64?: string;
  evaluatePorpouse: any;
  activeEditProgramParams = false;
  idProgram = 0;
  typeFormation: CatalogsByIdResponse[] = [];
  typeRegister: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  RoleEnum = Role;
  allowedExtension = '';
  allowedFileSize = 0;
  listQuality: DirectorsRole[] = [];
  listAssignedUser: IUserAssigned[] = [];
  filteredListQuality: DirectorsRole[] = [];
  visibleAssignAC = false;
  searchQa = '';
  fileName = '';
  fileExtension = '';

  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;

  RenovationStatusEnum = RenovationStatusProgram;
  UpgradeStatusEnum = UpgradeStatusProgram;

  listColor = [
    { value: 'MEN_RED', start: 0, end: 0 },
    { value: 'MEN_GREEN', start: 0, end: 0 },
    { value: 'MEN_YELLOW', start: 0, end: 0 },
  ];

  constructor(
    private programsService: ProgramsService,
    private tableService: TableService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private configService: ConfigService,
    private alertService: AlertService,
    private router: Router,
    private sinuService: SinuService,
    private workflowService: WorkflowService,
  ) {
    this.programsService.filterByFaculty.subscribe((filter) => {
      if (!filter) {
        this.filterByFaculty = '';
      } else {
        this.filterByFaculty = String(filter?.catalogItemId);
      }
      this.loadPrograms();
    });

    this.programsService.filterByCampus.subscribe((filter) => {
      if (!filter) {
        this.filterByCampus = '';
      } else {
        this.filterByCampus = String(filter?.catalogItemId);
      }
      this.loadPrograms();
    });
    this.loadSettingColor();
  }

  loadSettingColor() {
    this.listColor.map((obj) => {
      this.configService.getSettingById(obj.value).subscribe((response) => {
        const part = response.data.split('-');
        obj.start = Number(part[0]);
        obj.end = Number(part[1]);
      });
    });
  }

  async ngOnInit() {
    this.getRole();
    await this.loadCampus();
    await this.loadLevelFormation();
    await this.loadStatusPorpouse();
    await this.loadFaculties();
    this.loadUpdateStatus();
    this.loadRenovationStatus();
    await this.loadTypeFormation();
    await this.loadTypeRegister();
    await this.loadModality();
    this.getAllowedExtension();
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

  loadModality() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY).subscribe((response) => {
      const { data } = response;
      this.modality = data;
    });
  }

  loadTypeFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TYPE_FORMATION).subscribe((response) => {
      const { data } = response;
      this.typeFormation = data;
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
        Workflow.ACTIVE,
        this.filterByFaculty,
        this.filterByCampus,
        this.pageNumber,
        this.pageSize,
      )
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.pagination = data;
          this.totalRecords = data.totalNumberItems;

          data.content.forEach((element: any) => {
            this.rows.push(JSON.parse(element));
          });

          this.rows.forEach((element: any) => {
            element.checked_status = true;
            element.upgrade_status_name = this.utilsService.getNameCatalogItem(
              this.upgradeStatus,
              element?.upgrade_status,
            );
            element.renovation_status_name = this.utilsService.getNameCatalogItem(
              this.renovationStatus,
              element?.renovation_status,
            );
            const fecha = new Date(element?.men_end_date);

            // Obtener los componentes de fecha (día, mes, año)
            const dia = fecha.getDate().toString().padStart(2, '0');
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // ¡Ojo! Los meses en JavaScript son indexados desde 0
            const año = fecha.getFullYear();

            // Formatear la fecha en el formato dd/mm/yyyy
            element.men_end_date_format = `${dia}/${mes}/${año}`;
          });
          this.rows.forEach((element: any) => {
            element.setFaculty = this.faculties.find(
              (item) => item.catalogItemId === element?.id_faculty,
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

  onRowExpand(event: any): void {
    const find = this.rows.find((obj: any) => obj.id_program === event.id_program);
    if (find)
      if (!find.subdata) {
        this.programsService.getTraceability(event.id_program).subscribe({
          next: (response) => {
            find.subdata = response.data;
          },
        });
      }
  }

  getColor(value: any, isdate: boolean): string {
    if (!value) {
      return 'gray'; // Color por defecto si no hay fecha
    }
    const hoy = new Date();
    let fecha = new Date();
    if (isdate) {
      fecha = new Date(value);
    } else {
      const partes = value.split('/');
      // Verificar si hay tres partes y son números
      if (partes.length === 3 && partes.every((part: string) => !isNaN(Number(part)))) {
        // Crear un objeto de fecha en formato yyyy/mm/dd
        const fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        fecha = new Date(fechaFormateada);
      }
    }

    const diferenciaAnio = this.calcularDiferenciaAnios(hoy, fecha);

    if (diferenciaAnio <= this.listColor.find((obj) => obj.value === 'MEN_RED')!.end) {
      // Calcula el color en dias
      return 'red';
    } else if (diferenciaAnio <= this.listColor.find((obj) => obj.value === 'MEN_YELLOW')!.end) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  private calcularDiferenciaAnios(fecha1: Date, fecha2: Date): number {
    const year1 = fecha1.getFullYear();
    const year2 = fecha2.getFullYear();
    return Math.abs(year1 - year2);
  }

  loadRenovationStatus() {
    this.catalogsService
      .getAllCatalogsByid(CatalogsEnum.RENOVATION_STATUS_PROGRAM)
      .subscribe((response) => {
        const { data } = response;
        this.renovationStatus = data;
      });
  }

  loadUpdateStatus() {
    this.catalogsService
      .getAllCatalogsByid(CatalogsEnum.UPGRADE_STATUS_PROGRAM)
      .subscribe((response) => {
        const { data } = response;
        this.upgradeStatus = data;
      });
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
    });
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
  }

  loadProgram() {
    this.programsService
      .getProgramByStatus(Workflow.ACTIVE, '', '', this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          const { data } = response;
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

  setModality(campus: string) {
    const splitCampus = campus.includes(',') ? campus.split(',') : [campus];
    const searchCampus: string[] = [];
    splitCampus.forEach((element) => {
      const tmp = this.modality.filter((item) => item?.catalogItemId === Number(element.trim()));
      searchCampus.push(tmp[0].catalogItemName);
    });
    return searchCampus;
  }

  disabledProgram(program: any) {
    program.checked_status = true;
    this.detailDeclineProgram = undefined;
    this.detailDeclineProgram = program;
    this.confirmationService.confirm({
      header: ' ',
      message: '¿Está seguro de desactivar el programa académico?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'workflow-status in-update',
      rejectButtonStyleClass: 'workflow-status in-projection',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      rejectIcon: '',
      acceptIcon: '',
      accept: () => {
        this.getProgramById(program);
        program.checked_status = false;
      },
    });
  }

  getProgramById(program: any) {
    this.programsService.getPropousalById(program.id_program).subscribe({
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

  cancelDecline() {
    this.rows.forEach((element: any) => {
      if (
        element?.id_program === this.detailDeclineProgram.id_program &&
        element?.checked_status === false
      ) {
        element.checked_status = true;
      }
    });
    this.detailDeclineProgram = undefined;
    this.visibleDeclineProgram = false;
  }

  decline() {
    if (!this.documentBase64) {
      this.messageService.add({
        severity: 'error',
        summary: 'Acta es obligatorio',
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
      evaluation: 'disabled',
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
        const maxSize = environment.max_file;
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

  editProgram(idProgram: number, status: number) {
    if (status === this.RenovationStatusEnum.RENEWAL_STATUS)
      this.router.navigate([`${RoutesApp.PROGRAMS}/${RoutesApp.CREATE_PROGRAM}/${idProgram}`]);
  }

  activeEditProgram(idProgram: number, status: number) {
    if (this.role === Role.VICERRECTOR || this.role === Role.DECANO) {
      if (idProgram && status)
        if (status === this.UpgradeStatusEnum.UPDGRADE_STATUS) {
          this.router.navigate([`${RoutesApp.PROGRAMS}/${RoutesApp.EDIT_PROGRAM}/${idProgram}`]);
        } else {
          this.idProgram = idProgram;
          this.activeEditProgramParams = true;
          //  this.router.navigate([`${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.CURRICULAR_MONITORING}`]);
        }
    }
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
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

  filterTable() {
    this.filteredListQuality = this.listQuality.filter((director: any) => {
      return director.userEmail.toLowerCase().includes(this.searchQa.toLowerCase());
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
}
