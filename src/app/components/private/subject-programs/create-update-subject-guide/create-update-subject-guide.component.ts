/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { Program } from 'src/models/program.interface';
import { IActivityRequest } from 'src/models/workflow.interface';

@Component({
  selector: 'app-create-update-subject-guide',
  templateUrl: './create-update-subject-guide.component.html',
  styleUrls: ['./create-update-subject-guide.component.scss'],
})
export class CreateUpdateSubjectGuideComponent implements OnInit, OnDestroy {
  curriculumId?: number;
  subjectGuideId?: number;
  typeAction = 0;
  subjectGuideData?: any;
  preloadData?: any;
  activityRequestList: IActivityRequest[] = [];
  activityPassList: any[] = [];

  levelFormation: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  faculties: CatalogsByIdResponse[] = [];
  subjectType: CatalogsByIdResponse[] = [];

  programsSubjectGuide: Program[] = [];

  userId = '';
  role = 0;
  roleType = Role;
  routerApp = RoutesApp;
  visibleAddActivity = false;

  isView = false;
  typeActivity?: string = '';
  visibleOptActivity = false;
  visibleAddExistActivity = false;
  coordinadorId?: string;
  teacherId?: string;
  idRenovationSubjectGuide = 0;
  requestTeacherId?: string;

