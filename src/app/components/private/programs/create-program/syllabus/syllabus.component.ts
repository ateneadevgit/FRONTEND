/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { CurriculumItem } from 'src/models/curriculum-item.interface';
import { SyllabusData } from 'src/models/syllabus.interface';
import { ISubjectData } from 'src/models/traceability.interface';
import { Workflow } from 'src/models/workflow.interface';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss'],
})
export class SyllabusComponent implements OnInit {
  idProgram?: string;
  currentWorkFlow?: Workflow;
  @Input() editProgram = false;
  @Input() objSyllabus: SyllabusData[] = [];

  @Output() openSyllabus = new EventEmitter<boolean>();
  @Output() emitData = new EventEmitter<SyllabusData>();
  @Input() activeButton = false;

  visibleForm = false;

  idStep?: string;
  idWorkflow?: string;

  selectNucleo?: CurriculumItem;
  selectSubnucleo?: CurriculumItem;

  nucleoList: CurriculumItem[] = [];
  subnucleoList: CurriculumItem[] = [];
  defaultCatalogItemArray: CatalogsByIdResponse[] = [];
  defaultCatalogItem: CatalogsByIdResponse | null = null;
  levelFormation: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  faculties: CatalogsByIdResponse[] = [];
  subjectType: CatalogsByIdResponse[] = [];
  subjects: ISubjectData[] = [];

  defaultLevelFormation: ISubjectData | null = null;

  urlPdf = '';
  edit = false;
  idSyllabus = 0;
  // Define a pattern for numbers only
  numberPattern = /^[0-9]*$/;

  formSyllabus = this.fb.group({
    programName: new FormControl({ value: '', disabled: true }), //ok
    levelFormationId: new FormControl({ value: this.defaultCatalogItem, disabled: true }, [
      Validators.required,
    ]), // number
    facultyId: new FormControl({ value: this.defaultCatalogItem, disabled: true }, [
      Validators.required,
    ]), // number
    campus: new FormControl({ value: this.defaultCatalogItemArray, disabled: true }, [
      Validators.required,
    ]), // array
    modalities: new FormControl({ value: this.defaultCatalogItemArray, disabled: true }, [
      Validators.required,
    ]),
    approvedDate: new FormControl('', [Validators.required]),
    attendance: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    cat: new FormControl('', [Validators.maxLength(15)]),
    cine: new FormControl('', [Validators.maxLength(15)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    learningGeneral: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    learningSpecific: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    levelFormationCredits: new FormControl({ value: 0, disabled: true }),
    levelFormationPrerequisites: new FormControl(this.defaultLevelFormation, [Validators.required]),
    modalityObservation: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    nbc: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    pedagogicalPractices: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    signatureType: new FormControl(this.defaultCatalogItem, [Validators.required]),
    signatureTypeObservation: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    subjectConformation: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    subjectContext: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    subjectDescription: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    bibliographyBasic: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    bibliographyLenguaje: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    bibliographyWeb: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    createdBy: new FormControl(null),
    curriculumId: new FormControl(0),
    stepId: new FormControl(4),
    workflowBaseId: new FormControl(0),
  });

  get formControls() {
    return this.formSyllabus.controls;
  }

  constructor(
    private workflowService: WorkflowService,
    private catalogsService: CatalogsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private utilService: UtilsService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') || '';
      this.idStep = params.get('idstep') || '';
      this.idWorkflow = params.get('idworkflow') || '';
    });
    this.loadData();
  }

