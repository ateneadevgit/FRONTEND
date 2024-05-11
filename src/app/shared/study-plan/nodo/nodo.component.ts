/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { StudyPlanCatalog } from 'src/enums/study-plan-catalog.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { ReponseComponentCurriculum } from 'src/models/workflow.interface';

@Component({
  selector: 'app-nodo',
  templateUrl: './nodo.component.html',
  styleUrls: ['./nodo.component.scss'],
})
export class NodoComponent implements OnInit, OnChanges {
  @Input() isEditable = true;
  @Input() monitoringEdit = false;
  @Input() editModule = false;
  @Output() updateObject = new EventEmitter<any>();
  idProgram?;
  idWorkflow?;
  idStep?;
  addComponent = false;
  addLevel = false;
  @Input() component!: ReponseComponentCurriculum;
  @Output() emitResponse = new EventEmitter<boolean>();

  currentComponent?: ReponseComponentCurriculum;
  editComponentData?: ReponseComponentCurriculum;

  currentSecondComponent?: ReponseComponentCurriculum;

  currentThirdLevelComponent?: ReponseComponentCurriculum;

  areaSelected?: ReponseComponentCurriculum;
  themeSelected?: ReponseComponentCurriculum;
  subjectSelected?: ReponseComponentCurriculum;

  currentComponentToAdd?: ReponseComponentCurriculum;
  levels: CatalogsByIdResponse[] = [];
  currentLevelAdd = 0;

  hasSubject = false;
  typeComponent = 56;

  studyPlanCatalog = StudyPlanCatalog;

  constructor(
    private activateRoute: ActivatedRoute,
    private workflowService: WorkflowService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private catalogsService: CatalogsService,
    private router: Router,
  ) {
    this.idProgram = this.activateRoute?.snapshot?.paramMap.get('id') ?? undefined;
    if (!this.idProgram) {
      this.idProgram = this.activateRoute?.snapshot?.paramMap.get('idprogram') ?? undefined;
    }
    this.idWorkflow = this.activateRoute?.snapshot?.paramMap.get('idworkflow') ?? undefined;
    this.idStep = this.activateRoute?.snapshot?.paramMap.get('idstep') ?? undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('component' in changes) {
      this.currentComponent = undefined;
      // Realiza acciones necesarias cuando 'component' cambia
    }
  }

  ngOnInit() {
    this.loadLevels();
  }

  loadLevels() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVELS_WORKFLOW).subscribe((response) => {
      const { data } = response;
      this.levels = data;
      //  this.getPlan();
    });
  }

  getCatalogName(id: number): string {
    return this.levels.find((item) => item.catalogItemId === id)?.catalogItemName ?? '';
  }
  calculatePercentaje() {
    this.workflowService.calculatePercentaje(this.idProgram ?? '');
  }

  savedComponent($event: boolean) {
    //obtener el componente
    this.closeModal();

    this.addComponent = $event;
    this.addLevel = $event;
    this.currentComponentToAdd = undefined;
    this.themeSelected = undefined;
    this.currentComponent = undefined;
    this.emitResponse.emit(false);
  }

  activeComponent(data: ReponseComponentCurriculum) {
    // this.closeModal();
    if (data.type === StudyPlanCatalog.NUCLEUS) {
      this.subjectSelected = data;
    } else {
      this.currentComponent = data;
      this.themeSelected = undefined;
      this.areaSelected = undefined;
      this.subjectSelected = undefined;
    }
  }

  editComponent(data: ReponseComponentCurriculum, hasSubject = false) {
    this.editComponentData = data;
    this.addComponent = true;
    this.hasSubject = hasSubject;
    this.typeComponent = data.type;
  }

  closeModal() {
    console.log('hola');
    this.editComponentData = undefined;
    this.addLevel = false;
    this.currentSecondComponent = undefined;
    this.addComponent = false;
    /* this.currentComponentToAdd = undefined;
    this.themeSelected = undefined;
    this.subjectSelected = undefined; */
  }

  confirmDeleteComponent(data: ReponseComponentCurriculum) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el Componente ${data.name}?`,
      header: 'Eliminar componente',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'workflow-status in-update',
      rejectButtonStyleClass: 'workflow-status in-projection',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteConfirm(data);
      },
    });
  }

  deleteConfirm(data: ReponseComponentCurriculum) {
    this.workflowService.deleteComponentCurriculum(data?.curriculumId).subscribe({
      next: () => {
        this.currentComponentToAdd = undefined;
        this.themeSelected = undefined;
        this.currentComponent = undefined;
        this.emitResponse.emit(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error eliminando componente',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }

  addLevelComponent(component: ReponseComponentCurriculum, level = 0) {
    this.addLevel = true;
    this.currentSecondComponent = component;
    this.currentLevelAdd = level;
    if (level === 3) {
      this.currentThirdLevelComponent = component;
    }
  }

  addOtherLevel(component: ReponseComponentCurriculum, level: number, isSubCore?: boolean) {
    this.typeComponent = component.type;
    if (
      component?.type === StudyPlanCatalog.NUCLEUS ||
      component?.type === StudyPlanCatalog.SUBNUCLEUS_SUBJECT
    ) {
      if (isSubCore === true) {
        this.typeComponent = StudyPlanCatalog.SUBNUCLEUS_SUBJECT;
      }
      this.themeSelected = component;
      this.addComponent = true;
      this.hasSubject = true;
    } else {
      this.addLevel = true;
      if (!component) {
        this.currentComponentToAdd = this.currentComponent;
      } else {
        this.currentComponentToAdd = component;
      }
      this.currentLevelAdd = level;
    }
  }

  selectArea(component: ReponseComponentCurriculum) {
    this.themeSelected = undefined;
    this.subjectSelected = undefined;
    if (component.childs.length > 0) {
      this.areaSelected = component;
    } else {
      this.areaSelected = undefined;
    }
  }

  selectSubject(component: ReponseComponentCurriculum) {
    this.subjectSelected = component;
  }

  createSubject(component: ReponseComponentCurriculum) {
    this.themeSelected = component;
    this.addComponent = true;
    this.hasSubject = true;
  }

  redirectStudyPlan(idItem: number) {
    this.router.navigate([
      `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.TRAINING}/${this.idProgram}/type/9/${RoutesApp.STUDY_PLAN}/detail/${idItem}`,
    ]);
  }
  setUpdateObject(data: any) {
    this.updateObject.emit(data);
  }
  updateCurriculumEditModule(data: any) {
    const obj = this.replaceCurriculum(this.component.childs, data);
    if (obj) {
      this.component.childs = obj;
      this.updateObject.emit(this.component);
    } else {
      this.updateObject.emit(data);
    }
  }

  replaceCurriculum(
    curriculum: ReponseComponentCurriculum[],
    objToReplace: ReponseComponentCurriculum,
  ): ReponseComponentCurriculum[] | undefined {
    for (let i = 0; i < curriculum.length; i++) {
      if (curriculum[i].curriculumId === objToReplace.curriculumId) {
        // Reemplazar el objeto
        curriculum[i] = objToReplace;
        return;
      } else if (curriculum[i].childs.length > 0) {
        // Llamar recursivamente a la función si tiene hijos
        this.replaceCurriculum(curriculum[i].childs, objToReplace);
      }
    }
    return undefined;
  }
}
