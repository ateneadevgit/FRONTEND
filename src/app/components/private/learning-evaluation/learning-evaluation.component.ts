/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { SinuService } from 'src/app/services/sinu/sinu.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { INifTypeEnum } from 'src/enums/catalogs-items.enums';
import { Role } from 'src/enums/role.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { Program } from 'src/models/program.interface';
import { ICreateLearningAssessment, ILevelTypes } from 'src/models/workflow.interface';

@Component({
  selector: 'app-learning-evaluation',
  templateUrl: './learning-evaluation.component.html',
  styleUrls: ['./learning-evaluation.component.scss'],
})
export class LearningEvaluationComponent implements OnInit {
  treeNodeLearningEvaluationList: TreeNode[] = [];
  learningEvaluationList: any[] = [];
  learningEvaluationSelect: any[] = [];
  viewlearningEvaluationSelect?: any;

  programs: Program[] = [];
  levelList: ILevelTypes[] = [];

  selectProgram?: any;
  selectLevel?: any;
  programsEstudent: number[] = [];

  selectLearningAssessment?: any;
  selectCurriculum?: any;
  selectComplementaryEval?: any;
  selectViewLearningAssess?: any;

  visibleCurriculum = false;
  visibleViewLearnAssess = false;
  visibleCreateLevel = false;
  visibleUpdateLevel = false;

  nifTypeEnum = INifTypeEnum;
  roleType = Role;
  role = 0;
  typeView = 0;
  resetExpanded = false;

  fileName = '';
  documentBase64?: string;

  allowedExtension = '';
  allowedFileSize = 0;

  createUpdatePermissions = [
    this.roleType.DOCENTE_BASICO,
    this.roleType.DOCENTE_COORDINADOR,
    this.roleType.DOCENTE_COORDINADOR,
  ];

  fileRubrics = {
    fileContent: '',
    fileExtension: '',
  };

  formLearningAssessment = this.formBuilder.group({
    tittle: new FormControl('', [Validators.required]),
    urlMoodle: new FormControl('', [Validators.required]),
    evaluationMode: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    learningAssessmentId: new FormControl(0),
    createdBy: new FormControl(''),
  });

  formCurriculum = this.formBuilder.group({
    description: new FormControl('', [Validators.required]),
    curriculumId: new FormControl(0),
  });

  constructor(
    private workflowService: WorkflowService,
    private programsService: ProgramsService,
    private catalogsService: CatalogsService,
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    private alertService: AlertService,
    private utilsService: UtilsService,
    private sinuService: SinuService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private configService: ConfigService,
  ) {}

  async ngOnInit() {
    this.role = this.loginService.getRole();
    if (this.role === this.roleType.ESTUDIANTE || this.role === this.roleType.ESTUDIANTE) {
      this.programsEstudent = this.loginService.getProgram() || [];
      this.typeView = 1;
    }

    this.loadDataSelects();
    this.getAllowedExtension();
  }

  get formControls() {
    return this.formLearningAssessment.controls;
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  loadDataSelects() {
    this.programsService.getPrograms().subscribe((response) => {
      const { data } = response;
      this.programs = data;
      const programsDefault: any[] = [];
      if (this.role === this.roleType.ESTUDIANTE || this.role === this.roleType.ESTUDIANTE) {
        for (let i = 0; i < this.programs.length; i++) {
          const item = this.programs[i];
          if (this.programsEstudent?.includes(item?.idProgram)) {
            programsDefault.push(item);
          }
        }
        this.programs = programsDefault;
      }
    });
  }

  loadChangeProgram() {
    this.levelList = [];
    this.learningEvaluationList = [];
    this.selectLevel = undefined;
    if (this.selectProgram) {
      this.workflowService
        .getLevelsByProgram(this.selectProgram?.idProgram)
        .subscribe((response) => {
          const { data } = response;
          this.levelList = data;
        });
    }
  }

  loadLearningEvaluation() {
    if (this.selectProgram && this.selectLevel) {
      this.learningEvaluationList = [];
      this.resetExpanded = true;

      setTimeout(() => {
        this.resetExpanded = false;
      }, 100);
      this.workflowService
        .getCurriculumEvaluationByType(this.selectProgram?.idProgram, this.selectLevel?.type)
        .subscribe((response) => {
          const { data } = response;
          this.learningEvaluationList = data.map((item) => {
            return {
              ...item,
              expanded: false,
            };
          });

          this.getFileSystemNodesData();
        });
    }
  }

  getFileSystemNodesData() {
    this.treeNodeLearningEvaluationList = [];
    const currentStep = [...this.learningEvaluationList];
    const column: TreeNode[] = [];
    let index = 0;
    currentStep?.forEach((element) => {
      element.typeRow = 0;
      element.index = index;

      const child = {
        data: [],
      };

      const childrenSuject: TreeNode[] = [];
      childrenSuject.push(child);

      const nodeSubject: TreeNode = {
        data: element,
        children: childrenSuject,
      };

      column.push(nodeSubject);
      index++;
    });
    this.treeNodeLearningEvaluationList = column;
  }

  onNodeExpand($event: any) {
    if (!$event.dataList) {
      this.workflowService
        .getLearningAssessmentByCurriculumId($event.node?.data?.curriculumId)
        .subscribe((response) => {
          const { data } = response;
          // if (data.length === 0) {
          //   this.alertService.showInfoMessage({
          //     message: 'La asignatura selecciónada no cuenta con docentes',
          //   });
          //   return;
          // }

          const nodeData = { ...$event.node };
          nodeData.children = [
            {
              data: {
                ...$event.node?.data,
                dataList: data,
                typeRow: 1,
              },
            },
          ];

          if (this.treeNodeLearningEvaluationList) {
            for (let i = 0; i < this.treeNodeLearningEvaluationList.length; i++) {
              if (this.treeNodeLearningEvaluationList[i].data.index === $event.node?.data?.index) {
                this.treeNodeLearningEvaluationList[i] = nodeData;
              }
            }
            const dataArray = [...this.treeNodeLearningEvaluationList];
            this.treeNodeLearningEvaluationList = [];
            this.treeNodeLearningEvaluationList = dataArray;
          }
        });
    }
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
      const base64String = (<FileReader>event.target).result;
      if (base64String) {
        const documentBase64 = String(base64String);
        this.formControls.file.setValue(documentBase64);
      }
    };
    reader.readAsDataURL(file);
  }

