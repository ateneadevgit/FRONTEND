/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CurricularComponent } from 'src/enums/curriculum-sumary.enum';
import { ProgramModuleTypes, StatusModule } from 'src/enums/module-type';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { CurriculumSaveJson } from 'src/models/curriculum-item.interface';
import {
  ContentProgram,
  IEditModule,
  IObjCreditsAcademic,
  IObjCurricularComponentRequest,
  IObjectJson,
  IObjectTemp,
  ProgramModule,
} from 'src/models/program.interface';
import { SyllabusData } from 'src/models/syllabus.interface';
import { ReponseComponentCurriculum } from 'src/models/workflow.interface';

@Component({
  selector: 'app-edit-summary-program',
  templateUrl: './edit-summary-program.component.html',
  styleUrls: ['./edit-summary-program.component.scss'],
})
export class EditSummaryProgramComponent implements OnInit {
  routerApp = RoutesApp;
  programActive: ContentProgram | null = null;

  sidebarComments = false;

  html = ''; // texto de resumen
  idProgram = '';
  idModule = '';
  programModules: ProgramModule[] = [];
  moduleActive: IEditModule | null = null;
  objectJson: IObjectJson | null = null; // Objeto respuesta
  objectTempActive: IObjectTemp | null = null; // Objeto de envio

  editActive = false;

  objAcademicCredits: IObjCreditsAcademic[] = []; // Objeto Creditos Academicos
  objCurricularComponents: IObjCurricularComponentRequest[] = []; // Objeto Componentes Curriculares
  objCoreAndSubnucleo: CurriculumSaveJson[] = []; //Objeto Componente Nucleo Subnucleo
  objSyllabus: SyllabusData[] = [];
  objStudyPlan: ReponseComponentCurriculum[] = [];
  objStudyPlanOriginal: ReponseComponentCurriculum[] = [];
  curriculumType!: number;

  statusModule = StatusModule;

  ModuleTypes = ProgramModuleTypes;

  listStatusModule: CatalogsByIdResponse[] = [];
  roleList = Role;
  role = 0;

