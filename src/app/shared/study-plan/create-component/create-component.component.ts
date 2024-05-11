/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import {
  ComponenteWorkflow,
  ReponseComponentCurriculum,
  UpdateCurriculumRequests,
} from 'src/models/workflow.interface';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss'],
})
export class CreateComponentComponent implements OnInit {
  @Input() idProgram = '';
  @Input() idWorkflow = '';
  @Input() idStep = '';
  @Input() typeComponent = 56;
  @Input() editComponent?: ReponseComponentCurriculum;
  @Output() emitResponse = new EventEmitter<boolean>();
  @Input() hasSubject = false;
  @Input() currentComponent?: ReponseComponentCurriculum;
  @Input() editModule = false;
  @Output() emitUpdateCurriculum = new EventEmitter<ReponseComponentCurriculum>();

  send = false;

  formCreateComponent: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    numberCredits: new FormControl('', [Validators.required, Validators.min(0)]),
    //participation: new FormControl(''),
    code: new FormControl(''),
    hourSelfWork: new FormControl(''),
    hoursInteractionTeacher: new FormControl(''),
    semester: new FormControl(''),
  });

  constructor(
    private messageService: MessageService,
    private workflowService: WorkflowService,
  ) {}

  ngOnInit(): void {
    if (this.currentComponent) this.setSubjectForm();
    if (this.editComponent) this.preloadDataComponent();
  }

  setSubjectForm() {
    this.formCreateComponent.get('code')?.setValidators([Validators.required]);
    this.formCreateComponent
      .get('hourSelfWork')
      ?.setValidators([Validators.required, Validators.min(0)]);
    this.formCreateComponent
      .get('hoursInteractionTeacher')
      ?.setValidators([Validators.required, Validators.min(0)]);
    this.formCreateComponent.get('semester')?.setValidators([Validators.required]);
  }

  get f() {
    return this.formCreateComponent?.controls;
  }

  preloadDataComponent() {
    this.formCreateComponent.get('name')?.setValue(this.editComponent?.name);
    this.formCreateComponent.get('description')?.setValue(this.editComponent?.description);
    this.formCreateComponent.get('numberCredits')?.setValue(this.editComponent?.numberCredits);
    //this.formCreateComponent.get('participation')?.setValue(this.editComponent?.percentageParticipation);

    this.formCreateComponent.get('code')?.setValue(this.editComponent?.subjectRequest?.code);
    this.formCreateComponent
      .get('hourSelfWork')
      ?.setValue(this.editComponent?.subjectRequest?.hourSelfWork);
    this.formCreateComponent
      .get('hoursInteractionTeacher')
      ?.setValue(this.editComponent?.subjectRequest?.hoursInteractionTeacher);
    this.formCreateComponent
      .get('semester')
      ?.setValue(this.editComponent?.subjectRequest?.semester);
    if (this.editModule) {
      //credito no editable
      this.formCreateComponent.get('numberCredits')?.disable();
    }
  }

  createComponent() {
    if (!this.formCreateComponent.valid) return;

    if (this.editComponent) {
      if (this.editModule) {
        //Si el flujo es de edicion de programa por modulo
        const value = this.formCreateComponent.value;
        const objTemp: ReponseComponentCurriculum = this.editComponent;
        objTemp.description = value.description;
        objTemp.name = value.name;
        this.emitUpdateCurriculum.emit(objTemp);
        this.emitResponse.emit(false);
      } else {
        this.updateComponent();
      }
      return;
    }
    const payload: ComponenteWorkflow = this.payload();
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

  updateComponent() {
    if (!this.formCreateComponent.valid) return;
    const payload: UpdateCurriculumRequests = this.payloadUpdate();
    this.workflowService
      .updateComponetCurriculum(payload, this.editComponent?.curriculumId ?? 0)
      .subscribe({
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

  payloadUpdate(): UpdateCurriculumRequests {
    const value = this.formCreateComponent.value;

    let subjectRequest = null;
    if (this.hasSubject && this.editComponent) {
      subjectRequest = {
        code: value.code,
        hourSelfWork: value.hourSelfWork,
        hoursInteractionTeacher: value.hoursInteractionTeacher,
        semester: value.semester,
      };
    }

    const payload: UpdateCurriculumRequests = {
      createdBy: null,
      description: value.description,
      name: value.name,
      numberCredits: value.numberCredits,
      raeg: null,
      roleId: null,
      subjectRequest: subjectRequest,
    };
    return payload;
  }

  payload(): ComponenteWorkflow {
    const value = this.formCreateComponent.value;

    const payload: ComponenteWorkflow = {
      createdBy: null,
      curriculumRequests: [
        {
          createdBy: null,
          description: value.description,
          fatherId: this.hasSubject ? Number(this.currentComponent?.curriculumId) : null,
          name: value.name,
          numberCredits: value.numberCredits,
          raeg: null,
          roleId: null,
          stepId: Number(this.idStep) ?? 0,
          subjectRequest: !this.hasSubject
            ? null
            : {
                code: value.code,
                hourSelfWork: value.hourSelfWork,
                hoursInteractionTeacher: value.hoursInteractionTeacher,
                semester: value.semester,
              },
          type: this.typeComponent,
        },
      ],
      roleId: null,
      stepId: Number(this.idStep) ?? 0,
      workflowId: Number(this.idWorkflow) ?? 0,
    };
    return payload;
  }
}
