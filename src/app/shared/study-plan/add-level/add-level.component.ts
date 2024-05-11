/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { StudyPlanCatalog } from 'src/enums/study-plan-catalog.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import {
  ComponenteWorkflow,
  CurriculumRequests,
  ReponseComponentCurriculum,
} from 'src/models/workflow.interface';

@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrls: ['./add-level.component.scss'],
})
export class AddLevelComponent implements OnInit {
  @Input() editLevel?: any;
  @Input() idWorkflow = '';
  @Input() idStep = '';
  @Input() idProgram = '';
  @Input() label = 'Cantidad de niveles';
  @Input() currentComponent?: ReponseComponentCurriculum;
  @Input() currentSecondComponent?: ReponseComponentCurriculum;
  @Input() currentThirdLevelComponent?: ReponseComponentCurriculum;
  @Input() currentComponentToAdd?: ReponseComponentCurriculum;
  @Input() nuevo?: number;

  @Output() emitResponse = new EventEmitter<boolean>();

  levels: CatalogsByIdResponse[] = [];
  selectLevel?: CatalogsByIdResponse;
  quantityLevels = 0;

  @Input() currentLevelAdd = 0;

  formLevels?: FormGroup = this.fb.group({
    items: this.fb.array([]),
  });

  constructor(
    private catalogsService: CatalogsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private workflowService: WorkflowService,
  ) {}

  ngOnInit(): void {
    this.loadLevels();
    /*  console.log('level ===>', this.currentLevelAdd);
    console.log('1 ===>', this.currentComponent);
    console.log('2 ===>', this.currentSecondComponent);
    console.log('3 ===>', this.currentThirdLevelComponent); 
    console.log('currentComponentToAdd', this.currentComponentToAdd);
    console.log('level ===>', this.currentLevelAdd);
    console.log('********');*/
  }

  get f() {
    return this.formLevels?.controls['items'];
  }

  get items() {
    return this.formLevels?.get('items') as FormArray;
  }

  get levelsSelect() {
    return this.levels.filter((item) => item.catalogItemId != StudyPlanCatalog.SUBNUCLEUS_SUBJECT);
  }

  loadLevels() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVELS_WORKFLOW).subscribe((response) => {
      const { data } = response;
      this.levels = data;
      console.log(response);
      if (this.nuevo == 1) {
        this.selectLevel = this.levels.find(
          (obj) => this.currentComponentToAdd?.childs[0].type === obj.catalogItemId,
        );
      }
    });
  }

  addLevelItem() {
    if (!this.selectLevel) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Debe seleccionar un nivel',
        detail: 'Inténtalo nuevamente',
      });
      return;
    }
    if (this.quantityLevels >= 10) return;
    this.quantityLevels++;
    const item = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      numberCredits: ['', [Validators.required, Validators.min(0)]],
      //participation: [''],
    });
    this.items.push(item);
  }

  removeLevelItem() {
    if (this.quantityLevels === 0) return;
    this.items.removeAt(this.quantityLevels);
    this.quantityLevels--;
  }

  removeLevelItemByIndex(index: number) {
    this.items.removeAt(index);
    this.quantityLevels--;
  }

  createAsignLevel() {
    const payload = this.payload();
    console.log(payload);
    if (!this.formLevels?.valid) return;
    this.workflowService.createComponetCurriculum(payload).subscribe({
      next: () => {
        this.emitResponse.emit(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error creando componente',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }

  payload(): ComponenteWorkflow {
    const curriculumRequests: CurriculumRequests[] = [];

    this.items?.value?.forEach((element: any) => {
      const item = {
        createdBy: null,
        description: element.description,
        fatherId: this.currentComponentToAdd?.curriculumId ?? 0,
        name: element.name,
        numberCredits: element.numberCredits,
        raeg: null,
        roleId: null,
        stepId: Number(this.idStep) ?? 0,
        subjectRequest: null,
        type: this.selectLevel?.catalogItemId ?? 0,
      };
      curriculumRequests.push(item);
    });

    const payload: ComponenteWorkflow = {
      createdBy: null,
      curriculumRequests: curriculumRequests,
      roleId: null,
      stepId: Number(this.idStep) ?? 0,
      workflowId: Number(this.idWorkflow) ?? 0,
    };
    return payload;
  }
}
