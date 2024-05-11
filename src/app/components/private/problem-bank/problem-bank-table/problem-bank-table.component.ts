/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProblemBankService } from 'src/app/services/problem-bank/problem-bank.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { StatusProblem } from 'src/enums/status-problem.enums';
import { ICatalogItem } from 'src/models/catalogs.interface';
import { PreviewDocument } from 'src/models/preview-document.interface';
import {
  ICompetence,
  ICreatedProblem,
  IFeedbackProblem,
  IProblemBank,
  ISearchProblemList,
} from 'src/models/problem-bank.interface';
import { SemesterModel } from 'src/models/workflow.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { Role } from 'src/enums/role.enum';
import { Program } from 'src/models/program.interface';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { SettingEnum } from 'src/enums/setting.enum';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-problem-bank-table',
  templateUrl: './problem-bank-table.component.html',
  styleUrls: ['./problem-bank-table.component.scss'],
})
export class ProblemBankTableComponent implements OnInit {
  @Input() nif = false;
  @Input() idProgram!: number | null;
  buscador = '';
  programs: Program[] = [];
  problemBankList: IProblemBank[] = [];
  filteredList: IProblemBank[] = [];
  activeItem: IProblemBank | null = null;
  listAbility: ICatalogItem[] = [];
  listStatus: ICatalogItem[] = [];
  competenciesList: ICompetence[] = [];
  competenciesListBackup: ICompetence[] = [];
  fileName = '';
  documentBase64 = '';
  objSemesterList: SemesterModel[] = [];
  competenciesSelect: ICompetence[] = [];
  itemCompetenciesSelect!: ICatalogItem;
  visible = false;
  visibleView = false;
  btnAction = false;
  showDataCompetencies = false;
  dialogConfirmDisabled = false;
  activeHtml = false;
  formCreate: FormGroup = new FormGroup({
    semester: new FormControl('', [Validators.required]),
    subnucleo: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
  });
  html = '';
  htmlEvaluate = '';
  visiblePdf = false;
  previewDocument?: PreviewDocument;
  statusProblem = StatusProblem;
  allowedExtension = '';
  allowedFileSize = 0;

  role = 0;
  RoleEnum = Role;
  get formControls() {
    return this.formCreate.controls;
  }