  openCreateLevel(item: any) {
    this.selectCurriculum = item;
    this.visibleCreateLevel = true;
    this.formLearningAssessment.reset();
    this.fileName = '';
  }

  closeCreateLevel() {
    this.formLearningAssessment.reset();
    this.visibleCreateLevel = false;
    this.selectCurriculum = undefined;
    this.fileName = '';
  }

  openUpdateLevel(curriculum: any, item: any) {
    this.selectLearningAssessment = item;
    this.selectCurriculum = curriculum;
    this.formLearningAssessment.reset();
    this.formLearningAssessment.controls.tittle.setValue(this.selectLearningAssessment.tittle);
    this.formLearningAssessment.controls.evaluationMode.setValue(
      this.selectLearningAssessment.evaluationMode,
    );
    this.formLearningAssessment.controls.file.setValue(this.selectLearningAssessment.file);
    this.formLearningAssessment.controls.urlMoodle.setValue(
      this.selectLearningAssessment.urlMoodle,
    );
    this.formLearningAssessment.controls.learningAssessmentId.setValue(
      this.selectLearningAssessment.learningAssessmentId,
    );
    this.formLearningAssessment.controls.createdBy.setValue(
      this.selectLearningAssessment.createdBy,
    );
    this.visibleUpdateLevel = true;
    this.fileName = this.selectLearningAssessment.file;
  }

  closeUpdateLevel() {
    this.visibleUpdateLevel = false;
    this.formLearningAssessment.reset();
    this.selectLearningAssessment = undefined;
    this.selectCurriculum = undefined;
    this.fileName = '';
  }

  openCurriculum(item: any, isEdit: boolean) {
    this.selectCurriculum = { ...item };
    this.selectCurriculum.isEdit = isEdit;
    this.formCurriculum.reset();
    if (isEdit) {
      this.formCurriculum.controls.description.setValue(item.description);
    }
    this.formCurriculum.controls.curriculumId.setValue(item.curriculumId);
    this.visibleCurriculum = true;
  }

  closeCurriculum() {
    this.visibleCurriculum = false;
    this.formCurriculum.reset();
    this.selectCurriculum = undefined;
  }

