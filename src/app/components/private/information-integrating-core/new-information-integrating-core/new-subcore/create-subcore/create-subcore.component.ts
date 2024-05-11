/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { IActivityRequest, IIntegryActivities } from 'src/models/workflow.interface';
import { Program } from 'src/models/program.interface';
import { lastValueFrom } from 'rxjs';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';

@Component({
  selector: 'app-create-subcore',
  templateUrl: './create-subcore.component.html',
  styleUrls: ['./create-subcore.component.scss'],
})
export class CreateSubcoreComponent implements OnInit {
  @Output() closeComponent = new EventEmitter();
  @Input() subCoreIdEdit?: number;

  subCoreData?: any;
  subCoreSyllabusData?: any;
  subCoreSubjectGuideData?: any;
  items: MenuItem[] = [];
  activeIndex = 0;

  defaultCatalogItemArray: CatalogsByIdResponse[] = [];
  defaultCatalogItem: CatalogsByIdResponse | null = null;
  levelFormation: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  faculties: CatalogsByIdResponse[] = [];
  subjectType: CatalogsByIdResponse[] = [];

  programsSyllabus: Program[] = [];
  programsSubjectGuide: Program[] = [];

  edit = false;
  numberPattern = /^[0-9]*$/;

  formSubCore: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    numberCredits: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    semester: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    hoursInteractionTeacher: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    hourSelfWork: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    description: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
  });

  formSyllabus: FormGroup = new FormGroup({
    approvedDate: new FormControl('', [Validators.required]),
    attendance: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    bibliographyBasic: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    bibliographyLenguaje: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    bibliographyWeb: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    campusIds: new FormControl('', [Validators.required]),
    cat: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    cine: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    facultyIds: new FormControl('', [Validators.required]),
    learningGeneral: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    learningSpecific: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    levelFormationCredits: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+$/),
    ]),
    levelFormationIds: new FormControl('', [Validators.required]),
    levelFormationPrerequisites: new FormControl('', [Validators.required]),
    modalities: new FormControl('', [Validators.required]),
    modalityObservation: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    nbc: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    pedagogicalPractices: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    programIds: new FormControl('', [Validators.required]),
    signatureType: new FormControl(this.defaultCatalogItem, [Validators.required]),
    signatureTypeObservation: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    subjectConformation: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    subjectContext: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    subjectDescription: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    subjectCode: new FormControl('', [Validators.required]),
    curriculumId: new FormControl(0),
    createdBy: new FormControl(null),
    syllabusId: new FormControl(0),
    stepId: new FormControl(4),
    workflowBaseId: new FormControl(0),
  });

  formSubjectGuide: FormGroup = new FormGroup({
    academicPeriod: new FormControl('', [Validators.required]),
    approvedDate: new FormControl(null, [Validators.required]),
    attendance: new FormControl('', [Validators.required]),
    bibliographyBasic: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    bibliographyLanguage: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    bibliographyWeb: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    campusIds: new FormControl('', [Validators.required]),
    coreConformation: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    coreContext: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    coreDescription: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    courseSchedule: new FormControl('', [Validators.required]),
    evaluationDescription: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    evaluationSystem: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    facultyIds: new FormControl('', [Validators.required]),
    generalContent: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    guideCode: new FormControl('', [Validators.required]),
    hoursFreelanceWork: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    hoursTeacherDirectWork: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    learningGeneral: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    learningSpecific: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    modality: new FormControl('', [Validators.required]),
    modalityIds: new FormControl('', [Validators.required]),
    monitorEmail: new FormControl('', [Validators.required]),
    monitorName: new FormControl('', [Validators.required]),
    monitorScheduleOperation: new FormControl('', [Validators.required]),
    prerrequisites: new FormControl('', [Validators.required]),
    programIds: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    strategies: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    studentAcademicWork: new FormControl('', [Validators.required]),
    syncAsyncWork: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    teacherEmail: new FormControl('', [Validators.required]),
    teacherName: new FormControl('', [Validators.required]),
    teacherProfile: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    teacherScheduleOperation: new FormControl('', [Validators.required]),
  });

  formActivities: FormGroup = new FormGroup({
    activityId: new FormControl(0),
    tittle: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    activity: new FormControl('', [Validators.required]),
    createdBy: new FormControl(''),
  });

  formAddActivityGuide: FormGroup = new FormGroup({
    session: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    activityDate: new FormControl('', [Validators.required]),
    result: new FormControl('', [Validators.required]),
    topic: new FormControl('', [Validators.required]),
    syncActivities: new FormControl('', [Validators.required]),
    previusActivities: new FormControl('', [Validators.required]),
    strategies: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    canUpdate: new FormControl(true),
    createdBy: new FormControl(''),
    enabled: new FormControl(true),
    subjectActivityId: new FormControl(0),
  });

  formActivitiesList: FormGroup[] = [this.formActivities];

  contentRAE? = '';
  contentCompetences? = '';

  lengthContentRAE = 10000;
  lengthContentCompetences = 10000;

  activityRequestList: IActivityRequest[] = [];

  valueCoreIntegrity = 'Núcleo integrador de formación sanmartiniana';
  visibleAddActivity = false;

  constructor(
    private workflowService: WorkflowService,
    private programsService: ProgramsService,
    private catalogsService: CatalogsService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private utilService: UtilsService,
    private alertService: AlertService,
  ) {}

  async ngOnInit() {
    await this.loadDataSyllabus();
    this.loadMenuItems();

    if (this.subCoreIdEdit) {
      this.loadDataSubCore();
      this.loadDataSyllabusForm();
      this.loadSubjectGuideForm();
    }
  }

  get formSubCoreControls() {
    return this.formSubCore.controls;
  }

  get formSyllabusControls() {
    return this.formSyllabus.controls;
  }

  get formSubjectGuideFormControls() {
    return this.formSubjectGuide.controls;
  }

  get formActivitiesControls() {
    return this.formActivities.controls;
  }

  openAddActivityGuide() {
    this.formAddActivityGuide.reset();
    this.formAddActivityGuide.controls['canUpdate']?.setValue(true);
    this.formAddActivityGuide.controls['createdBy']?.setValue('');
    this.formAddActivityGuide.controls['enabled']?.setValue(true);
    this.formAddActivityGuide.controls['subjectActivityId']?.setValue(0);
    this.formAddActivityGuide.updateValueAndValidity();
    this.visibleAddActivity = true;
  }

  openEditAddActivityGuide(activity: any) {
    this.formAddActivityGuide.reset();
    this.formAddActivityGuide.controls['session']?.setValue(activity?.session);
    this.formAddActivityGuide.controls['activityDate']?.setValue(new Date(activity?.activityDate));
    this.formAddActivityGuide.controls['previusActivities']?.setValue(activity?.previusActivities);
    this.formAddActivityGuide.controls['result']?.setValue(activity?.result);
    this.formAddActivityGuide.controls['strategies']?.setValue(activity?.strategies);
    this.formAddActivityGuide.controls['syncActivities']?.setValue(activity?.syncActivities);
    this.formAddActivityGuide.controls['topic']?.setValue(activity?.topic);
    this.formAddActivityGuide.controls['url']?.setValue(activity?.url);
    this.formAddActivityGuide.controls['canUpdate']?.setValue(activity?.canUpdate);
    this.formAddActivityGuide.controls['createdBy']?.setValue(activity?.createdBy);
    this.formAddActivityGuide.controls['enabled']?.setValue(activity?.enabled);
    this.formAddActivityGuide.controls['subjectActivityId']?.setValue(activity?.subjectActivityId);
    this.formAddActivityGuide.updateValueAndValidity();
    this.visibleAddActivity = true;
  }

  saveAddActivityRequest() {
    if (this.formAddActivityGuide.invalid) {
      this.alertService.showErrorMessage({
        message: 'Formulario inválido, asegurese de llenar todos los campos',
      });
      return;
    }

    const pyload = this.formAddActivityGuide.getRawValue();
    if (this.subCoreSubjectGuideData?.subjectGuideId) {
      if (pyload.subjectActivityId && pyload.subjectActivityId != 0) {
        this.workflowService.updateSubjetGuideActivity(pyload.subjectActivityId, pyload).subscribe({
          next: () => {
            this.alertService.showSuccessMessage({
              message: 'Actividad actualizada con éxito',
            });

            this.formAddActivityGuide.reset();
            this.visibleAddActivity = false;

            this.loadSubjectGuideForm();
          },
          error: () => {
            this.alertService.showErrorMessage({
              title: 'Error',
              message: 'Inténtalo nuevamente',
            });
          },
        });
      } else {
        this.workflowService
          .createSubjetGuideActivity(this.subCoreSubjectGuideData?.subjectGuideId, [pyload])
          .subscribe({
            next: () => {
              this.alertService.showSuccessMessage({
                message: 'Actividad agregada con éxito',
              });
              this.formAddActivityGuide.reset();
              this.visibleAddActivity = false;
              this.loadSubjectGuideForm();
            },
            error: () => {
              this.alertService.showErrorMessage({
                title: 'Error',
                message: 'Inténtalo nuevamente',
              });
            },
          });
      }
    } else {
      this.activityRequestList.push(pyload);
      this.formAddActivityGuide.reset();
      this.visibleAddActivity = false;
    }
  }

  deleteActivityGuideRequest(activity: any, index: number) {
    if (this.subCoreSubjectGuideData?.subjectGuideId) {
      this.workflowService.deleteSubjetGuideActivity(activity?.subjectActivityId).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Actividad eliminada con éxito',
          });
          this.loadSubjectGuideForm();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    } else {
      this.activityRequestList.splice(index, 1);
    }
  }

  closeAddActivity() {
    this.formAddActivityGuide.reset();
    this.formAddActivityGuide.updateValueAndValidity();
    this.visibleAddActivity = false;
  }

  closeComponentEmit() {
    this.closeComponent.emit();
  }

  createHtmlRAE($event: string) {
    this.contentRAE = $event;
  }

  createHtmlCompetences($event: string) {
    this.contentCompetences = $event;
  }

  onActiveIndexChange(event: any) {
    this.activeIndex = event;
  }

  nextIndexChange() {
    if (this.activeIndex === this.items.length - 1) {
      return;
    }

    this.activeIndex = this.activeIndex + 1;
    if (this.activeIndex === 0) {
      const primaryField = document.getElementById('guideCodeForm2');
      primaryField?.focus();
    }
  }

  backIndexChange() {
    if (this.activeIndex === 0) {
      return;
    }
    this.activeIndex = this.activeIndex - 1;
    if (this.activeIndex === 2) {
      const primaryField = document.getElementById('guideCodeForm2');
      primaryField?.focus();
    }
  }

  loadMenuItems() {
    this.items = [
      {
        label: 'Sílabos',
        command: (event: any) => {
          this.activeIndex = event.index;
        },
      },
      {
        label: 'Guía de asignatura',
        command: (event: any) => {
          this.activeIndex = event.index;
        },
      },
      {
        label: 'RAE',
        command: (event: any) => {
          this.activeIndex = event.index;
        },
      },
      {
        label: 'Competencias',
        command: (event: any) => {
          this.activeIndex = event.index;
        },
      },
      {
        label: 'Actividades integradoras',
        command: (event: any) => {
          this.activeIndex = event.index;
        },
      },
    ];
  }

  async loadDataSyllabus() {
    this.campus =
      (await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS)))?.data ??
      [];

    this.faculties =
      (await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES)))
        ?.data ?? [];

    this.levelFormation =
      (await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVEL_FORMTATION)))
        ?.data ?? [];

    this.modality =
      (await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY)))?.data ??
      [];

    this.subjectType =
      (await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.SUBJECT_TYPE)))
        ?.data ?? [];
  }

  addActivityIntegrity() {
    const actualForm = new FormGroup({
      activityId: new FormControl(0),
      tittle: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      activity: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
    });

    this.formActivitiesList.push(actualForm);
  }

  deleteActivityIntegrity(index: number) {
    const pyload = this.formActivitiesList[index].getRawValue();
    if (pyload.activityId != 0) {
      const pyload = this.formActivitiesList[index].getRawValue();
      this.workflowService.deleteIntegrateActivity(pyload.activityId).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Actividad integradora actualizada con éxito',
          });
          this.formAddActivityGuide.reset();
          this.formAddActivityGuide.updateValueAndValidity();
          this.visibleAddActivity = false;

          this.loadDataSubCore();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    } else {
      this.formActivitiesList.splice(index, 1);
    }
  }

  saveActivityIntegrity(index: number) {
    if (this.formActivitiesList[index].invalid) {
      this.alertService.showErrorMessage({
        message: 'Formulario inválido, asegurese de llenar todos los campos',
      });
      return;
    }

    const pyload = this.formActivitiesList[index].getRawValue();

    if (this.subCoreData) {
      if (pyload.activityId && pyload.activityId != 0) {
        this.workflowService.updateSubjetGuideActivity(pyload.activityId, pyload).subscribe({
          next: () => {
            this.alertService.showSuccessMessage({
              message: 'Actividad integradora actualizada con éxito',
            });

            this.loadDataSubCore();
          },
          error: () => {
            this.alertService.showErrorMessage({
              title: 'Error',
              message: 'Inténtalo nuevamente',
            });
          },
        });
      } else {
        this.workflowService
          .createIntegrateActivity(this.subCoreData?.curriculumId, [pyload])
          .subscribe({
            next: () => {
              this.alertService.showSuccessMessage({
                message: 'Actividad integradora agregada con éxito',
              });
              this.loadDataSubCore();
            },
            error: () => {
              this.alertService.showErrorMessage({
                title: 'Error',
                message: 'Inténtalo nuevamente',
              });
            },
          });
      }
    }
  }

  validateForm() {
    if (this.formSubCore.invalid) {
      this.alertService.showErrorMessage({ message: 'Formulario principal inválido' });

      return false;
    }

    if (this.formSyllabus.invalid) {
      this.alertService.showErrorMessage({
        message: 'Formulario sílabos inválido, asegurese de llenar todos los campos obligatorios',
      });
      return false;
    }

    if (this.formSubjectGuide.invalid) {
      this.alertService.showErrorMessage({
        message: 'Formulario Guía de Actividades inválido, asegurese de llenar todos los campos',
      });
      return false;
    }

    if (!this.contentRAE || this.contentRAE?.trim() === '') {
      this.alertService.showErrorMessage({ message: 'Formulario RAE inválido' });
      return false;
    }

    if (this.contentRAE.length > this.lengthContentRAE) {
      this.alertService.showErrorMessage({
        message: `El texto límite para RAE es de ${this.lengthContentRAE} caracteres`,
      });
      return false;
    }

    if (!this.contentCompetences || this.contentCompetences?.trim() === '') {
      this.alertService.showErrorMessage({ message: 'Formulario Competencias inválido' });
      return false;
    }

    if (this.contentCompetences.length > this.lengthContentCompetences) {
      this.alertService.showErrorMessage({
        message: `El texto límite para Compatencias es de ${this.lengthContentCompetences} caracteres`,
      });
      return false;
    }

    for (let index = 0; index < this.formActivitiesList.length; index++) {
      if (this.formActivitiesList[index].invalid) {
        this.alertService.showErrorMessage({
          message:
            'Formulario de Actividades integradoras inválido, asegurese de llenar todos los campos',
        });
        return false;
      }
    }

    return true;
  }

  getArrayIdsCatalogsItems(array: any[]): number[] {
    return array.map((item) => {
      return Number(item.catalogItemId.toString());
    });
  }

  getArrayIdsPrograms(array: any[]): number[] {
    return array.map((item) => {
      return Number(item.idProgram?.toString());
    });
  }

  getIIntegryActivities(): IIntegryActivities[] {
    const rqCurriculumNif: IIntegryActivities[] = [];

    for (let index = 0; index < this.formActivitiesList.length; index++) {
      rqCurriculumNif.push({
        activity: this.formActivitiesList[index].controls['activity']?.value?.toString(),
        activityId: this.formActivitiesList[index].controls['activityId']?.value,
        createdBy: '',
        description: this.formActivitiesList[index].controls['description']?.value?.toString(),
        tittle: this.formActivitiesList[index].controls['tittle']?.value?.toString(),
      });
    }

    return rqCurriculumNif;
  }

  loadProgramsSyllabus() {
    this.programsSyllabus = [];
    this.formSyllabus.controls['programIds'].setValue(null);
    const facultyIds = this.formSyllabus.controls['facultyIds']?.value?.map((item: any) => {
      return item?.catalogItemId;
    });
    this.programsService.getProgramByFaculties(facultyIds || []).subscribe((response) => {
      this.programsSyllabus = response.data;
    });
  }

  loadProgramsSyllabus2($event: any) {
    console.log($event);
  }

  loadProgramsSubjectGuide() {
    this.programsSubjectGuide = [];
    this.formSubjectGuide.controls['programIds'].setValue(null);
    const facultyIds = this.formSyllabus.controls['facultyIds']?.value?.map((item: any) => {
      return item?.catalogItemId;
    });
    this.programsService.getProgramByFaculties(facultyIds || []).subscribe((response) => {
      this.programsSubjectGuide = response.data;
    });
  }

  loadDataSubCore() {
    this.workflowService.getCurriculumDetail(this.subCoreIdEdit ?? 0).subscribe((response) => {
      const { data } = response;
      this.subCoreData = data;

      //Set data FormSubCore
      this.formSubCore.controls['name'].setValue(data?.name);
      this.formSubCore.controls['numberCredits'].setValue(data?.credits);
      this.formSubCore.controls['semester'].setValue(data?.semester);
      this.formSubCore.controls['hoursInteractionTeacher'].setValue(data?.hoursInteractionTeacher);
      this.formSubCore.controls['hourSelfWork'].setValue(data?.hoursSelfWork);
      this.formSubCore.controls['description'].setValue(data?.description);
      this.formSubCore.controls['code'].setValue(data?.code);
      this.contentRAE = data?.rae;
      this.contentCompetences = data?.competences;
      this.formSubCore.updateValueAndValidity();

      this.formActivitiesList = [];
      data?.activities.forEach((item: any) => {
        const actualForm = new FormGroup({
          activityId: new FormControl(item?.activityId),
          tittle: new FormControl(item?.tittle, [Validators.required]),
          description: new FormControl(item?.description, [Validators.required]),
          activity: new FormControl(item?.activity, [Validators.required]),
          createdBy: new FormControl(item?.createdBy),
        });
        this.formActivitiesList.push(actualForm);
      });
    });
  }

  loadSubjectGuideForm() {
    const pyload = {
      createdBy: null,
      roleId: null,
      teacher: null,
    };

    this.workflowService
      .getSubjectGuideData(this.subCoreIdEdit ?? 0, pyload)
      .subscribe((response) => {
        const { data } = response;

        this.subCoreSubjectGuideData = data;
        this.activityRequestList = data?.activityRequestList ?? [];

        const approvedDate = data?.approvedDate ? new Date(data?.approvedDate) : new Date();
        this.formSubjectGuide.controls['academicPeriod'].setValue(data?.academicPeriod);
        this.formSubjectGuide.controls['approvedDate'].setValue(approvedDate);
        this.formSubjectGuide.controls['attendance'].setValue(data?.attendance);
        this.formSubjectGuide.controls['bibliographyBasic'].setValue(data?.bibliographyBasic);
        this.formSubjectGuide.controls['bibliographyLanguage'].setValue(data?.bibliographyLanguage);
        this.formSubjectGuide.controls['bibliographyWeb'].setValue(data?.bibliographyWeb);

        const campusIds: any[] = [];
        for (let i = 0; i < this.campus.length; i++) {
          const item = this.campus[i];
          if (data?.campusIds?.includes(item?.catalogItemId)) {
            campusIds.push(item);
          }
        }
        this.formSubjectGuide.controls['campusIds'].setValue(campusIds);
        this.formSubjectGuide.controls['coreConformation'].setValue(data?.coreConformation);
        this.formSubjectGuide.controls['coreContext'].setValue(data?.coreContext);
        this.formSubjectGuide.controls['coreDescription'].setValue(data?.coreDescription);
        this.formSubjectGuide.controls['courseSchedule'].setValue(data?.courseSchedule);
        this.formSubjectGuide.controls['evaluationDescription'].setValue(
          data?.evaluationDescription,
        );
        this.formSubjectGuide.controls['evaluationSystem'].setValue(data?.evaluationSystem);

        const facultyIds: any[] = [];
        for (let i = 0; i < this.faculties.length; i++) {
          const item = this.faculties[i];
          if (data?.facultyIds?.includes(item?.catalogItemId)) {
            facultyIds.push(item);
          }
        }
        this.formSubjectGuide.controls['facultyIds'].setValue(facultyIds);
        this.formSubjectGuide.controls['generalContent'].setValue(data?.generalContent);
        this.formSubjectGuide.controls['guideCode'].setValue(data?.guideCode);
        this.formSubjectGuide.controls['hoursFreelanceWork'].setValue(data?.hoursFreelanceWork);
        this.formSubjectGuide.controls['hoursTeacherDirectWork'].setValue(
          data?.hoursTeacherDirectWork,
        );
        this.formSubjectGuide.controls['learningGeneral'].setValue(data?.learningGeneral);
        this.formSubjectGuide.controls['learningSpecific'].setValue(data?.learningSpecific);

        const modalityObj = this.modality.find((item) => item.catalogItemId == data?.modality);
        this.formSubjectGuide.controls['modality'].setValue(modalityObj);

        const modalityIds: any[] = [];
        for (let i = 0; i < this.modality.length; i++) {
          const item = this.modality[i];
          if (data?.modalityIds?.includes(item?.catalogItemId)) {
            modalityIds.push(item);
          }
        }
        this.formSubjectGuide.controls['modalityIds'].setValue(modalityIds);
        this.formSubjectGuide.controls['monitorEmail'].setValue(data?.monitorEmail);
        this.formSubjectGuide.controls['monitorName'].setValue(data?.monitorName);
        this.formSubjectGuide.controls['monitorScheduleOperation'].setValue(
          data?.monitorScheduleOperation,
        );
        this.formSubjectGuide.controls['prerrequisites'].setValue(data?.prerrequisites);
        this.formSubjectGuide.controls['rating'].setValue(data?.rating);
        this.formSubjectGuide.controls['strategies'].setValue(data?.strategies);
        this.formSubjectGuide.controls['studentAcademicWork'].setValue(data?.studentAcademicWork);
        this.formSubjectGuide.controls['syncAsyncWork'].setValue(data?.syncAsyncWork);
        this.formSubjectGuide.controls['teacherEmail'].setValue(data?.teacherEmail);
        this.formSubjectGuide.controls['teacherName'].setValue(data?.teacherName);
        this.formSubjectGuide.controls['teacherProfile'].setValue(data?.teacherProfile);
        this.formSubjectGuide.controls['teacherScheduleOperation'].setValue(
          data?.teacherScheduleOperation,
        );
        this.formSubjectGuide.updateValueAndValidity();

        this.programsSubjectGuide = [];
        this.programsService.getProgramByFaculties(data?.facultyIds).subscribe((response) => {
          this.programsSubjectGuide = response.data;
          const programIds: any[] = [];
          for (let i = 0; i < this.programsSubjectGuide.length; i++) {
            const item = this.programsSubjectGuide[i];
            if (data?.programIds?.includes(item?.idProgram)) {
              programIds.push(item);
            }
          }
          this.formSubjectGuide.controls['programIds'].setValue(programIds);
          this.formSubjectGuide.updateValueAndValidity();
        });
      });
  }

  loadDataSyllabusForm() {
    this.workflowService.getSyllabusData(this.subCoreIdEdit ?? 0).subscribe((response) => {
      const { data } = response;

      this.subCoreSyllabusData = data;

      const approvedDate = data?.approvedDate ? new Date(data?.approvedDate) : new Date();
      this.formSyllabus.controls['approvedDate'].setValue(approvedDate);
      this.formSyllabus.controls['code'].setValue(data?.code);
      this.formSyllabus.controls['attendance'].setValue(data?.attendance);
      this.formSyllabus.controls['bibliographyBasic'].setValue(data?.bibliographyBasic);
      this.formSyllabus.controls['bibliographyLenguaje'].setValue(data?.bibliographyLenguaje);
      this.formSyllabus.controls['bibliographyWeb'].setValue(data?.bibliographyWeb);

      const campusIds: any[] = [];
      for (let i = 0; i < this.campus.length; i++) {
        const item = this.campus[i];
        if (data?.campusIds?.includes(item?.catalogItemId)) {
          campusIds.push(item);
        }
      }
      this.formSyllabus.controls['campusIds'].setValue(campusIds);

      this.formSyllabus.controls['cat'].setValue(data?.cat);
      this.formSyllabus.controls['cine'].setValue(data?.cine);
      this.formSyllabus.controls['content'].setValue(data?.content);

      const facultyIds: any[] = [];
      for (let i = 0; i < this.faculties.length; i++) {
        const item = this.faculties[i];
        if (data?.facultyIds?.includes(item?.catalogItemId)) {
          facultyIds.push(item);
        }
      }
      this.formSyllabus.controls['facultyIds'].setValue(facultyIds);
      this.formSyllabus.controls['learningGeneral'].setValue(data?.learningGeneral);
      this.formSyllabus.controls['learningSpecific'].setValue(data?.learningSpecific);
      this.formSyllabus.controls['levelFormationCredits'].setValue(data?.levelFormationCredits);

      const levelFormationIds: any[] = [];
      for (let i = 0; i < this.levelFormation.length; i++) {
        const item = this.levelFormation[i];
        if (data?.levelFormationIds?.includes(item?.catalogItemId)) {
          levelFormationIds.push(item);
        }
      }
      this.formSyllabus.controls['levelFormationIds'].setValue(levelFormationIds);
      this.formSyllabus.controls['levelFormationPrerequisites'].setValue(
        data?.levelFormationPrerequisites,
      );

      const modalities: any[] = [];
      for (let i = 0; i < this.modality.length; i++) {
        const item = this.modality[i];
        if (data?.modalities?.includes(item?.catalogItemId)) {
          modalities.push(item);
        }
      }
      this.formSyllabus.controls['modalities'].setValue(modalities);
      this.formSyllabus.controls['modalityObservation'].setValue(data?.modalityObservation);
      this.formSyllabus.controls['nbc'].setValue(data?.nbc);
      this.formSyllabus.controls['pedagogicalPractices'].setValue(data?.pedagogicalPractices);

      const signatureTypeObj = this.subjectType.find(
        (item) => item.catalogItemId == data?.signatureType,
      );
      this.formSyllabus.controls['signatureType'].setValue(signatureTypeObj);
      this.formSyllabus.controls['signatureTypeObservation'].setValue(
        data?.signatureTypeObservation,
      );
      this.formSyllabus.controls['subjectConformation'].setValue(data?.subjectConformation);
      this.formSyllabus.controls['subjectContext'].setValue(data?.subjectContext);
      this.formSyllabus.controls['subjectDescription'].setValue(data?.subjectDescription);
      this.formSyllabus.controls['subjectCode'].setValue(data?.subjectCode);

      this.formSyllabus.controls['createdBy'].setValue(data?.createdBy);
      this.formSyllabus.controls['workflowBaseId'].setValue(data?.workflowBaseId);
      this.formSyllabus.controls['stepId'].setValue(data?.stepId);
      this.formSyllabus.updateValueAndValidity();

      this.programsSyllabus = [];
      this.programsService.getProgramByFaculties(data?.facultyIds).subscribe((response) => {
        this.programsSyllabus = response.data;
        const programIds: any[] = [];
        for (let i = 0; i < this.programsSyllabus.length; i++) {
          const item = this.programsSyllabus[i];
          if (data?.programIds?.includes(item?.idProgram)) {
            programIds.push(item);
          }
        }
        this.formSyllabus.controls['programIds'].setValue(programIds);
        this.formSyllabus.updateValueAndValidity();
      });
    });
  }

  getSyllabusRQ() {
    const approvedDate = new Date(this.formSyllabus.controls['approvedDate']?.value);
    const date = new Date();

    const facultyIds = this.getArrayIdsCatalogsItems(
      this.formSyllabus.controls['facultyIds']?.value,
    );
    const campusIds = this.getArrayIdsCatalogsItems(this.formSyllabus.controls['campusIds']?.value);
    const modalities = this.getArrayIdsCatalogsItems(
      this.formSyllabus.controls['modalities']?.value,
    );
    const levelFormationIds = this.getArrayIdsCatalogsItems(
      this.formSyllabus.controls['levelFormationIds']?.value,
    );
    const programIds = this.getArrayIdsPrograms(this.formSyllabus.controls['programIds']?.value);

    return {
      approvedDate: approvedDate,
      attendance: this.formSyllabus.controls['attendance']?.value?.toString(),
      bibliographyBasic: this.formSyllabus.controls['bibliographyBasic']?.value?.toString(),
      bibliographyLenguaje: this.formSyllabus.controls['bibliographyLenguaje']?.value?.toString(),
      bibliographyWeb: this.formSyllabus.controls['bibliographyWeb']?.value?.toString(),
      campusIds: campusIds,
      cat: this.formSyllabus.controls['cat']?.value?.toString(),
      cine: this.formSyllabus.controls['cine']?.value?.toString(),
      code: this.formSyllabus.controls['code']?.value?.toString(),
      content: this.formSyllabus.controls['content']?.value?.toString(),
      createdAt: date,
      createdBy: '',
      curriculumId: this.subCoreIdEdit ? this.subCoreData?.curriculumId : 0,
      enabled: true,
      facultyIds: facultyIds,
      learningGeneral: this.formSyllabus.controls['learningGeneral']?.value?.toString(),
      learningSpecific: this.formSyllabus.controls['learningSpecific']?.value?.toString(),
      levelFormationCredits: Number(
        this.formSyllabus.controls['levelFormationCredits']?.value?.toString(),
      ),
      levelFormationIds: levelFormationIds,
      levelFormationPrerequisites:
        this.formSyllabus.controls['levelFormationPrerequisites']?.value?.toString(),
      modalities: modalities,
      modalityObservation: this.formSyllabus.controls['modalityObservation']?.value?.toString(),
      nbc: this.formSyllabus.controls['nbc']?.value?.toString(),
      pedagogicalPractices: this.formSyllabus.controls['pedagogicalPractices']?.value?.toString(),
      programIds: programIds,
      signatureType: Number(this.formSyllabus.controls['signatureType']?.value?.catalogItemId),
      signatureTypeObservation:
        this.formSyllabus.controls['signatureTypeObservation']?.value?.toString(),
      subjectConformation: this.formSyllabus.controls['subjectConformation']?.value?.toString(),
      subjectCode: this.formSyllabus.controls['subjectCode']?.value?.toString(),
      subjectContext: this.formSyllabus.controls['subjectContext']?.value?.toString(),
      subjectDescription: this.formSyllabus.controls['subjectDescription']?.value?.toString(),
      stepId: 0,
      syllabusId: this.subCoreIdEdit ? this.subCoreSyllabusData?.syllabusId : 0,
      workflowBaseId: 0,
      updatedAt: date,
    };
  }

  getSubjectGuideRQ() {
    const approvedDate = new Date(this.formSubjectGuide.controls['approvedDate']?.value);

    const facultyIds = this.getArrayIdsCatalogsItems(
      this.formSubjectGuide.controls['facultyIds']?.value,
    );
    const campusIds = this.getArrayIdsCatalogsItems(
      this.formSubjectGuide.controls['campusIds']?.value,
    );
    const modalityIds = this.getArrayIdsCatalogsItems(
      this.formSubjectGuide.controls['modalityIds']?.value,
    );
    const programIds = this.getArrayIdsPrograms(
      this.formSubjectGuide.controls['programIds']?.value,
    );
    return {
      academicPeriod: this.formSubjectGuide.controls['academicPeriod']?.value?.toString(),
      activityRequestList: this.activityRequestList,
      approvedDate: approvedDate,
      attendance: this.formSubjectGuide.controls['attendance']?.value?.toString(),
      bibliographyBasic: this.formSubjectGuide.controls['bibliographyBasic']?.value?.toString(),
      bibliographyLanguage:
        this.formSubjectGuide.controls['bibliographyLanguage']?.value?.toString(),
      bibliographyWeb: this.formSubjectGuide.controls['bibliographyWeb']?.value?.toString(),
      campusIds: campusIds,
      coreConformation: this.formSubjectGuide.controls['coreConformation']?.value?.toString(),
      coreContext: this.formSubjectGuide.controls['coreContext']?.value?.toString(),
      coreDescription: this.formSubjectGuide.controls['coreDescription']?.value?.toString(),
      courseSchedule: this.formSubjectGuide.controls['courseSchedule']?.value?.toString(),
      createdBy: this.subCoreSubjectGuideData ? this.subCoreSubjectGuideData?.createdBy : '',
      evaluationDescription:
        this.formSubjectGuide.controls['evaluationDescription']?.value?.toString(),
      evaluationSystem: this.formSubjectGuide.controls['evaluationSystem']?.value?.toString(),
      facultyIds: facultyIds,
      generalContent: this.formSubjectGuide.controls['generalContent']?.value?.toString(),
      guideCode: this.formSubjectGuide.controls['guideCode']?.value?.toString(),
      hoursFreelanceWork: Number(this.formSubjectGuide.controls['hoursFreelanceWork']?.value),
      hoursTeacherDirectWork: Number(
        this.formSubjectGuide.controls['hoursTeacherDirectWork']?.value,
      ),
      learningGeneral: this.formSubjectGuide.controls['learningGeneral']?.value?.toString(),
      learningSpecific: this.formSubjectGuide.controls['learningSpecific']?.value?.toString(),
      modality: Number(this.formSubjectGuide.controls['modality']?.value?.catalogItemId),
      modalityIds: modalityIds,
      monitorEmail: this.formSubjectGuide.controls['monitorEmail']?.value?.toString(),
      monitorName: this.formSubjectGuide.controls['monitorName']?.value?.toString(),
      monitorScheduleOperation:
        this.formSubjectGuide.controls['monitorScheduleOperation']?.value?.toString(),
      prerrequisites: this.formSubjectGuide.controls['prerrequisites']?.value?.toString(),
      programIds: programIds,
      rating: this.formSubjectGuide.controls['rating']?.value?.toString(),
      roleId: this.subCoreSubjectGuideData ? this.subCoreSubjectGuideData?.roleId : '',
      strategies: this.formSubjectGuide.controls['strategies']?.value?.toString(),
      studentAcademicWork: this.formSubjectGuide.controls['studentAcademicWork']?.value?.toString(),
      subjectCode: this.subCoreSubjectGuideData
        ? this.subCoreSubjectGuideData?.subjectCode
        : this.formSubCore.controls['code']?.value?.toString(),
      subjectGuideId: this.subCoreSubjectGuideData
        ? this.subCoreSubjectGuideData?.subjectGuideId
        : 0,
      syncAsyncWork: this.formSubjectGuide.controls['syncAsyncWork']?.value?.toString(),
      teacherEmail: this.formSubjectGuide.controls['teacherEmail']?.value?.toString(),
      teacherName: this.formSubjectGuide.controls['teacherName']?.value?.toString(),
      teacherProfile: this.formSubjectGuide.controls['teacherProfile']?.value?.toString(),
      teacherScheduleOperation:
        this.formSubjectGuide.controls['teacherScheduleOperation']?.value?.toString(),
    };
  }

  getSubjectRequestRQ() {
    return {
      createdBy: '',
      description: this.formSubCore.controls['description']?.value?.toString(),
      fatherId: this.subCoreData ? this.subCoreData?.fatherId : 0,
      name: this.formSubCore.controls['name']?.value?.toString(),
      numberCredits: Number(this.formSubCore.controls['numberCredits']?.value),
      raeg: null,
      roleId: 0,
      stepId: 0,
      subjectRequest: {
        code: this.formSubCore.controls['code']?.value?.toString(),
        hourSelfWork: Number(this.formSubCore.controls['hourSelfWork']?.value),
        hoursInteractionTeacher: Number(
          this.formSubCore.controls['hoursInteractionTeacher']?.value,
        ),
        semester: Number(this.formSubCore.controls['semester']?.value),
      },
      type: this.subCoreData ? this.subCoreData?.type : 55,
      workflowId: 0,
    };
  }

  loadRQDataSubCore() {
    const pyload = {
      activities: this.getIIntegryActivities(),
      competences: this.contentCompetences || '',
      createdBy: '',
      rae: this.contentRAE || '',
      subjectGuide: this.getSubjectGuideRQ(),
      subjectRequest: this.getSubjectRequestRQ(),
      syllabus: this.getSyllabusRQ(),
    };

    return pyload;
  }

  createUpdate() {
    if (!this.validateForm()) return;

    const pyload = this.loadRQDataSubCore();

    this.workflowService.createSubCoreNif(pyload).subscribe({
      next: () => {
        this.alertService.showSuccessMessage({
          message: 'Subnúcleo creado con éxito',
        });
        this.closeComponentEmit();
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  getNameIdexStep() {
    let name = '';
    switch (this.activeIndex) {
      case 0:
        name = 'syllabus';
        break;
      case 1:
        name = 'guía de asignatura';
        break;
      case 2:
        name = 'RAE';
        break;
      case 3:
        name = 'competencias';
        break;
    }

    return name;
  }

  updateForm() {
    switch (this.activeIndex) {
      case 0:
        this.updateSyllabusNif();
        break;
      case 1:
        this.updateSubjetGuideNif();
        break;
      case 2:
        this.updateRaeCompetences();
        break;
      case 3:
        this.updateRaeCompetences();
        break;
    }
  }

  updateSubCoreNif() {
    if (this.formSubCore.invalid) {
      this.alertService.showErrorMessage({ message: 'Formulario principal inválido' });

      return;
    }
    const pyload = this.getSubjectRequestRQ();
    this.workflowService.updateCurriculumNif(this.subCoreIdEdit || 0, pyload).subscribe({
      next: () => {
        this.alertService.showSuccessMessage({
          message: 'Subnúcleo actuaizado con éxito',
        });
        this.loadDataSubCore();
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  updateSyllabusNif() {
    if (this.formSyllabus.invalid) {
      this.alertService.showErrorMessage({
        message: 'Formulario Syllabus inválido, asegurese de llenar todos los campos obligatorios',
      });
      return;
    }

    const pyload = this.getSyllabusRQ();
    this.workflowService.updateSyllabusNif(this.subCoreSyllabusData.syllabusId, pyload).subscribe({
      next: () => {
        this.alertService.showSuccessMessage({
          message: 'Syllabus actualizado con éxito',
        });
        this.loadDataSyllabusForm();
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  updateSubjetGuideNif() {
    if (this.formSubjectGuide.invalid) {
      this.alertService.showErrorMessage({
        message: 'Formulario Guía de asignatura inválido, asegurese de llenar todos los campos',
      });
      return;
    }

    const pyload = this.getSubjectGuideRQ();
    this.workflowService.updateSubjetGuideNif(this.subCoreIdEdit || 0, pyload).subscribe({
      next: () => {
        this.alertService.showSuccessMessage({
          message: 'Guía de asignatura actualizada con éxito',
        });
        this.loadSubjectGuideForm();
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  updateRaeCompetences() {
    let pyload = {};
    if (this.activeIndex === 2) {
      if (!this.contentRAE || this.contentRAE?.trim() === '') {
        this.alertService.showErrorMessage({ message: 'Formulario RAE inválido' });
        return;
      }

      if (this.contentRAE.length > this.lengthContentRAE) {
        this.alertService.showErrorMessage({
          message: `El texto límite para RAE es de ${this.lengthContentRAE} caracteres`,
        });
        return;
      }

      pyload = {
        competences: null,
        rae: this.contentRAE || '',
      };
    } else {
      if (!this.contentCompetences || this.contentCompetences?.trim() === '') {
        this.alertService.showErrorMessage({ message: 'Formulario Competencias inválido' });
        return;
      }

      if (this.contentCompetences.length > this.lengthContentCompetences) {
        this.alertService.showErrorMessage({
          message: `El texto límite para Compatencias es de ${this.lengthContentCompetences} caracteres`,
        });
        return;
      }

      pyload = {
        competences: this.contentCompetences || '',
        rae: null,
      };
    }

    this.workflowService
      .updateCurriculumComplementaryNifs(this.subCoreIdEdit || 0, pyload)
      .subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message:
              this.activeIndex === 2
                ? 'RAE actualizada con éxito'
                : 'Competencias actualizada con éxito',
          });
          this.loadDataSubCore();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }
}
