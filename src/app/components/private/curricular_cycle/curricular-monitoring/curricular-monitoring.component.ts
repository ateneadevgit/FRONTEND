import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { ProgramModuleTypes } from 'src/enums/module-type';
import { RoutesApp } from 'src/enums/routes.enum';
import { Program, ProgramModule } from 'src/models/program.interface';
import { lastValueFrom } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { Role } from 'src/enums/role.enum';
import { EnumTypeProgram } from 'src/enums/type-program.enum';

@Component({
  selector: 'app-curricular-monitoring',
  templateUrl: './curricular-monitoring.component.html',
  styleUrls: ['./curricular-monitoring.component.scss'],
})
export class CurricularMonitoringComponent implements OnInit {
  programs: Program[] = [];
  programModules: ProgramModule[] = [];
  ModuleTypes = ProgramModuleTypes;
  idProgram!: number;
  programSelect?: Program;
  activeEditProgram = false;

  RoleEnum = Role;
  role = 0;

  _EnumTypeProgram = EnumTypeProgram;

  formCurricularMonitoring: FormGroup = new FormGroup({
    programOpt: new FormControl('', [Validators.required]),
  });

  constructor(
    private programsService: ProgramsService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
  ) {
    this.getRole();
  }

  async ngOnInit() {
    await this.getPrograms();
    await this.loadProgramModule();

    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const idProgram = params.get('id') ? Number(params.get('id')) : null;
        const program = this.programs.find((item) => item.idProgram === idProgram);
        this.formControls['programOpt']?.setValue(program);
        if (program) this.idProgram = program.idProgram;
        this.programSelect = program;
      }
    });
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  selectProgram() {
    if (this.formControls['programOpt'].value) {
      this.idProgram = this.formControls['programOpt'].value.idProgram;
      this.programSelect = this.formControls['programOpt'].value;
    }
  }

  get formControls() {
    return this.formCurricularMonitoring.controls;
  }

  async getPrograms() {
    const data = (await lastValueFrom(this.programsService.getPrograms())).data;
    if (data.length === 0) {
      this.alertService.showInfoMessage({ message: 'No se encontraron programas' });
      return;
    }
    this.programs = data;
  }

  loadProgramModule() {
    this.programsService.getProgramModule(false).subscribe((response) => {
      const { data } = response;

      if (data.length === 0) {
        this.alertService.showInfoMessage({ message: 'No se encontraron módulos' });
        return;
      }
      this.programModules = data;
    });
  }

  navigateProgramModule(programModule: ProgramModule) {
    const idProgram = this.formControls['programOpt'].value;

    if (programModule.type === this.ModuleTypes.SPECIFIC_SUMARY) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.SPECIFIC_SUMARY}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.CURRICULAR_COMPONENTS) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.CURRICULAR_COMPONENT}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.SYLLABUS) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.MODULE_SYLLABUS}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.CURRICULAR_OUTPUT) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.CURRICULAR_OUTPUT}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.ACADEMIC_CREDITS) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.ACADEMIC_CREDITS}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.CORE_AND_SUBCORES) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.CORE_AND_SUBCORES}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.PROBLEM_BANK) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.PROBLEM_BANK}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.TECHNICAL_TECHNOLOGICAL_PROGRAMS) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.TECHNICAL_TECHNOLOGICAL_PROGRAMS}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.UPDATE_AUTHORIZATIONS) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.UPDATE_AUTHORIZATIONS}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }

    if (programModule.type === this.ModuleTypes.STUDY_PLAN) {
      this.router.navigate([
        `${RoutesApp.CURRICULAR_CYCLE}/${RoutesApp.STUDY_PLAN}/program/${idProgram?.idProgram}/module/${programModule.moduleId}`,
      ]);
    }
  }

  openDialogEditActive() {
    if (this.idProgram) {
      this.activeEditProgram = true;
    } else {
      this.alertService.showErrorMessage({ message: 'Debe seleccionar un programa' });
    }
  }
}
