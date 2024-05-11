/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { ProgramModuleTypes, StatusModule } from 'src/enums/module-type';
import { RoutesApp } from 'src/enums/routes.enum';
import {
  ContentProgram,
  DataEditProgram,
  IEditModule,
  Program,
  ProgramModule,
} from 'src/models/program.interface';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss'],
})
export class EditProgramComponent implements OnInit {
  programs: Program[] = [];
  programModules: ProgramModule[] = [];
  ModuleTypes = ProgramModuleTypes;
  idProgram? = '';
  activeEditProgram = false;
  listaModulosAceptados: IEditModule[] = [];
  programActive: ContentProgram | null = null;
  formCurricularMonitoring: FormGroup = new FormGroup({
    programOpt: new FormControl(''),
  });

  dataProgram: DataEditProgram | null = null;

  enumStatusModule = StatusModule;
  constructor(
    private programsService: ProgramsService,
    private alertService: AlertService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private catalogsService: CatalogsService,
  ) {
    this.idProgram = this.activateRoute?.snapshot?.paramMap.get('id') ?? undefined;
  }

  ngOnInit(): void {
    this.loadProgramModule();
    this.loadModuleEdit();
    this.programsService.getProgram(Number(this.idProgram)).subscribe((response) => {
      this.programActive = response.data;
      // carga catalogos
      this.loadFaculties();
    });
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      if (this.programActive) {
        const name = data.find(
          (obj) => this.programActive?.idFaculty === obj.catalogItemId,
        )?.catalogItemName;
        this.programActive.nameFaculty = name ? name : '';
      }
    });
  }

  loadModuleEdit() {
    this.programsService.getProposalRenovation(Number(this.idProgram)).subscribe((response) => {
      this.dataProgram = response.data;
      this.dataProgram.selectedModules;
    });
    this.programsService.getModuleEdition(Number(this.idProgram)).subscribe((response) => {
      this.listaModulosAceptados = response.data.modules;
    });
  }

  selectProgram() {
    if (this.formControls['programOpt'].value) {
      this.idProgram = this.formControls['programOpt'].value.idProgram;
    }
  }

  get formControls() {
    return this.formCurricularMonitoring.controls;
  }

  loadProgramModule() {
    this.programsService.getProgramModuleEdit(false).subscribe((response) => {
      const { data } = response;

      if (data.length === 0) {
        this.alertService.showInfoMessage({ message: 'No se encontraron módulos' });
        return;
      }
      this.programModules = data;
    });
  }

  navigateProgramModule(programModule: any) {
    this.router.navigate([
      `${RoutesApp.PROGRAMS}/${RoutesApp.EDIT_PROGRAM}/${this.idProgram}/summary/${programModule.moduleId}`,
    ]);
  }

  openDialogEditActive() {
    if (this.idProgram) {
      this.activeEditProgram = true;
    } else {
      this.alertService.showErrorMessage({ message: 'Debe seleccionar un programa' });
    }
  }
}
