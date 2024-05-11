/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { Workflow } from 'src/enums/workflow.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';

@Component({
  selector: 'app-technical-tecnological',
  templateUrl: './technical-tecnological.component.html',
  styleUrls: ['./technical-tecnological.component.scss'],
})
export class TechnicalTecnologicalComponent implements OnInit {
  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  programHistorical?: ProgramHistorical[];
  routerApp = RoutesApp;

  porpouses: any[] = [];
  porpousesAux: any[] = [];
  selectFaculty?: string;
  selectCampus?: string;
  faculties: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  levelFormation: CatalogsByIdResponse[] = [];
  statusPorpuse: CatalogsByIdResponse[] = [];
  role = 0;
  visibleEvlauteModal = false;
  evaluatePorpouse: any;

  typeFormation: CatalogsByIdResponse[] = [];
  typeRegister: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  send = false;
  documentBase64?: string;
  workflowStatus = Workflow;

  allowedExtension = '';
  allowedFileSize = 0;

  fileName = '';

  filterByFaculty = '0';
  filterByCampus = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private programsService: ProgramsService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private workflowService: WorkflowService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private cryptsService: CryptsService,
    private configService: ConfigService,
  ) {
    this.programsService.reload.subscribe(() => {
      this.getPorpouses();
    });

    this.programsService.filterByFaculty.subscribe((filter) => {
      if (!filter) {
        this.filterByFaculty = '0';
      } else {
        this.filterByFaculty = String(filter?.catalogItemId);
      }
      this.getPorpouses();
    });
  }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') ? Number(params.get('id')) : 0;
      this.idModule = params.get('idmodule') ? Number(params.get('idmodule')) : 0;
    });

    await this.loadProgramModule();
    await this.loadSelectedProgram();
    await this.getRole();
    await this.loadFaculties();
    await this.loadCampus();
    await this.loadLevelFormation();
    await this.loadStatusPorpouse();
    await this.loadTypeFormation();
    await this.loadTypeRegister();
    await this.loadModality();
    this.getAllowedExtension();
    setTimeout(() => {
      this.getPorpouses();
    }, 2500);
  }

  loadSelectedProgram() {
    this.programsService.getProgram(this.idProgram ?? 0).subscribe((response) => {
      const { data } = response;
      this.selectedProgram = data;
    });
  }

  loadProgramModule() {
    this.programsService.getProgramModule(false).subscribe((response) => {
      const { data } = response;
      if (data.length === 0) {
        this.alertService.showInfoMessage({ message: 'No se encontraron modulos asociados' });
        return;
      }
      this.selectedModule = data.find((item) => item.moduleId == this.idModule);
    });
  }

  loadProgramHistorical() {
    this.programsService
      .getProgramHistoricalSpecific(this.idProgram ?? 0, this.idModule ?? 0)
      .subscribe((response) => {
        const { data } = response;
        this.programHistorical = data;
        if (this.programHistorical.length === 0) {
          this.alertService.showInfoMessage({ message: 'No se encontraron resultados' });
          return;
        }
      });
  }

  filterByFacultyEvent($event: any) {
    this.programsService.filterByFaculty.emit($event?.value);
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  loadStatusPorpouse() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.STATUS_PORPOUSE).subscribe((response) => {
      const { data } = response;
      this.statusPorpuse = data;
    });
  }

  getPorpouses() {
    this.porpouses = [];
    this.programsService.getProgramsTechnical(this.filterByFaculty).subscribe((response) => {
      this.porpouses = response.data;

      this.porpouses.forEach((element) => {
        element.setFaculty = this.faculties.find(
          (item) => item.catalogItemId.toString() === this.filterByFaculty,
        )?.catalogItemName;

        element.setLevelFormation = this.levelFormation.find(
          (item) => item.catalogItemId === element.idLevelFormation,
        )?.catalogItemName;

        element.setCampus = this.setCampus(element.campusList);
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

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
      this.getFacultyId();
    });
  }

  getFacultyId() {
    const facultyId = this.cryptsService.decryptData(SessionStorageItems.SESSION)?.userData
      ?.faculty;
    const findFaculty = this.faculties.find((item) => item.catalogItemId === facultyId);
    if (!findFaculty) return;
    this.filterByFaculty = findFaculty.catalogItemId.toString();
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

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
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
        this.fileName = file.name;
        const maxSize = this.allowedFileSize * 1024 * 1024;
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

  downloadDocument(url: string) {
    window.open(url, 'blank');
  }
}