  openViewLearnAssess(curriculm: any, item: any) {
    this.selectViewLearningAssess = item;
    this.selectViewLearningAssess = {
      ...item,
      curriculumName: curriculm?.tittle,
    };
    this.selectViewLearningAssess.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.selectViewLearningAssess.file,
    );
    this.visibleViewLearnAssess = true;
  }

  closeViewLearnAssess() {
    this.visibleViewLearnAssess = false;
    this.selectViewLearningAssess = undefined;
  }

  markAsTouchedFormLearnAss() {
    this.formControls.file.markAsTouched();
    this.formControls.urlMoodle.markAsTouched();
    this.formControls.tittle.markAsTouched();
    this.formControls.evaluationMode.markAsTouched();
  }

  /** start core */
  sendToCreateLevel() {
    if (this.formLearningAssessment.invalid) {
      this.markAsTouchedFormLearnAss();
      this.alertService.showErrorMessage({
        title: 'Formulario invalido',
        message: 'Asegurese de llenar todos los campos requeridos',
      });
      return;
    }

    const payload: ICreateLearningAssessment = {
      createdBy: '',
      evaluationMode: this.formControls.evaluationMode.value || '',
      file: {
        fileContent: this.utilsService.getBase64File(this.formControls.file.value ?? '') ?? '',
        fileExtension:
          this.utilsService.getBase64FileExtension(this.formControls.file.value ?? '') ?? '',
      },
      learningAssessmentId: 0,
      tittle: this.formControls.tittle.value || '',
      urlMoodle: this.formControls.urlMoodle.value || '',
    };

    this.workflowService
      .createLearningAssessment(this.selectCurriculum?.curriculumId, payload)
      .subscribe({
        next: () => {
          this.alertService.showInfoMessage({
            message: 'Evaluación de aprendizaje creada con éxito',
          });

          this.reloadLearningAssessment({ ...this.selectCurriculum });
          this.closeCreateLevel();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  sendToEditLevel() {
    if (this.formLearningAssessment.invalid) {
      this.markAsTouchedFormLearnAss();
      this.alertService.showErrorMessage({
        title: 'Formulario invalido',
        message: 'Asegurese de llenar todos los campos requeridos',
      });
      return;
    }

    let fileRubrics: any | null = null;
    if (this.selectLearningAssessment?.file !== this.formControls.file.value) {
      fileRubrics = {
        fileContent: this.utilsService.getBase64File(this.formControls.file.value ?? '') ?? '',
        fileExtension:
          this.utilsService.getBase64FileExtension(this.formControls.file.value ?? '') ?? '',
      };
    }

    const payload: ICreateLearningAssessment = {
      createdBy: this.formControls.createdBy.value || '',
      evaluationMode: this.formControls.evaluationMode.value || '',
      file: fileRubrics,
      learningAssessmentId: this.formControls.learningAssessmentId.value || 0,
      tittle: this.formControls.tittle.value || '',
      urlMoodle: this.formControls.urlMoodle.value || '',
    };

    this.workflowService
      .updateLearningAssessment(this.formControls.learningAssessmentId.value || 0, payload)
      .subscribe({
        next: () => {
          this.alertService.showInfoMessage({
            message: 'Evaluación de aprendizaje actualizada con éxito',
          });

          this.reloadLearningAssessment({ ...this.selectCurriculum });
          this.closeUpdateLevel();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  deleteLearningAssessment(curriculum: any, learningAssessment: any) {
    this.confirmationService.confirm({
      key: 'confirm-delete-dialog',
      message: '¿Esta seguro de eliminar la evaluación de aprendizaje?',
      header: 'Eliminar evaluación',
      accept: () => {
        this.workflowService
          .deleteLearningAssessment(learningAssessment?.learningAssessmentId || 0)
          .subscribe({
            next: () => {
              this.alertService.showInfoMessage({
                message: 'Evaluación de aprendizaje eliminada con éxito',
              });

              this.reloadLearningAssessment({ ...curriculum });
            },
            error: () => {
              this.alertService.showErrorMessage({
                title: 'Error',
                message: 'Inténtalo nuevamente',
              });
            },
          });
      },
    });
  }

  sendToCurriculum() {
    if (this.formCurriculum.invalid) {
      this.alertService.showErrorMessage({
        title: 'Formulario invalido',
        message: 'Asegurese de llenar todos los campos requeridos',
      });
      return;
    }

    const payload = {
      description: this.formCurriculum.controls.description.value || '',
    };

    if (this.selectCurriculum.isEdit === false) {
      this.workflowService
        .createComplementaryEvaluation(this.selectCurriculum?.curriculumId, payload)
        .subscribe({
          next: () => {
            this.alertService.showInfoMessage({
              message: 'Descripción creada con éxito',
            });
            const curriculumItem = { ...this.selectCurriculum };
            this.closeCurriculum();
            this.loadLearningEvaluation();
            this.openCreateLevel({ ...curriculumItem });
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
        .updateComplementaryEvaluation(this.selectCurriculum?.curriculumId, payload)
        .subscribe({
          next: () => {
            this.alertService.showInfoMessage({
              message: 'Descripción actualizada con éxito',
            });
            this.reloadLearningAssessment({ ...this.selectCurriculum });
            this.closeCurriculum();
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

  /** end core */

  reloadLearningAssessment(item: any) {
    this.workflowService
      .getLearningAssessmentByCurriculumId(item?.curriculumId)
      .subscribe((response) => {
        const { data } = response;
        for (let i = 0; i < this.learningEvaluationList.length; i++) {
          if (this.learningEvaluationList[i].curriculumId === item?.curriculumId) {
            this.learningEvaluationList[i].dataList = data;
            this.learningEvaluationList[i].description = data.description;
          }
        }
      });
  }

  getBackgroundColor(index: number): string {
    const colors = ['#a6cef9', '#6bd6af', '#f7ffb0', '#4181c5']; // Lista de colores
    return colors[index % colors.length]; // Cambia entre los colores en cada iteración
  }

  redirectViewEstudent(item: any) {
    this.viewlearningEvaluationSelect = item;
    this.learningEvaluationSelect = [];
    this.typeView = 2;
    this.workflowService
      .getLearningAssessmentByCurriculumId(this.viewlearningEvaluationSelect?.curriculumId)
      .subscribe((response) => {
        const { data } = response;
        this.viewlearningEvaluationSelect.dataList = data;
        this.learningEvaluationSelect = data?.learningAssessmentList;
      });
  }

  resetViewEstudent() {
    if (this.role === this.roleType.ESTUDIANTE || this.role === this.roleType.ESTUDIANTE) {
      this.typeView = 1;
    }
  }

  downloadDocument(item: any) {
    window.open(item.file, '_blanck');
  }
}
