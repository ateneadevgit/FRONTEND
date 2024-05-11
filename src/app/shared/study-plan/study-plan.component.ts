/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { StudyPlanCatalog } from 'src/enums/study-plan-catalog.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { ReponseComponentCurriculum } from 'src/models/workflow.interface';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.scss'],
})
export class StudyPlanComponent implements OnInit {
  @Input() isEditable = false;
  @Input() monitoringEdit = false;
  @Input() editModule = false;
  @Input() data: ReponseComponentCurriculum[] = [];
  @Input() idProgram?;
  @Output() updateObject = new EventEmitter<any>();
  idWorkflow?;
  idStep?;
  addComponent = false;
  addLevel = false;
  activeLevel = false;
  components: ReponseComponentCurriculum[] = [];

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
  typeComponent = 56;

  hasSubject = false;

  studyPlanCatalog = StudyPlanCatalog;

  constructor(
    private activateRoute: ActivatedRoute,
    private workflowService: WorkflowService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private catalogsService: CatalogsService,
  ) {
    if (!this.idProgram) {
      this.idProgram = this.activateRoute?.snapshot?.paramMap.get('id') ?? undefined;
    }
    this.idWorkflow = this.activateRoute?.snapshot?.paramMap.get('idworkflow') ?? undefined;
    this.idStep = this.activateRoute?.snapshot?.paramMap.get('idstep') ?? undefined;
  }

  ngOnInit() {
    this.loadLevels();
  }

  loadLevels() {
    this.currentComponent = undefined;
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVELS_WORKFLOW).subscribe((response) => {
      const { data } = response;
      this.levels = data;
      if (this.data.length > 0) {
        this.components = this.data;
        this.currentComponent = this.components[0]; // Carga componente activo el primero encontrado
      } else {
        this.getPlan();
      }
    });
  }

  getCatalogName(id: number): string {
    return this.levels.find((item) => item.catalogItemId === id)?.catalogItemName ?? '';
  }
  calculatePercentaje() {
    this.workflowService.calculatePercentaje(this.idProgram ?? '');
  }

  async getPlan() {
    console.log('busca nuevamente');
    await this.calculatePercentaje();
    this.currentComponent = undefined;
    this.editComponentData = undefined;
    this.currentSecondComponent = undefined;
    this.currentThirdLevelComponent = undefined;
    this.areaSelected = undefined;
    this.themeSelected = undefined;
    this.subjectSelected = undefined;

    this.workflowService.getPlanStdies(this.idProgram ?? '').subscribe({
      next: (response) => {
        const { data } = response; // Consulta Plan de estudio
        this.components = data;
        this.currentComponent = this.components[0]; // Carga componente activo el primero encontrado
        this.currentThirdLevelComponent = this.currentComponent?.childs[0]?.childs[0];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error cargando plan de estudio',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }

  savedComponent($event: boolean) {
    //obtener el componente
    this.closeModal();
    if (!this.editModule) {
      this.getPlan();
    }
    this.addComponent = $event;
    this.addLevel = $event;
    this.currentComponentToAdd = undefined;
    this.themeSelected = undefined;
    this.currentComponent = undefined;
  }

  activeComponent(data: ReponseComponentCurriculum) {
    // this.closeModal();
    this.currentComponent = data;
    this.themeSelected = undefined;
    this.areaSelected = undefined;
    this.subjectSelected = undefined;
  }

  editComponent(data: ReponseComponentCurriculum, hasSubject = false) {
    this.editComponentData = data;
    this.addComponent = true;
    this.hasSubject = hasSubject;
  }

  closeModal() {
    this.addComponent = false;
    this.editComponentData = undefined;
    this.activeLevel = false;
    this.currentSecondComponent = undefined;
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
        this.loadLevels();
        //this.getPlan();
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
      this.activeLevel = true;
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

  setUpdateObject(data: any) {
    console.log('final', data);
    //this.updateObject.emit(data);
  }
  updateCurriculumEditModule(data: any) {
    console.log('inicio', this.data);
    this.data = this.data.map((obj) => {
      if (obj.curriculumId === data.curriculumId) {
        return data;
      }
    });
    console.log('fin', this.data);
    //this.updateObject.emit(data);
  }
}