  formSubjectGuide: FormGroup = new FormGroup({
    core: new FormControl({ value: '', disabled: false }),
    subCore: new FormControl(''),
    subjectCode: new FormControl(''),
    creditNumber: new FormControl(''),
    hourInteractionTeacher: new FormControl(''),
    hourSelfWork: new FormControl(''),
    academicPeriod: new FormControl('', [Validators.required]),
    approvedDate: new FormControl('', [Validators.required]),
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

  formAddActivityGuide: FormGroup = new FormGroup({
    session: new FormControl('', [Validators.required]),
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

  constructor(
    private workflowService: WorkflowService,
    private programsService: ProgramsService,
    private catalogsService: CatalogsService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private alertService: AlertService,
    private utilService: UtilsService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    localStorage.removeItem('guideObj');
  }

  async ngOnInit() {
    this.role = this.loginService.getRole();
    this.userId = this.loginService.getEmail();
    if (this.role !== this.roleType.DOCENTE_COORDINADOR) {
      this.isView = true;
    }
    await this.loadSelectsData();
    this.loadDataInitial();
  }

  get formSubjectGuideFormControls() {
    return this.formSubjectGuide.controls;
  }

  async loadSelectsData() {
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

  loadProgramsSyllabus() {
    this.programsSubjectGuide = [];
    this.formSubjectGuideFormControls['programIds'].setValue(null);
    const facultyIds = this.formSubjectGuideFormControls['facultyIds']?.value?.catalogItemId;
    if (facultyIds) {
      this.programsService.getProgramByFaculties([facultyIds] || []).subscribe((response) => {
        this.programsSubjectGuide = response.data;
      });
    }
  }

  loadDataInitial() {
    const guideObj = localStorage.getItem('guideObj');

    if (guideObj) {
      const subjectGuide = JSON.parse(guideObj);
      this.typeAction = subjectGuide.type;
      this.curriculumId = subjectGuide.curriculumId;
      this.subjectGuideId = subjectGuide.subjectGuideId ? subjectGuide.subjectGuideId : 0;
      this.coordinadorId = subjectGuide?.coordinadorId?.toString();
      this.teacherId = subjectGuide.teacherId?.toString();
      this.idRenovationSubjectGuide = subjectGuide.idRenovationSubjectGuide
        ? subjectGuide.idRenovationSubjectGuide
        : 0;
      this.requestTeacherId = subjectGuide?.requestTeacherId;

      this.loadSubjectGuideForm();
      this.loadPreloadDataSubjectGuide();
    }
  }

  getArrayIdsCatalogsItems(array: any[]): number[] {
    return array.map((item) => {
      return Number(item.catalogItemId.toString());
    });
  }

  getNamesByFormFieldArray(field: string): string {
    const array = this.formSubjectGuideFormControls[field].value;

    if (array?.length === 0) {
      return '';
    }
    const names = array?.map((item: any) => {
      return item.catalogItemName.toString();
    });

    if (!names || names?.length === 0) {
      return '';
    }

    return names.join(', ');
  }

  getCatalogItemName(field: string): string {
    const name = this.formSubjectGuideFormControls[field].value?.catalogItemName;
    if (!name || name?.length === 0) {
      return '';
    }
    return name;
  }

  getProgramName(field: string): string {
    const name = this.formSubjectGuideFormControls[field].value?.name;
    if (!name || name?.length === 0) {
      return '';
    }
    return name;
  }

  loadPreloadDataSubjectGuide() {
    this.workflowService
      .getPreloadDataSubjectGuideData(this.curriculumId || 0)
      .subscribe((response) => {
        const { data } = response;

        this.preloadData = data;

        this.formSubjectGuideFormControls['core'].setValue(data?.core);
        this.formSubjectGuideFormControls['subCore'].setValue(data?.subCore);
        this.formSubjectGuideFormControls['subjectCode'].setValue(data?.subjectCode);
        this.formSubjectGuideFormControls['creditNumber'].setValue(data?.creditNumber);
        this.formSubjectGuideFormControls['hourInteractionTeacher'].setValue(
          data?.hourInteractionTeacher,
        );
        this.formSubjectGuideFormControls['hourSelfWork'].setValue(data?.hourSelfWork);

        if (this.typeAction === 1) {
          const campusIds: any[] = [];
          for (let i = 0; i < this.campus.length; i++) {
            const item = this.campus[i];
            if (data?.campusIds?.includes(item?.catalogItemId)) {
              campusIds.push(item);
            }
          }
          this.formSubjectGuideFormControls['campusIds'].setValue(campusIds);

          const modalityIds: any[] = [];
          for (let i = 0; i < this.modality.length; i++) {
            const item = this.modality[i];
            if (data?.modalityIds?.includes(item?.catalogItemId)) {
              modalityIds.push(item);
            }
          }
          this.formSubjectGuideFormControls['modalityIds'].setValue(modalityIds);

          const facultyIdsObj = this.faculties.find(
            (item) => item.catalogItemId == data?.facultyIds,
          );
          this.formSubjectGuideFormControls['facultyIds'].setValue(facultyIdsObj);

          this.programsSubjectGuide = [];
          this.programsService.getProgramByFaculties([data?.facultyIds]).subscribe((response) => {
            this.programsSubjectGuide = response.data;
            const programIdsObj = this.programsSubjectGuide.find(
              (item) => item.idProgram == data?.programIds,
            );
            this.formSubjectGuideFormControls['programIds'].setValue(programIdsObj);
          });
        }
      });
  }

  loadSubjectGuideForm() {
    let teacher: any = null;
    if (this.role === this.roleType.DOCENTE_BASICO) {
      teacher = this.userId;
    }

    if (this.typeAction === 5 && this.role === this.roleType.DIRECTOR) {
      teacher = this.teacherId;
    }

    const pyload = {
      createdBy: null,
      roleId: null,
      teacher: teacher,
    };

    this.workflowService
      .getSubjectGuideData(this.curriculumId ?? 0, pyload)
      .subscribe((response) => {
        const { data } = response;

        this.subjectGuideData = data;
        this.activityRequestList = data?.activityRequestList ?? [];

        const approvedDate = data?.approvedDate ? new Date(data?.approvedDate) : new Date();
        this.formSubjectGuideFormControls['academicPeriod'].setValue(data?.academicPeriod);
        this.formSubjectGuideFormControls['approvedDate'].setValue(approvedDate);
        this.formSubjectGuideFormControls['attendance'].setValue(data?.attendance);
        this.formSubjectGuideFormControls['bibliographyBasic'].setValue(data?.bibliographyBasic);
        this.formSubjectGuideFormControls['bibliographyLanguage'].setValue(
          data?.bibliographyLanguage,
        );
        this.formSubjectGuideFormControls['bibliographyWeb'].setValue(data?.bibliographyWeb);

        const campusIds: any[] = [];
        for (let i = 0; i < this.campus.length; i++) {
          const item = this.campus[i];
          if (data?.campusIds?.includes(item?.catalogItemId)) {
            campusIds.push(item);
          }
        }
        this.formSubjectGuideFormControls['campusIds'].setValue(campusIds);
        this.formSubjectGuideFormControls['coreConformation'].setValue(data?.coreConformation);
        this.formSubjectGuideFormControls['coreContext'].setValue(data?.coreContext);
        this.formSubjectGuideFormControls['coreDescription'].setValue(data?.coreDescription);
        this.formSubjectGuideFormControls['courseSchedule'].setValue(data?.courseSchedule);
        this.formSubjectGuideFormControls['evaluationDescription'].setValue(
          data?.evaluationDescription,
        );
        this.formSubjectGuideFormControls['evaluationSystem'].setValue(data?.evaluationSystem);

        const facultyIds: any[] = [];
        for (let i = 0; i < this.faculties.length; i++) {
          const item = this.faculties[i];
          if (data?.facultyIds?.includes(item?.catalogItemId)) {
            facultyIds.push(item);
          }
        }

        const facultyIdSelect = facultyIds.length > 0 ? facultyIds[0] : null;
        this.formSubjectGuideFormControls['facultyIds'].setValue(facultyIdSelect);
        this.formSubjectGuideFormControls['generalContent'].setValue(data?.generalContent);
        this.formSubjectGuideFormControls['guideCode'].setValue(data?.guideCode);
        this.formSubjectGuideFormControls['hoursFreelanceWork'].setValue(data?.hoursFreelanceWork);
        this.formSubjectGuideFormControls['hoursTeacherDirectWork'].setValue(
          data?.hoursTeacherDirectWork,
        );
        this.formSubjectGuideFormControls['learningGeneral'].setValue(data?.learningGeneral);
        this.formSubjectGuideFormControls['learningSpecific'].setValue(data?.learningSpecific);

        const modalityObj = this.modality.find((item) => item.catalogItemId == data?.modality);
        this.formSubjectGuideFormControls['modality'].setValue(modalityObj);

        const modalityIds: any[] = [];
        for (let i = 0; i < this.modality.length; i++) {
          const item = this.modality[i];
          if (data?.modalityIds?.includes(item?.catalogItemId)) {
            modalityIds.push(item);
          }
        }
        this.formSubjectGuideFormControls['modalityIds'].setValue(modalityIds);
        this.formSubjectGuideFormControls['monitorEmail'].setValue(data?.monitorEmail);
        this.formSubjectGuideFormControls['monitorName'].setValue(data?.monitorName);
        this.formSubjectGuideFormControls['monitorScheduleOperation'].setValue(
          data?.monitorScheduleOperation,
        );
        this.formSubjectGuideFormControls['prerrequisites'].setValue(data?.prerrequisites);
        this.formSubjectGuideFormControls['rating'].setValue(data?.rating);
        this.formSubjectGuideFormControls['strategies'].setValue(data?.strategies);
        this.formSubjectGuideFormControls['studentAcademicWork'].setValue(
          data?.studentAcademicWork,
        );
        this.formSubjectGuideFormControls['syncAsyncWork'].setValue(data?.syncAsyncWork);
        this.formSubjectGuideFormControls['teacherEmail'].setValue(data?.teacherEmail);
        this.formSubjectGuideFormControls['teacherName'].setValue(data?.teacherName);
        this.formSubjectGuideFormControls['teacherProfile'].setValue(data?.teacherProfile);
        this.formSubjectGuideFormControls['teacherScheduleOperation'].setValue(
          data?.teacherScheduleOperation,
        );
        this.formSubjectGuide.updateValueAndValidity();

        this.programsSubjectGuide = [];
        if (data?.facultyIds) {
          this.programsService.getProgramByFaculties(data?.facultyIds).subscribe((response) => {
            this.programsSubjectGuide = response.data;
            const programIds: any[] = [];
            for (let i = 0; i < this.programsSubjectGuide.length; i++) {
              const item = this.programsSubjectGuide[i];
              if (data?.programIds?.includes(item?.idProgram)) {
                programIds.push(item);
              }
            }
            const programSelect = programIds.length > 0 ? programIds[0] : null;
            this.formSubjectGuideFormControls['programIds'].setValue(programSelect);
            this.formSubjectGuide.updateValueAndValidity();
          });
        }
      });
  }

  getSubjectGuideRQ() {
    const approvedDate = new Date(this.formSubjectGuideFormControls['approvedDate']?.value);

    const facultyIds = [
      Number(this.formSubjectGuideFormControls['facultyIds']?.value?.catalogItemId),
    ];
    const programIds = [Number(this.formSubjectGuideFormControls['programIds']?.value?.idProgram)];

    const campusIds = this.getArrayIdsCatalogsItems(
      this.formSubjectGuideFormControls['campusIds']?.value,
    );
    const modalityIds = this.getArrayIdsCatalogsItems(
      this.formSubjectGuideFormControls['modalityIds']?.value,
    );

    return {
      academicPeriod: this.formSubjectGuideFormControls['academicPeriod']?.value?.toString(),
      activityRequestList: this.activityRequestList,
      approvedDate: approvedDate,
      attendance: this.formSubjectGuideFormControls['attendance']?.value?.toString(),
      bibliographyBasic: this.formSubjectGuideFormControls['bibliographyBasic']?.value?.toString(),
      bibliographyLanguage:
        this.formSubjectGuideFormControls['bibliographyLanguage']?.value?.toString(),
      bibliographyWeb: this.formSubjectGuideFormControls['bibliographyWeb']?.value?.toString(),
      campusIds: campusIds,
      coreConformation: this.formSubjectGuideFormControls['coreConformation']?.value?.toString(),
      coreContext: this.formSubjectGuideFormControls['coreContext']?.value?.toString(),
      coreDescription: this.formSubjectGuideFormControls['coreDescription']?.value?.toString(),
      courseSchedule: this.formSubjectGuideFormControls['courseSchedule']?.value?.toString(),
      createdBy:
        this.subjectGuideData && this.subjectGuideData?.createdBy != null
          ? this.subjectGuideData?.createdBy
          : '',
      evaluationDescription:
        this.formSubjectGuideFormControls['evaluationDescription']?.value?.toString(),
      evaluationSystem: this.formSubjectGuideFormControls['evaluationSystem']?.value?.toString(),
      facultyIds: facultyIds,
      generalContent: this.formSubjectGuideFormControls['generalContent']?.value?.toString(),
      guideCode: this.formSubjectGuideFormControls['guideCode']?.value?.toString(),
      hoursFreelanceWork: Number(this.formSubjectGuideFormControls['hoursFreelanceWork']?.value),
      hoursTeacherDirectWork: Number(
        this.formSubjectGuideFormControls['hoursTeacherDirectWork']?.value,
      ),
      learningGeneral: this.formSubjectGuideFormControls['learningGeneral']?.value?.toString(),
      learningSpecific: this.formSubjectGuideFormControls['learningSpecific']?.value?.toString(),
      modality: Number(this.formSubjectGuideFormControls['modality']?.value?.catalogItemId),
      modalityIds: modalityIds,
      monitorEmail: this.formSubjectGuideFormControls['monitorEmail']?.value?.toString(),
      monitorName: this.formSubjectGuideFormControls['monitorName']?.value?.toString(),
      monitorScheduleOperation:
        this.formSubjectGuideFormControls['monitorScheduleOperation']?.value?.toString(),
      prerrequisites: this.formSubjectGuideFormControls['prerrequisites']?.value?.toString(),
      programIds: programIds,
      rating: this.formSubjectGuideFormControls['rating']?.value?.toString(),
      roleId:
        this.subjectGuideData && this.subjectGuideData?.roleId !== null
          ? this.subjectGuideData?.roleId
          : 0,
      strategies: this.formSubjectGuideFormControls['strategies']?.value?.toString(),
      studentAcademicWork:
        this.formSubjectGuideFormControls['studentAcademicWork']?.value?.toString(),
      subjectCode: this.formSubjectGuideFormControls['subjectCode']?.value?.toString(),
      subjectGuideId:
        this.subjectGuideData && this.subjectGuideData?.subjectGuideId != null
          ? this.subjectGuideData?.subjectGuideId
          : 0,
      syncAsyncWork: this.formSubjectGuideFormControls['syncAsyncWork']?.value?.toString(),
      teacherEmail: this.formSubjectGuideFormControls['teacherEmail']?.value?.toString(),
      teacherName: this.formSubjectGuideFormControls['teacherName']?.value?.toString(),
      teacherProfile: this.formSubjectGuideFormControls['teacherProfile']?.value?.toString(),
      teacherScheduleOperation:
        this.formSubjectGuideFormControls['teacherScheduleOperation']?.value?.toString(),
    };
  }

  openOptActivityGuide() {
    this.typeActivity = '';
    this.visibleOptActivity = true;
  }

  closeOptActivityGuide(typeActivity?: any) {
    this.visibleOptActivity = false;
    if (typeActivity === '1') {
      this.openAddActivityGuide();
    }

    if (typeActivity === '2') {
      this.openAddExistActivity();
    }
  }

  openAddExistActivity() {
    this.visibleAddExistActivity = true;
    this.getActivitySubjectGuide();
  }

  closeAddExistActivity() {
    this.typeActivity = '';
    this.visibleAddExistActivity = true;
  }

  openAddActivityGuide() {
    this.formAddActivityGuide.reset();
    this.formAddActivityGuide.controls['canUpdate']?.setValue(true);
    this.formAddActivityGuide.controls['createdBy']?.setValue(this.userId);
    this.formAddActivityGuide.controls['enabled']?.setValue(true);
    this.formAddActivityGuide.controls['subjectActivityId']?.setValue(0);
    this.formAddActivityGuide.updateValueAndValidity();
    this.visibleAddActivity = true;
  }

  openEditAddActivityGuide(activity: any) {
    this.formAddActivityGuide.reset();
    this.formAddActivityGuide.controls['subjectActivityId']?.setValue(activity?.subjectActivityId);
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
      this.workflowService.createSubjetGuideActivity(this.subjectGuideId || 0, [pyload]).subscribe({
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
  }

  deleteActivityGuideRequest(activity: any, index: number) {
    if (this.subjectGuideData?.subjectGuideId) {
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
    this.typeActivity = '';
    this.formAddActivityGuide.reset();
    this.formAddActivityGuide.updateValueAndValidity();
    this.visibleAddActivity = false;
  }

  createUpdateSubjetGuide() {
    if (this.formSubjectGuide.invalid) {
      this.formSubjectGuide.markAllAsTouched();
      this.alertService.showErrorMessage({
        message: 'Formulario Guía de asignatura inválido, asegúrese de llenar todos los campos',
      });
      return;
    }

    const pyload = this.getSubjectGuideRQ();

    if (this.subjectGuideId && this.subjectGuideId !== 0) {
      this.workflowService.updateSubjetGuideNif(this.curriculumId || 0, pyload).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Guía de asignatura actualizada con éxito',
          });

          if (this.typeAction === 2) {
            this.evaluatedSubjectGuide('review');
          }
          if (this.typeAction === 6) {
            this.evaluatedRenovationSubject('done');
          }
          this.router.navigate([`${RoutesApp.SUBJECT_PROGRAMS}`]);
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    } else {
      this.workflowService.createSubjetGuide(this.curriculumId || 0, pyload).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Guía de asignatura creada con éxito',
          });
          this.router.navigate([`${RoutesApp.SUBJECT_PROGRAMS}`]);
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

  evaluatedSubjectGuide(type: string) {
    const userId =
      this.coordinadorId && this.coordinadorId != ''
        ? this.coordinadorId
        : this.subjectGuideData?.createdBy;
    const pyload = {
      createdBy: this.userId,
      feedbackStatus: type,
      roleId: this.role,
      userId: userId,
    };

    this.workflowService.evaluateSubjectGuide(this.subjectGuideId || 0, pyload).subscribe({
      next: () => {
        if (this.typeAction !== 2) {
          this.alertService.showSuccessMessage({
            message: 'Evaluación realizada con éxito',
          });
        }
        this.router.navigate([`${RoutesApp.SUBJECT_PROGRAMS}`]);
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  evaluatedActivity(type: string) {
    const userId = this.teacherId && this.teacherId != '' ? this.teacherId : this.userId;
    const pyload = {
      createdBy: this.userId,
      feedbackStatus: type,
      roleId: this.role,
      userId: userId,
    };

    this.workflowService.evaluateActivitySubjectGuide(this.subjectGuideId || 0, pyload).subscribe({
      next: () => {
        this.alertService.showSuccessMessage({
          message: 'Evaluación realizada con éxito',
        });
        this.router.navigate([`${RoutesApp.SUBJECT_PROGRAMS}`]);
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  getActivitySubjectGuide() {
    const pyload = {
      createdBy: null,
      roleId: null,
      teacher: this.userId,
    };

    this.workflowService
      .getPastActivitiesSubjectGuide(this.subjectGuideData.subjectGuideId || 0, pyload)
      .subscribe({
        next: (response) => {
          this.activityPassList = response.data;
          if (response.data.length === 0) {
            this.alertService.showInfoMessage({ message: 'No existen actividades pasadas' });
          }
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error al consultar actividades',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  saveAddExistActivity() {
    const selectPassActivity = this.activityPassList
      .filter((item) => item.check === true)
      .map((element: any) => {
        return {
          activityId: element?.subjectActivityId,
          createdBy: this.userId,
          linkMoodle: element.url,
        };
      });

    if (selectPassActivity.length === 0) {
      this.alertService.showErrorMessage({ message: 'Debe seleccionar al menos una actividad' });
      return;
    }

    this.workflowService
      .addPastActivityToCurrentPeriod(this.subjectGuideId || 0, selectPassActivity)
      .subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Actividades agregadas con éxito',
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

  evaluatedRenovationSubject(type: string) {
    const pyload = {
      createdBy: this.userId,
      feedbackStatus: type,
      roleId: this.role,
      userId: this.requestTeacherId,
    };

    this.workflowService
      .evaluateRenovationSubjectGuide(this.idRenovationSubjectGuide || 0, pyload)
      .subscribe({
        next: () => {
          this.router.navigate([`${RoutesApp.SUBJECT_PROGRAMS}`]);
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