  constructor(
    private programsService: ProgramsService,
    private loginService: LoginService,
    private catalogsService: CatalogsService,
    private activateRoute: ActivatedRoute,
  ) {
    this.getRole();
    this.idProgram = this.activateRoute?.snapshot?.paramMap.get('id') ?? '';
    this.idModule = this.activateRoute?.snapshot?.paramMap.get('idmodule') ?? '';
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  ngOnInit(): void {
    this.loadProgramModule();
    this.loadStatusModule();
    this.programsService.getProgram(Number(this.idProgram)).subscribe((response) => {
      this.programActive = response.data;
      // carga catalogos
      this.loadFaculties();
    });
  }

  loadStatusModule() {
    this.catalogsService
      .getAllCatalogsByid(CatalogsEnum.STATUS_EDIT_PROGRAM)
      .subscribe((response) => {
        const { data } = response;
        this.listStatusModule = data;
        if (this.moduleActive) {
          this.moduleActive.nameStatus = this.listStatusModule.find(
            (obj) => obj.catalogItemId === this.moduleActive?.status,
          )?.catalogItemName;
        }
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

  createHtml($event: string) {
    this.editActive = true;
    this.html = $event;
  }

  loadProgramModule() {
    this.programsService.getModuleEdition(Number(this.idProgram)).subscribe((response) => {
      if (response.data) {
        this.moduleActive =
          response.data.modules.find((obj) => obj.moduleId === Number(this.idModule)) || null;
        if (this.listStatusModule.length > 0 && this.moduleActive) {
          this.moduleActive.nameStatus = this.listStatusModule.find(
            (obj) => obj.catalogItemId === this.moduleActive?.status,
          )?.catalogItemName;
        }
        this.curriculumType =
          this.homologacion.find((obj) => obj.moduleId === Number(this.idModule))?.homologatedId ||
          0;
        this.getObjectTemp();
      }
    });
  }

  getObjectTemp() {
    this.programsService
      .getObjectTemp(Number(this.idProgram), Number(this.idModule))
      .subscribe((response) => {
        if (response.data) {
          if (response.data.objectTempId) {
            this.objectJson = response.data;
            this.getObjJson();
          } else {
            this.getDataSummary();
            //  this.sendCreatedObjectTemp();
          }
        }
      });
  }

  sendObjectTemp() {
    if (this.objectJson && this.objectJson.value) {
      this.updateObjectTemp();
    } else {
      this.sendCreatedObjectTemp();
    }
  }

  sendCreatedObjectTemp() {
    const payload: IObjectTemp = {
      createdBy: null,
      moduleId: this.idModule ? Number(this.idModule) : 0,
      object: JSON.stringify(this.sendObjJson()),
      roleId: null,
    };
    this.editActive = false;
    this.programsService.createdObjectTemp(Number(this.idProgram), payload).subscribe(() => {
      this.objectTempActive = payload;
      this.ngOnInit();
    });
  }

  getDataSummary() {
    this.programsService
      .getCurricumSummaryByProgram(this.curriculumType.toString(), this.idProgram)
      .subscribe((response) => {
        this.html = response.data.curriculumSummary;
      });
    switch (this.moduleActive?.moduleType) {
      case this.ModuleTypes.SPECIFIC_SUMARY:
        this.programsService
          .getCurricumSummaryByProgram(this.curriculumType.toString(), this.idProgram)
          .subscribe((response) => {
            this.html = response.data.curriculumSummary;
          });
        break;
      case this.ModuleTypes.ACADEMIC_CREDITS:
        break;
      case this.ModuleTypes.CURRICULAR_COMPONENTS:
        this.loadProgramHistory(CurricularComponent.EPISTEMOLOGICAL);

        this.loadProgramHistory(CurricularComponent.PADAGOGICAL);

        this.loadProgramHistory(CurricularComponent.FORMATIVO);

        this.loadProgramHistory(CurricularComponent.INTERACTION);

        this.loadProgramHistory(CurricularComponent.ASSESSMENT);

        break;
    }
  }

  loadProgramHistory(type: any) {
    if (type) {
      this.programsService
        .getProgramHistoryByModuleAndType(
          Number(this.idProgram) ?? 0,
          Number(this.idModule) ?? 0,
          Number(type),
        )
        .subscribe((response) => {
          const { data } = response;
          if (data.length > 0) {
            const value = JSON.parse(data[0].value).summary;
            this.objCurricularComponents.push({ componentType: type, componentCurricular: value });
          } else {
            this.objCurricularComponents.push({ componentType: type, componentCurricular: '' });
          }
        });
    }
  }

  sendObjJson(): any {
    let objFind;
    const objFinal: any[] = [];
    switch (this.moduleActive?.moduleType) {
      case this.ModuleTypes.SPECIFIC_SUMARY:
        return {
          summary: this.html,
          curriculumType: this.curriculumType,
        };
      case this.ModuleTypes.ACADEMIC_CREDITS:
        return this.objAcademicCredits;
      case this.ModuleTypes.CURRICULAR_COMPONENTS:
        return this.objCurricularComponents;
      case this.ModuleTypes.CORE_AND_SUBCORES || this.ModuleTypes.CURRICULAR_OUTPUT:
        return this.objCoreAndSubnucleo;
      case this.ModuleTypes.SYLLABUS:
        return this.objSyllabus;
      case this.ModuleTypes.STUDY_PLAN:
        objFind = this.findModifiedObjects(this.objStudyPlanOriginal, this.objStudyPlan);
        objFind.map((obj) => {
          const temp: objsendplan = {
            curriculumId: obj.curriculumId,
            code: null,
            description: obj.description,
            hourSelfWork: null,
            hoursInteractionTeacher: null,
            name: obj.name,
            raeg: null,
          };
          objFinal.push(temp);
        });
        return objFinal;
    }
  }

  findModifiedObjects(
    originalArray: ReponseComponentCurriculum[],
    modifiedArray: ReponseComponentCurriculum[],
  ): ReponseComponentCurriculum[] {
    const modifiedObjects: ReponseComponentCurriculum[] = [];

    for (const modifiedObj of modifiedArray) {
      const originalObj = originalArray.find(
        (obj) => obj.curriculumId === modifiedObj.curriculumId,
      );
      if (
        originalObj &&
        (originalObj.name !== modifiedObj.name ||
          originalObj.description !== modifiedObj.description)
      ) {
        modifiedObjects.push(modifiedObj);
      }

      for (const modifiedChild of modifiedObj.childs) {
        const originalChild = originalObj?.childs.find(
          (child) => child.curriculumId === modifiedChild.curriculumId,
        );
        if (
          originalChild &&
          (originalChild.name !== modifiedChild.name ||
            originalChild.description !== modifiedChild.description)
        ) {
          modifiedObjects.push(modifiedChild);
        }
      }
    }

    return modifiedObjects;
  }

  getObjJson(): any {
    if (this.objectJson) {
      switch (this.moduleActive?.moduleType) {
        case this.ModuleTypes.SPECIFIC_SUMARY:
          this.html = JSON.parse(this.objectJson.value).summary;
          break;
        case this.ModuleTypes.ACADEMIC_CREDITS:
          this.objAcademicCredits = JSON.parse(this.objectJson.value);
          break;
        case this.ModuleTypes.CURRICULAR_COMPONENTS:
          this.objCurricularComponents = JSON.parse(this.objectJson.value);
          break;
        case this.ModuleTypes.CORE_AND_SUBCORES || this.ModuleTypes.CURRICULAR_OUTPUT:
          this.objCoreAndSubnucleo = JSON.parse(this.objectJson.value);
          break;
        case this.ModuleTypes.SYLLABUS:
          this.objSyllabus = JSON.parse(this.objectJson.value);
          break;
        case this.ModuleTypes.STUDY_PLAN:
          this.objStudyPlanOriginal = JSON.parse(this.objectJson.value);
          this.objStudyPlan = JSON.parse(this.objectJson.value);
          break;
      }
    }
  }

  updateObjectTemp() {
    const payload: IObjectTemp = {
      createdBy: null,
      moduleId: this.idModule ? Number(this.idModule) : 0,
      object: JSON.stringify(this.sendObjJson()),
      roleId: null,
    };
    this.editActive = false;
    this.programsService.updateObjectTemp(Number(this.idProgram), payload).subscribe(() => {
      this.objectTempActive = payload;
      this.ngOnInit();
    });
  }

  sendModuleToReview() {
    const payload: IObjectTemp = {
      createdBy: null,
      moduleId: Number(this.idModule),
      programId: Number(this.idProgram),
      roleId: null,
    };
    this.programsService.sendModuleToReview(payload).subscribe(() => {
      this.ngOnInit();
    });
  }

  sendDenyApprove(value: boolean) {
    const payload: IObjectTemp = {
      createdBy: null,
      evaluation: value ? 'approved' : 'declined',
      moduleId: Number(this.idModule),
      roleId: null,
    };
    this.programsService.evaluateObject(Number(this.idProgram), payload).subscribe(() => {
      this.ngOnInit();
    });
  }

  setUpdateObject(obj: any) {
    this.editActive = true;
    switch (this.moduleActive?.moduleType) {
      case this.ModuleTypes.ACADEMIC_CREDITS:
        this.objAcademicCredits = obj;
        break;
      case this.ModuleTypes.CURRICULAR_COMPONENTS:
        this.objCurricularComponents = obj;
        break;
      case this.ModuleTypes.CORE_AND_SUBCORES || this.ModuleTypes.CURRICULAR_OUTPUT:
        this.objCoreAndSubnucleo = obj;
        break;
      case this.ModuleTypes.SYLLABUS:
        if (this.objSyllabus.findIndex((item) => item.curriculumId === obj.curriculumId) !== -1) {
          this.objSyllabus[
            this.objSyllabus.findIndex((item) => item.curriculumId === obj.curriculumId)
          ] = obj;
        } else {
          this.objSyllabus.push(obj);
        }
        break;
      case this.ModuleTypes.STUDY_PLAN:
        console.log(this.objStudyPlan);
        this.objStudyPlan = [obj];
        console.log(this.objStudyPlan);
        break;
    }
  }

  homologacion = [
    { name: 'Perfiles proceso curricular', moduleId: 1, moduleType: 76, homologatedId: 42 },
    { name: 'Organización del Plan de Estudios', moduleId: 6, moduleType: 78, homologatedId: 47 },
    { name: 'Núcleos y subnúcleos', moduleId: 11, moduleType: 82, homologatedId: 50 },
    { name: 'Programas académicos de campo', moduleId: 16, moduleType: 76, homologatedId: 47 },
    { name: 'RAE (Globales y específicos)', moduleId: 2, moduleType: 76, homologatedId: 43 },
    { name: 'Sílabos', moduleId: 7, moduleType: 79, homologatedId: 48 },
    { name: 'Banco de problemas', moduleId: 12, moduleType: 98, homologatedId: 49 },
    { name: 'Programas técnicos y tecnológicos', moduleId: 17, moduleType: 99, homologatedId: 48 },
    { name: 'Objetivos de formación', moduleId: 3, moduleType: 76, homologatedId: 45 },
    { name: 'Salidas curriculares', moduleId: 8, moduleType: 80, homologatedId: 49 },
    { name: 'Investigación formativa', moduleId: 13, moduleType: 76, homologatedId: 48 },
    { name: 'Autorizaciones de actualización', moduleId: 18, moduleType: 100, homologatedId: 50 },
    { name: 'Competencias', moduleId: 4, moduleType: 76, homologatedId: 44 },
    { name: 'Créditos académicos', moduleId: 9, moduleType: 81, homologatedId: 47 },
    { name: 'Extensión o proyección social', moduleId: 14, moduleType: 76, homologatedId: 49 },
    { name: 'Componentes curriculares', moduleId: 5, moduleType: 77, homologatedId: 48 },
    { name: 'Formación en inglés', moduleId: 10, moduleType: 76, homologatedId: 46 },
    { name: 'Internacionalización', moduleId: 15, moduleType: 76, homologatedId: 50 },
  ];
}
interface objsendplan {
  curriculumId: number;
  name: string;
  code: string | null;
  raeg: string | null;
  description: string;
  hoursInteractionTeacher: number | null;
  hourSelfWork: number | null;
}