  loadData() {
    this.workflowService.getCurriculumByType(this.idProgram || '', '53').subscribe({
      next: (response) => {
        const { data } = response;
        if (data.length > 0) {
          this.nucleoList = data;
        }
      },
    });
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
    });
    this.workflowService.getSubjects(this.idProgram || '').subscribe((response) => {
      const { data } = response;
      this.subjects = data;
    });
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVEL_FORMTATION).subscribe((response) => {
      const { data } = response;
      this.levelFormation = data;
    });
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY).subscribe((response) => {
      const { data } = response;
      this.modality = data;
    });
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.SUBJECT_TYPE).subscribe((response) => {
      const { data } = response;
      this.subjectType = data;
    });
  }

  loadSubNucleo() {
    if (this.selectNucleo) {
      this.workflowService
        .getCurriculumByFather(this.idProgram || '', this.selectNucleo.curriculumId.toString())
        .subscribe({
          next: (response) => {
            const { data } = response;
            if (data.length > 0) {
              this.subnucleoList = data;
              if (this.activeButton) {
                const id: Number[] = [];
                this.objSyllabus.map((obj) => {
                  id.push(obj.curriculumId);
                });
                this.subnucleoList = this.subnucleoList.filter((obj) =>
                  id.includes(obj.curriculumId),
                );
              }
            }
          },
        });
    }
  }

  getDataPreload() {
    if (this.selectSubnucleo) {
      this.workflowService
        .getSyllabusPreloadInformation(this.selectSubnucleo.curriculumId.toString())
        .subscribe({
          next: (response) => {
            const { data } = response;

            this.visibleForm = true;
            const tempModalities: CatalogsByIdResponse[] = [];
            data.modalities.map((item) => {
              const findItem = this.modality.find((find) => find.catalogItemId == item);
              if (findItem) tempModalities.push(findItem);
            });
            this.formSyllabus.controls.modalities.setValue(tempModalities);

            const tempCampus: CatalogsByIdResponse[] = [];
            data.campus.map((item) => {
              const findItem = this.campus.find((find) => find.catalogItemId == item);
              if (findItem) tempCampus.push(findItem);
            });
            this.formSyllabus.controls.campus.setValue(tempCampus);

            const findFaculty = this.faculties.find((find) => find.catalogItemId == data.facultyId);
            if (findFaculty) this.formSyllabus.controls.facultyId.setValue(findFaculty);

            const findLevel = this.levelFormation.find(
              (find) => find.catalogItemId == data.levelFormationId,
            );
            if (findLevel) this.formSyllabus.controls.levelFormationId.setValue(findLevel);

            this.formSyllabus.controls.programName.setValue(data.programName);
            this.formSyllabus.controls.levelFormationCredits.setValue(data.credits);
          },
        });
      this.loadDataSyllabus();
      this.getSyllbusPdf();
    }
  }

  loadDataSyllabus() {
    if (this.selectSubnucleo) {
      if (this.editProgram) {
        const resultFind = this.objSyllabus.find(
          (obj) => obj.curriculumId === this.selectSubnucleo?.curriculumId || 0,
        );
        this.edit = resultFind ? true : false;
        if (this.edit) {
          this.setDataForm(resultFind);
          return;
        }
      }

      this.workflowService.getExistsSyllabus(this.selectSubnucleo.curriculumId).subscribe({
        next: (response) => {
          if (response.message == 'OK') {
            this.edit = response.data;
            this.loadDataOnForm();
          }
        },
      });
    }
  }

  loadDataOnForm() {
    if (this.selectSubnucleo) {
      this.workflowService.getSyllabusData(this.selectSubnucleo.curriculumId).subscribe({
        next: (response) => {
          if (response.message == 'OK') {
            const { data } = response;
            this.setDataForm(data);
          }
        },
      });
    }
  }

  setDataForm(data: any) {
    this.formSyllabus.controls.approvedDate.setValue(
      this.utilService.transformDateyyyymmdd(data.approvedDate),
    );
    this.formSyllabus.controls.attendance.setValue(data.attendance);
    this.formSyllabus.controls.bibliographyBasic.setValue(data.bibliographyBasic);
    this.formSyllabus.controls.bibliographyLenguaje.setValue(data.bibliographyLenguaje);
    this.formSyllabus.controls.bibliographyWeb.setValue(data.bibliographyWeb);
    this.formSyllabus.controls.cat.setValue(data.cat);
    this.formSyllabus.controls.cine.setValue(data.cine);
    this.formSyllabus.controls.code.setValue(data.code);
    this.formSyllabus.controls.content.setValue(data.content);
    this.formSyllabus.controls.curriculumId.setValue(data.curriculumId);
    this.formSyllabus.controls.learningGeneral.setValue(data.learningGeneral);
    this.formSyllabus.controls.learningSpecific.setValue(data.learningSpecific);
    //this.formSyllabus.controls.levelFormationCredits.setValue(data.levelFormationCredits);
    const prerrequisites = this.subjects.find(
      (obj) => obj.name === data.levelFormationPrerequisites,
    );
    this.formSyllabus.controls.levelFormationPrerequisites.setValue(prerrequisites || null);
    this.formSyllabus.controls.modalityObservation.setValue(data.modalityObservation);
    this.formSyllabus.controls.nbc.setValue(data.nbc);
    this.formSyllabus.controls.pedagogicalPractices.setValue(data.pedagogicalPractices);
    const signatureType = this.subjectType.find((obj) => obj.catalogItemId === data.signatureType);
    this.formSyllabus.controls.signatureType.setValue(
      signatureType ? signatureType : this.defaultCatalogItem,
    );
    this.formSyllabus.controls.signatureTypeObservation.setValue(data.signatureTypeObservation);
    this.formSyllabus.controls.stepId.setValue(data.stepId);
    this.formSyllabus.controls.subjectConformation.setValue(data.subjectConformation);
    this.formSyllabus.controls.subjectContext.setValue(data.subjectContext);
    this.formSyllabus.controls.subjectDescription.setValue(data.subjectDescription);
    // this.formSyllabus.controls.syllabusId.setValue(data.syllabusId);
    this.formSyllabus.controls.workflowBaseId.setValue(data.workflowBaseId);
    this.idSyllabus = data.syllabusId || 0;
  }

  sendData() {
    this.formSyllabus.markAllAsTouched();
    if (this.formSyllabus.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido, intentalo nuevamente',
        detail: 'Inténtalo nuevamente',
      });
    }

    const formValues = this.formSyllabus.getRawValue();

    const subjectType: CatalogsByIdResponse | null = formValues.signatureType;
    const syllabusData: SyllabusData = {
      approvedDate: this.utilService.transformDateyyyymmdd(formValues.approvedDate || ''),
      attendance: formValues.attendance || '',
      bibliographyBasic: formValues.bibliographyBasic || '',
      bibliographyLenguaje: formValues.bibliographyLenguaje || '',
      bibliographyWeb: formValues.bibliographyWeb || '',
      cat: formValues.cat || '',
      cine: formValues.cine || '',
      code: formValues.code || '',
      content: formValues.content || '',
      learningGeneral: formValues.learningGeneral || '',
      learningSpecific: formValues.learningSpecific || '',
      levelFormationCredits: formValues.levelFormationCredits || 0,
      levelFormationPrerequisites: formValues.levelFormationPrerequisites?.name || '',
      modalityObservation: formValues.modalityObservation || '',
      nbc: formValues.nbc || '',
      pedagogicalPractices: formValues.pedagogicalPractices || '',
      signatureType: subjectType ? subjectType.catalogItemId : 0,
      signatureTypeObservation: formValues.signatureTypeObservation || '',
      subjectConformation: formValues.subjectConformation || '',
      subjectContext: formValues.subjectContext || '',
      subjectDescription: formValues.subjectDescription || '',
      workflowBaseId: Number(this.idWorkflow) || 0,
      stepId: 4,
      createdBy: null,
      curriculumId: this.selectSubnucleo?.curriculumId || 0,
      enabled: true,
    };
    if (this.editProgram) {
      const fecha = new Date(syllabusData.approvedDate);
      const milisegundos = fecha.getTime();
      syllabusData.approvedDate = milisegundos.toString();
      this.emitData.emit(syllabusData);
      this.visibleForm = false;
      this.formSyllabus.reset();
    } else {
      if (!this.edit) {
        this.workflowService.createDataSyllabus(syllabusData).subscribe({
          next: (response) => {
            if (response.data == 'OK') {
              // this.openSyllabus.emit(false);
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Creación de Sílabos realizada correctamente',
              });
              this.moveCreateProgram();
            }
          },
        });
      } else {
        this.workflowService.updateDataSyllabus(syllabusData, this.idSyllabus).subscribe({
          next: (response) => {
            if (response.data == 'OK') {
              // this.openSyllabus.emit(false);
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Actualización de Sílabos realizada correctamente',
              });
              this.moveCreateProgram();
            }
          },
        });
      }
    }
  }

  getSyllbusPdf() {
    if (this.selectSubnucleo) {
      this.workflowService.getSyllabusPdf(this.selectSubnucleo.curriculumId.toString()).subscribe({
        next: (response) => {
          if (response.message == 'OK') {
            this.urlPdf = response.data;
          }
        },
      });
    }
  }

  openPdf() {
    window.open(this.urlPdf, '_blank');
  }

  moveCreateProgram() {
    this.router.navigate([`${RoutesApp.PROGRAMS}/${RoutesApp.CREATE_PROGRAM}/${this.idProgram}`]);
  }
}