  constructor(
    private problemService: ProblemBankService,
    private programsService: ProgramsService,
    private workflowService: WorkflowService,
    private utilsService: UtilsService,
    private catalogsService: CatalogsService,
    private alertService: AlertService,
    private loginService: LoginService,
    private configService: ConfigService,
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.loadAbility();
    this.loadStatusProblem();
    this.loadDataPlan();
    this.loadProblemList();

    if (this.nif) {
      this.formCreate.controls['subnucleo'].clearValidators();
      this.formCreate.updateValueAndValidity();
    }
    this.resetAll();
    this.getAllowedExtension();
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  getRole() {
    this.role = this.loginService.getRole();
    if (this.role === Role.ESTUDIANTE) {
      const programs = this.loginService.getProgram();
      const idPrograms = Array.isArray(programs) ? programs : [];
      idPrograms.forEach((element) => {
        this.programsService.getProgram(element).subscribe((response) => {
          const { data } = response;
          this.programs.push(data);
        });
      });
    }
  }

  resetAll() {
    this.formCreate.reset();
    this.html = '';
    this.htmlEvaluate = '';
    this.documentBase64 = '';
    this.fileName = '';
    this.competenciesList = [];
    this.activeItem = null;
  }

  loadProblemList() {
    if (!this.idProgram && !this.nif) return;
    const programId = this.idProgram ? [this.idProgram] : [];
    const payload: ISearchProblemList = {
      programId: programId,
      roleId: null,
      semester: null,
      problem: null,
    };
    if (this.nif) {
      this.problemService.getProblemBankNif(payload).subscribe((response) => {
        this.problemBankList = response.data;
        this.filteredList = this.problemBankList;
      });
    } else {
      this.problemService.getProblemBank(payload).subscribe((response) => {
        this.problemBankList = response.data;
        this.filteredList = this.problemBankList;
      });
    }
  }

  loadDataPlan() {
    if (this.nif) {
      this.objSemesterList = [
        { semesterNumber: 1, semesterRoman: 'I', subjectListModel: null },
        { semesterNumber: 2, semesterRoman: 'II', subjectListModel: null },
        { semesterNumber: 3, semesterRoman: 'III', subjectListModel: null },
        { semesterNumber: 4, semesterRoman: 'IV', subjectListModel: null },
        { semesterNumber: 5, semesterRoman: 'V', subjectListModel: null },
      ];
    }
    if (!this.idProgram) return;
    this.workflowService
      .getCurriculumStudent(this.idProgram.toString())
      .subscribe((response) => (this.objSemesterList = response.data.semesterList));
  }

  createHtml($event: string) {
    this.html = $event;
  }

  createHtmlEvaluate($event: string) {
    this.htmlEvaluate = $event;
  }

  activeNewProblem() {
    this.resetAll();
    this.showDataCompetencies = false;
    this.visible = true;
    this.activeHtml = false;
    setTimeout(() => {
      this.activeHtml = true;
    }, 10);
  }

  loadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (!this.allowedExtension.includes(fileExtension)) {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: `La extensión del archivo no está permitida. Actualmente solo se permiten archivos con las siguientes extensiones: ${this.allowedExtension}`,
        });
      } else {
        const fileSize = file.size;
        this.fileName = file.name;
        const maxSize = this.allowedFileSize * 1024 * 1024;
        if (fileSize > maxSize) {
          this.alertService.showErrorMessage({
            message: `Archivo supera el limite de ${this.allowedFileSize}MB`,
          });
          event.target.value = '';
        } else {
          this.convertToBase64(file);
        }
      }
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      const base64String = (event.target as FileReader).result;
      if (base64String) {
        this.documentBase64 = String(base64String);
      }
    };
    reader.readAsDataURL(file);
  }

  created() {
    this.formCreate.markAllAsTouched();
    if (this.formCreate.invalid || this.html === '') return;

    if (this.html === '') {
      this.alertService.showErrorMessage({ message: 'Descripción no diligenciada' });
      return;
    }
    if (!this.activeItem && (!this.documentBase64 || this.documentBase64 === '')) {
      this.alertService.showErrorMessage({ message: 'No hay documento adjunto' });
      return;
    }

    const numCompetences = this.competenciesList
      .filter((competence) => competence.start === true)
      .map((competence) => competence.competenceId);
    if (numCompetences.length === 0) {
      this.alertService.showErrorMessage({ message: 'No se seleccionaron competencias' });
      return;
    }

    const payload: ICreatedProblem = {
      roleId: null,
      createdBy: null,
      curriculumId: this.nif ? null : this.formCreate.controls['subnucleo'].value.subjectId, // subnucleo
      linkMoodle: this.formCreate.controls['link'].value,
      semester: this.formCreate.controls['semester'].value.semesterNumber,
      description: this.html,
      tittle: this.formCreate.controls['title'].value,
      file:
        this.documentBase64 === ''
          ? null
          : {
              fileContent: this.utilsService.getBase64File(this.documentBase64 ?? ''),
              fileExtension: this.utilsService.getBase64FileExtension(this.documentBase64 ?? ''),
            },
      competences: numCompetences,
    };

    const saveOrUpdateProblem = this.activeItem
      ? this.problemService.updateProblemBank(payload, this.activeItem.problemBankId)
      : this.problemService.saveProblemBank(payload);

    saveOrUpdateProblem
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          this.visible = false;
          this.ngOnInit();
        }),
      )
      .subscribe();
  }

  searchByDescriptionAndTitle(searchTerm: string): void {
    if (searchTerm === '') {
      this.filteredList = this.problemBankList;
    } else {
      this.filteredList = this.problemBankList.filter(
        (item) =>
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tittle.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
  }

  loadAbility() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.ABILITY).subscribe((response) => {
      this.listAbility = response.data.map((item) => ({ ...item, value: true }));
      this.loadCompetencies();
    });
  }

  loadStatusProblem() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.STATUS_PROBLEM).subscribe((response) => {
      this.listStatus = response.data.map((item) => ({ ...item, value: true }));
    });
  }

  loadCompetencies() {
    this.problemService.getCompetences(this.nif).subscribe((response) => {
      this.competenciesList = this.nameAbility(response.data);
      this.groupByCategory();
    });
  }

  nameAbility(competences: ICompetence[]) {
    return competences.map((competence) => {
      const matchingCatalogItem = this.listAbility.find(
        (catalogItem) => catalogItem.catalogItemId === competence.categoryId,
      );
      if (matchingCatalogItem) {
        return { ...competence, categoryName: matchingCatalogItem.catalogItemName };
      }
      return competence;
    });
  }

  groupByCategory() {
    this.competenciesList.sort((a, b) => a.categoryId - b.categoryId);
    let currentCategoryId: number | null = null;
    for (const competence of this.competenciesList) {
      if (currentCategoryId !== competence.categoryId) {
        currentCategoryId = competence.categoryId;
        competence.countCategory = this.competenciesList.filter(
          (obj) => obj.categoryId === currentCategoryId,
        ).length;
      }
    }
    this.competenciesListBackup = this.competenciesList;
  }

  showCompetencies(value: boolean) {
    this.showDataCompetencies = value;
  }

  onDropdownChange() {
    if (!this.itemCompetenciesSelect) return;
    this.competenciesList = this.competenciesListBackup.filter(
      (obj) => obj.categoryId === this.itemCompetenciesSelect.catalogItemId,
    );
  }

  disabledProgram(item: IProblemBank) {
    this.activeItem = item;
    if (item.enabled) {
      this.checkDisabledProgram(true);
    } else {
      this.dialogConfirmDisabled = true;
    }
  }

  checkDisabledProgram(value: boolean) {
    if (value && this.activeItem) {
      this.problemService
        .disabledProblemBank(this.activeItem.problemBankId, this.activeItem.enabled)
        .pipe(
          catchError(() => of(null)),
          finalize(() => this.handleSuccess()),
        )
        .subscribe();
    } else {
      this.handleFailure();
    }
  }

  handleSuccess(): void {
    this.dialogConfirmDisabled = false;
    this.activeItem = null;
    this.loadProblemList();
  }

  handleFailure(): void {
    this.dialogConfirmDisabled = false;
    this.loadProblemList();
  }

  editProblem(item: IProblemBank) {
    this.activeItem = item;
    const semesterItem = this.objSemesterList.find((obj) => obj.semesterNumber === item.semester);
    this.formCreate.controls['semester'].setValue(semesterItem);
    if (semesterItem && semesterItem.subjectListModel)
      this.formCreate.controls['subnucleo'].setValue(
        semesterItem.subjectListModel.find((obj) => obj.subjectId === item.subjectId),
      );
    this.formCreate.controls['title'].setValue(item.tittle);
    this.formCreate.controls['link'].setValue(item.linkMoodle);
    this.html = item.description;
    this.fileName = item.file;

    const findAbility = this.listAbility.find(
      (obj) => obj.catalogItemId === item.competences[0].categoryId,
    );
    if (findAbility) {
      this.itemCompetenciesSelect = findAbility;
      this.onDropdownChange();
    }
    this.competenciesList.map((obj) => {
      const find = item.competences.find((i) => i.competenceId === obj.competenceId);
      obj.start = !!find;
    });
    this.visible = true;
    this.activeHtml = false;
    setTimeout(() => {
      this.activeHtml = true;
    }, 10);
  }

  viewProblem(item: IProblemBank, action: boolean) {
    if (action) {
      if (
        (item.statusId === this.statusProblem.REQUEST_SENT ||
          item.statusId === this.statusProblem.DEACTIVATION_REQUEST_SENT) &&
        this.role !== Role.DECANO
      ) {
        return;
      }
    }

    this.btnAction = action;
    this.activeItem = item;
    this.fileName = item.file;
    const findAbility = this.listAbility.find(
      (obj) => obj.catalogItemId === item.competences[0].categoryId,
    );
    if (findAbility) {
      this.itemCompetenciesSelect = findAbility;
      this.onDropdownChange();
    }
    this.visibleView = true;
  }

  closeModal($event: boolean) {
    this.visiblePdf = $event;
  }

  viewDocument(url: string) {
    this.previewDocument = {
      url: url,
      type: this.utilsService.getFileExtension(url),
    };
    this.visiblePdf = true;
  }

  downloadDocument(url: string) {
    window.open(url, 'blank');
  }

  evaluateProblem(value: string) {
    if (this.activeItem) {
      let feedback = null;
      if (this.activeItem.statusId === this.statusProblem.REQUEST_SENT) {
        if (this.htmlEvaluate === '') {
          this.alertService.showErrorMessage({ message: 'Comentario no diligenciado' });
          return;
        }
        feedback = this.htmlEvaluate;
      }
      const payload: IFeedbackProblem = {
        createdBy: null,
        evaluation: value,
        feedback: feedback,
        fileFeedback: null,
        roleId: null,
      };
      this.problemService
        .evaluateProblemBank(payload, this.activeItem.problemBankId)
        .subscribe(() => {
          const tempItem = this.activeItem;
          this.visibleView = false;
          this.ngOnInit();
          if (tempItem) this.viewProblem(tempItem, false);
        });
    }
  }

  formCurricularMonitoring: FormGroup = new FormGroup({
    programOpt: new FormControl('', [Validators.required]),
  });

  get formControlsPrograms() {
    return this.formCurricularMonitoring.controls;
  }

  selectProgram() {
    if (this.formControlsPrograms['programOpt'].value) {
      this.idProgram = this.formControlsPrograms['programOpt'].value.idProgram;
      setTimeout(() => {
        this.loadProblemList();
      }, 1000);
    }
  }
}
