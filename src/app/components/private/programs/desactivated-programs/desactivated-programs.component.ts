import { AlertService } from './../../../../services/message/alert.service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CatalogsByIdResponse, CatalogsResponse } from 'src/models/catalogs.interface';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { TableService } from 'src/app/services/table/table.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Workflow } from 'src/enums/workflow.enum';
import { PreviewDocument } from 'src/models/preview-document.interface';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { Role } from 'src/enums/role.enum';

@Component({
  selector: 'app-desactivated-programs',
  templateUrl: './desactivated-programs.component.html',
  styleUrls: ['./desactivated-programs.component.scss'],
})
export class DesactivatedProgramsComponent implements OnInit {
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
  visible = false;
  previewDocument?: PreviewDocument;
  filterByFaculty = '';
  filterByCampus = '';
  RoleEnum = Role;

  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private programsService: ProgramsService,
    private tableService: TableService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private utilService: UtilsService,
    private alertService: AlertService,
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
  }

  async ngOnInit() {
    this.getRole();
    await this.loadCampus();
    await this.loadLevelFormation();
    await this.loadStatusPorpouse();
    await this.loadFaculties();
    setTimeout(() => {
      this.loadPrograms();
    }, 2500);
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  loadPrograms() {
    this.rows = [];
    this.programsService
      .getProgramByStatus(
        Workflow.DISABLED,
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

  viewDocument(item?: string) {
    if (!item) {
      this.alertService.showWarnMessage({ message: 'No hay documento adjunto' });
      return;
    }

    this.previewDocument = {
      url: item,
      type: this.utilService.getFileExtension(item),
    };
    this.visible = true;
  }

  closeModal($event: boolean) {
    this.visible = $event;
  }

  downloadDocument(url?: string) {
    if (!url) {
      this.alertService.showWarnMessage({ message: 'No hay documento adjunto' });
      return;
    }
    window.open(url, 'blank');
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }
}
