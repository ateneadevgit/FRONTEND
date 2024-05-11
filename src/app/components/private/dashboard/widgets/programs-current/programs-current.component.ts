/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Workflow } from 'src/enums/workflow.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';

@Component({
  selector: 'app-programs-current',
  templateUrl: './programs-current.component.html',
  styleUrls: ['./programs-current.component.scss'],
})
export class ProgramsCurrentComponent implements OnInit {
  rows: any = [];

  faculties: CatalogsByIdResponse[] = [];

  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private programsService: ProgramsService,
    private catalogsService: CatalogsService,
  ) {
    this.loadFaculties();
  }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
    });
  }

  loadPrograms() {
    this.rows = [];
    this.programsService
      .getProgramByStatus(Workflow.REVIEW, '', '', this.pageNumber, this.pageSize)
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
          });
        },
      });
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }
}
