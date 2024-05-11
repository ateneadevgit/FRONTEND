import { Component, OnInit } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { IDPrograms, ISearchProgram } from 'src/models/dashboard.inteface';

@Component({
  selector: 'app-academic-program',
  templateUrl: './academic-program.component.html',
  styleUrls: ['./academic-program.component.scss'],
})
export class AcademicProgramComponent implements OnInit {
  campusList: CatalogsByIdResponse[] = [];
  campusSelect: CatalogsByIdResponse | null = null;
  facultyList: CatalogsByIdResponse[] = [];
  facultySelect: CatalogsByIdResponse | null = null;
  levelList: CatalogsByIdResponse[] = [];
  levelSelect: CatalogsByIdResponse | null = null;
  modalityList: CatalogsByIdResponse[] = [];
  modalitySelect: CatalogsByIdResponse | null = null;
  listPrograms: IDPrograms[] = [];

  constructor(
    private catalogsService: CatalogsService,
    private dashboardService: DashboardService,
  ) {
    this.loadCatalogItems();
  }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    const payload: ISearchProgram = {
      campusId: this.campusSelect ? this.campusSelect.catalogItemId : null,
      facultyId: this.facultySelect ? this.facultySelect.catalogItemId : null,
      levelFormation: this.levelSelect ? this.levelSelect.catalogItemId : null,
      modalityId: this.modalitySelect ? this.modalitySelect.catalogItemId : null,
    };
    this.dashboardService.getProgramsInfo(payload).subscribe((response) => {
      this.listPrograms = response.data;
      this.listPrograms.forEach((program) => {
        const modalityIds: string[] = program.modalityList.split(',').map((id) => id.trim()); // Divide la cadena en IDs individuales
        const modalityNames: string[] = modalityIds.map((id) => {
          const catalog = this.modalityList.find((catalog) => catalog.catalogItemId === Number(id));
          return catalog ? catalog.catalogItemName : ''; // Si el catálogo se encuentra, devuelve su nombre, de lo contrario, devuelve una cadena vacía
        });
        program.modalityList = modalityNames.join(', '); // Actualiza la propiedad modalityList con los nombres separados por comas
      });
    });
  }

  loadCatalogItems() {
    this.catalogsService.getCatalogItemsByCatalog(CatalogsEnum.CAMPUS).subscribe((response) => {
      this.campusList = response.data;
    });
    this.catalogsService.getCatalogItemsByCatalog(CatalogsEnum.FACULTIES).subscribe((response) => {
      this.facultyList = response.data;
    });
    this.catalogsService
      .getCatalogItemsByCatalog(CatalogsEnum.LEVEL_FORMTATION)
      .subscribe((response) => {
        this.levelList = response.data;
      });
    this.catalogsService.getCatalogItemsByCatalog(CatalogsEnum.MODALITY).subscribe((response) => {
      this.modalityList = response.data;
    });
  }
}
