/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
  visible = false;
  faculties: CatalogsByIdResponse[] = [];
  selectFaculty?: string;
  typeProgram: string | null = null;
  RoleEnum = Role;

  campus: CatalogsByIdResponse[] = [];
  selectCampus?: string;
  role = 0;
  constructor(
    private catalogsService: CatalogsService,
    private programsService: ProgramsService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.loadFaculties();
    this.loadCampus();
  }

  getRole() {
    this.role = this.loginService.getRole();
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

  createProgram() {
    this.visible = true;
  }

  succesCreate() {
    this.visible = !this.visible;
    this.programsService.reload.emit(true);
  }

  typeProgramEmit(type: string | null) {
    this.typeProgram = type;
  }

  filterByFaculty($event: any) {
    this.programsService.filterByFaculty.emit($event?.value);
  }

  filterByCampus($event: any) {
    this.programsService.filterByCampus.emit($event?.value);
  }
}
