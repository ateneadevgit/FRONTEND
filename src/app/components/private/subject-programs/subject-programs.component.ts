/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { SinuService } from 'src/app/services/sinu/sinu.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import {
  SubjectGuideStatus,
  TypesStatesSubjects,
  UpdateProgramSubjectStatus,
} from 'src/enums/catalogs-items.enums';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { CreateUpdateSubjectGuideType } from 'src/enums/workflow.enum';
import { IPagination } from 'src/models/body.interface';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { CommentsWorkflow, RQComments, ReplyComments } from 'src/models/comments.interface';
import { PreviewDocument } from 'src/models/preview-document.interface';
import { Program } from 'src/models/program.interface';
import { DirectorsRole } from 'src/models/sinu.interface';
import { FilterProgramSubject } from 'src/models/workflow.interface';

@Component({
  selector: 'app-subject-programs',
  templateUrl: './subject-programs.component.html',
  styleUrls: ['./subject-programs.component.scss'],
})
export class SubjectProgramsComponent implements OnInit, OnDestroy {
  @Input() programId?: number;
  @Input() statusId?: number;

  subjectPrograms: any[] = [];
  semesterList: any[] = [];
  treeNodeData?: TreeNode[] = [];

  programs: Program[] = [];

  statusSujectGuide: CatalogsByIdResponse[] = [];
  statusUpdateProgramSubject: CatalogsByIdResponse[] = [];

  listCoordinador: DirectorsRole[] = [];

  isActivity = false;
  activeIndex = 0;
  previoussActivity = false;

  selectProgram?: any;
  selectStatus?: any;
  selectStatusGuideUpdate?: any;
  selectSemester?: any;
  previewDocument?: PreviewDocument;

  visibleViewDocument = false;
  visibleAssignedCoordinator = false;
  visibleViewCreateRequest = false;
  visibleReqUpdate = false;
  subjectRequestUpdateList: any[] = [];

  htmlRequest = '';

  userId = '';
  searchCoordinador = '';
  selectSubjectView?: any;
  selectSubject?: any;
  selectSubjectRequestUpdate?: any;
  role = 0;
  roleType = Role;
  routerApp = RoutesApp;
  subjectGuideStatus = SubjectGuideStatus;
  updateProgramSubjectStatus = UpdateProgramSubjectStatus;
  typesStatesSubjects = TypesStatesSubjects;
  createUpdSubjGuideType = CreateUpdateSubjectGuideType;

  commentsWorkflow?: CommentsWorkflow[];
  selectSubjectComents?: any;
  visibleComments = false;
  isLoading = false;

  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;

  finishEaluateRequest = 0;

  constructor(
    private workflowService: WorkflowService,
    private programsService: ProgramsService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private alertService: AlertService,
    private utilsService: UtilsService,
    private sinuService: SinuService,
    private router: Router,
  ) {
    this.workflowService.isActivity.subscribe((response) => {
      this.isActivity = response;
      this.pageNumber = 1;
      this.totalRecords = 0;
    });
  }

  ngOnDestroy(): void {
    localStorage.setItem('programId', this.selectProgram?.idProgram);
    localStorage.setItem('isActivity', this.isActivity === true ? 'True' : 'False');
    console.log('---- Destruyendo componente -----');
  }

  async ngOnInit() {
    this.role = this.loginService.getRole();
    this.userId = this.loginService.getEmail();
    await this.loadDataSelects();
  }

  get subjectGuideStatusSelect() {
    return this.statusSujectGuide.filter(
      (item) => item.catalogItemId !== this.subjectGuideStatus.WITHOUT_STATES,
    );
  }

  onPageChange($event: any) {
    this.pageNumber = $event.first / $event.rows + 1;
    this.loadListData();
  }

  openCreateViewGuide(item: any, route: string, type?: string) {
    localStorage.setItem('coordinadorId', item?.coordinatorId);
    let teacherId = this.userId;
    if (type === 'teacher') {
      teacherId = item?.userId;
      localStorage.setItem('teacherId', teacherId);
    }
    this.router.navigate([route]);
  }

  onChangeTabView($event: any) {
    const isActivity = $event.index === 0 ? false : true;
    this.workflowService.isActivity.emit(isActivity);
    this.loadListData();
  }

  getNameSujectGuideStatus(statusId: number) {
    const catalogItemName = this.statusSujectGuide.find((item) => item.catalogItemId == statusId);
    if (!catalogItemName) {
      return '--';
    }
    return catalogItemName.catalogItemName;
  }

  getNameUpdateProgramSubjectStatus(statusId: number) {
    const catalogItemName = this.statusUpdateProgramSubject.find(
      (item) => item.catalogItemId == statusId,
    );
    if (!catalogItemName) {
      return '--';
    }
    return catalogItemName.catalogItemName;
  }

  loadDataSelects() {
    const isActivityStorage = localStorage.getItem('isActivity');
    if (isActivityStorage) {
      this.isActivity = isActivityStorage === 'True' ? true : false;
      this.activeIndex = this.isActivity === true ? 1 : 0;
    }

    this.programsService.getPrograms().subscribe((response) => {
      const { data } = response;
      this.programs = data;
      const programId = localStorage.getItem('programId');
      if (programId) {
        this.selectProgram = this.programs.find((item) => item.idProgram.toString() === programId);
        this.loadListData();
      }
    });

    this.catalogsService.getAllCatalogsByid(CatalogsEnum.GUIDE_STATUS).subscribe((response) => {
      const { data } = response;
      this.statusSujectGuide = data;
    });

    this.catalogsService
      .getAllCatalogsByid(CatalogsEnum.GUIDE_STATUS_UPDATE)
      .subscribe((response) => {
        const { data } = response;
        this.statusUpdateProgramSubject = data;
      });
  }

  getCoordinators() {
    this.sinuService.getAllDirectors(this.roleType.DOCENTE_COORDINADOR).subscribe({
      next: (response) => {
        this.listCoordinador = response.data;
      },
    });
  }

  openSelectCoordinador(subject: any) {
    this.selectSubject = subject;
    this.getCoordinators();
    this.visibleAssignedCoordinator = true;
  }

  closeSelectCoordinador() {
    this.searchCoordinador = '';
    this.visibleAssignedCoordinator = false;
  }

  openCreateRequest(subject: any) {
    this.selectSubjectRequestUpdate = subject;
    this.visibleViewCreateRequest = true;
  }

  closeCreateRequest() {
    this.htmlRequest = '';
    this.visibleViewCreateRequest = false;
    this.selectSubjectRequestUpdate = undefined;
  }

  createHtmlRequest($event: string) {
    this.htmlRequest = $event;
  }

  saveRequestUpdate() {
    if (this.htmlRequest === '') {
      this.alertService.showErrorMessage({
        message: 'La solicitud de actualización no puede estar vacia',
      });
      return;
    }

    const pyload = {
      content: this.htmlRequest,
      createdBy: this.userId,
    };

    this.workflowService
      .createRenovationSubjectGuide(this.selectSubjectRequestUpdate?.idSubjectGuide || 0, pyload)
      .subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Solicitud de actualización realizada con éxito',
          });
          this.closeCreateRequest();
          this.loadListData();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  closeReqUpdate() {
    this.finishEaluateRequest = 0;
    this.visibleReqUpdate = false;
    this.selectSubjectView = undefined;
  }

  openReqUpdate(subject: any) {
    this.isLoading = true;
    this.selectSubjectView = subject;
    this.visibleReqUpdate = true;
    this.getRenovationsBySubjectGuide();
  }

  getRenovationsBySubjectGuide() {
    this.workflowService
      .getRenovationsBySubjectGuide(this.selectSubjectView?.idSubjectGuide || 0)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.subjectRequestUpdateList = response.data;
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error consultando solicitudes de actualización',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  evaluatedRenovationSubject(item: any, type: string) {
    const pyload = {
      createdBy: this.userId,
      feedbackStatus: type,
      roleId: this.role,
      userId: item.userId,
    };

    this.workflowService
      .evaluateRenovationSubjectGuide(item?.idRenovationSubjectGuide || 0, pyload)
      .subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Evaluación realizada con éxito',
          });

          this.finishEaluateRequest = 1;
          this.getRenovationsBySubjectGuide();
          this.loadListData();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  loadListData(type?: string) {
    if (!this.selectProgram) {
      this.alertService.showInfoMessage({ message: 'Debe seleccionar un programa' });
      return;
    }

    if (type === 'program' && this.role === this.roleType.DECANO) {
      this.selectSemester = undefined;
      this.semesterList = [];
      this.workflowService.getCurriculumStudent(this.selectProgram?.idProgram).subscribe({
        next: (response) => {
          this.semesterList = response.data.semesterList || [];
        },
      });
    }

    this.subjectPrograms = [];
    this.treeNodeData = [];

    const filter: FilterProgramSubject = {
      createdBy: '',
      isActivity: this.isActivity,
      programId: this.selectProgram?.idProgram,
      roleId: 0,
      semester: this.selectSemester ? this.selectSemester?.semesterNumber : null,
      statusId: this.selectStatus ? this.selectStatus?.catalogItemId : null,
      userId: null,
    };

    const pagination: IPagination = {
      page: this.pageNumber,
      size: this.pageSize,
    };

    this.workflowService
      .getProgramSubjectGuideSubjectPrograms(filter, pagination)
      .subscribe((response) => {
        const { data } = response;
        this.subjectPrograms = data?.content;
        this.getFileSystemNodesData();
        this.totalRecords = response.data.totalNumberItems;
      });
  }

  viewDocument(item: any, type: string, control?: any) {
    let idCurriculum: any = null;
    let teacher: any = null;

    if (type === 'subject') {
      idCurriculum = item?.idCurriculum;
      if (control === 1) {
        teacher = this.userId;
      }
    }

    if (type === 'teacher') {
      teacher = item?.userId;
      if (item.idCurriculum && item.idCurriculum !== null) {
        idCurriculum = item.idCurriculum;
      } else {
        idCurriculum = item?.subjectObj?.idCurriculum;
      }
    }

    const pyloadSubjectGuide = {
      createdBy: null,
      roleId: null,
      teacher: teacher,
    };

    if (item?.urlPdf && item?.urlPdf !== null && item?.urlPdf?.length > 0) {
      this.previewDocument = {
        url: item.urlPdf,
        type: this.utilsService.getFileExtension(item.urlPdf),
      };
      this.visibleViewDocument = true;
    } else {
      this.workflowService.getSubjectGuideNifPdf(idCurriculum, pyloadSubjectGuide).subscribe({
        next: (response) => {
          const { data } = response;
          item.urlPdf = data;
          this.previewDocument = {
            url: item.urlPdf,
            type: this.utilsService.getFileExtension(item.urlPdf),
          };
          this.visibleViewDocument = true;
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

  downloadDocument(item: any, type: string, control?: any) {
    let idCurriculum: any = null;
    let teacher: any = null;

    if (type === 'subject') {
      idCurriculum = item?.idCurriculum;
      if (control === 1) {
        teacher = this.userId;
      }
    }

    if (type === 'teacher') {
      teacher = item?.userId;
      if (item.idCurriculum && item.idCurriculum !== null) {
        idCurriculum = item.idCurriculum;
      } else {
        idCurriculum = item?.subjectObj?.idCurriculum;
      }
    }

    const pyloadSubjectGuide = {
      createdBy: null,
      roleId: null,
      teacher: teacher,
    };

    if (item?.urlPdf && item?.urlPdf !== null && item?.urlPdf?.length > 0) {
      window.open(item.urlPdf, '#blanck');
    } else {
      this.workflowService.getSubjectGuideNifPdf(idCurriculum, pyloadSubjectGuide).subscribe({
        next: (response) => {
          const { data } = response;
          item.urlPdf = data;
          window.open(item.urlPdf, '#blanck');
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

  closeModal($event: boolean) {
    this.visibleViewDocument = $event;
    this.previewDocument = undefined;
  }

  getNode(node: any) {
    return node;
  }

  async onNodeToggle($event: any) {
    const eventData = $event.node?.data;
    const data = (
      await lastValueFrom(
        this.workflowService.getTeachersBySubject($event.node?.data?.idCurriculum),
      )
    ).data;
    if (data.length === 0) {
      this.alertService.showInfoMessage({
        message: 'La asignatura selecciónada no cuenta con docentes',
      });
    }

    const nodeData = { ...$event.node };
    nodeData.children = [
      ...data.map((element: any) => {
        return {
          data: {
            ...element,
            semester: $event.node?.data?.semester,
            typeRow: 2,
            subjectObj: eventData, //Assing subject to teacherdata
          },
        };
      }),
    ];

    if (this.treeNodeData) {
      for (let i = 0; i < this.treeNodeData.length; i++) {
        if (this.treeNodeData[i].data.index === $event.node?.data?.index) {
          this.treeNodeData[i] = nodeData;
        }
      }
      const dataArray = [...this.treeNodeData];
      this.treeNodeData = [];
      this.treeNodeData = dataArray;
    }
  }

  getFileSystemNodesData() {
    this.treeNodeData = [];
    const currentStep = [...this.subjectPrograms];
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
    this.treeNodeData = column;
  }

  selectCoordinator(director: DirectorsRole) {
    const payload: any = {
      createdBy: this.userId,
      roleId: this.role,
      userEmail: director.userEmail,
      userId: director.userEmail,
    };

    this.workflowService
      .assignCoordinatorCurriculum(this.selectSubject?.idCurriculum, payload)
      .subscribe({
        next: () => {
          if (this.selectSubject?.idSubjectGuide && this.selectSubject?.idSubjectGuide > 0) {
            const pyloadEvaluateSG = {
              createdBy: this.userId,
              feedbackStatus: 'completeness',
              roleId: this.role,
              userId: this.selectSubject?.coordinatorId || '',
            };
            this.workflowService
              .evaluateSubjectGuide(this.selectSubject?.idSubjectGuide || 0, pyloadEvaluateSG)
              .subscribe();
          }
          this.closeSelectCoordinador();
          this.loadListData();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error asignando Coordinador',
            message: 'Inténtalo nuevamente',
          });
        },
      });
  }

  openCommmnts(subject: any, type: string) {
    this.selectSubjectComents = subject;
    this.selectSubjectComents.typeRegister = type;
    this.visibleComments = true;
  }

  closeCommmnts() {
    this.selectSubjectComents = undefined;
    this.visibleComments = true;
    //this.loadListData();
  }

  getComments() {
    let idCurriculum = this.selectSubjectComents?.idCurriculum;

    if (this.selectSubjectComents?.typeRegister === 'teacher') {
      if (
        this.selectSubjectComents.idCurriculum &&
        this.selectSubjectComents.idCurriculum !== null
      ) {
        idCurriculum = this.selectSubjectComents.idCurriculum;
      } else {
        idCurriculum = this.selectSubjectComents?.subjectObj?.idCurriculum;
      }
    }

    let userId = this.userId;
    if (this.role === this.roleType.DIRECTOR) {
      userId = this.selectSubjectComents?.coordinatorId;
      if (this.selectSubjectComents?.typeRegister === 'teacher') {
        userId = this.selectSubjectComents.userId;
      }
    }

    const pyload: RQComments = {
      objectId: idCurriculum,
      type: this.isActivity
        ? this.typesStatesSubjects.ACTIVITY_PLAN
        : this.typesStatesSubjects.SUBJECT_PROGRAMS,
      userId: userId,
    };

    this.workflowService.getReview(pyload).subscribe((response) => {
      const { data } = response;

      this.commentsWorkflow = data;

      const readComments = this.findUnreadComments(this.commentsWorkflow);
      if (readComments.length > 0) {
        this.workflowService.readCurriculumChat(readComments).subscribe();
      }

      if (this.isActivity) {
        let existRow = false;
        if (this.treeNodeData) {
          for (let i = 0; i < this.treeNodeData.length; i++) {
            const nodeElement = this.treeNodeData[i];
            if (this.treeNodeData[i].data.idCurriculum === pyload.objectId) {
              const childrens = nodeElement?.children || [];
              for (let j = 0; j < childrens.length; j++) {
                const element = childrens[j];
                if (element.data?.userId === pyload.userId) {
                  element.data = {
                    ...element.data,
                    commentCount: 0,
                  };
                  (childrens[i] = {
                    ...element,
                  }),
                    (this.treeNodeData[i].children = childrens);
                  existRow = true;
                }
              }
            }
          }
          if (existRow) {
            const dataArray = [...this.treeNodeData];
            this.treeNodeData = [];
            this.treeNodeData = dataArray;
          }
        }
      } else {
        this.subjectPrograms.forEach((element) => {
          if (element?.idCurriculum === pyload.objectId) {
            element.commentCount = 0;
          }
        });
      }
    });
  }

  findUnreadComments(comments: CommentsWorkflow[]) {
    let unreadComments: number[] = [];

    for (let index = 0; index < comments.length; index++) {
      const comment = comments[index];
      if (comment.isRead !== true && comment.sender !== this.userId) {
        unreadComments.push(comment.reviewId);
      }
      if (comment.replies.length > 0) {
        const unreadReplies = this.findUnreadComments(comment.replies);
        unreadComments = unreadComments.concat(unreadReplies);
      }
    }

    return unreadComments;
  }

  sendToReplyComments($event: any) {
    let sendTo: any = null; //If you are a director send null
    let idCurriculum = this.selectSubjectComents?.idCurriculum;

    if (this.role === this.roleType.DIRECTOR) {
      if (this.selectSubjectComents?.typeRegister === 'subject') {
        sendTo = this.selectSubjectComents?.coordinatorId;
      }

      if (this.selectSubjectComents?.typeRegister === 'teacher') {
        sendTo = this.selectSubjectComents?.userId;
        if (
          this.selectSubjectComents.idCurriculum &&
          this.selectSubjectComents.idCurriculum !== null
        ) {
          idCurriculum = this.selectSubjectComents.idCurriculum;
        } else {
          idCurriculum = this.selectSubjectComents?.subjectObj?.idCurriculum;
        }
      }
    }

    const payload: ReplyComments = {
      createdBy: this.userId,
      objectId: idCurriculum,
      objectType: this.isActivity
        ? this.typesStatesSubjects.ACTIVITY_PLAN
        : this.typesStatesSubjects.SUBJECT_PROGRAMS,
      replyTo: $event?.replyTo || 0, //this.replyComment?.reviewId ?? 0,
      review: $event?.review || '', //this.replyComment ? this.htmlToReply : this.html,
      roleId: this.role,
      sendTo: sendTo,
    };

    this.workflowService.createReview(payload).subscribe({
      next: () => {
        $event.successSenTo();
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  openCloseExpandedReqUpdate(item: any) {
    item.expanded = item?.expanded === true ? false : true;
  }

  actionStatusSubjectDirector(subject: any, type: number) {
    const objRedirect: any = {
      type: type,
      curriculumId: subject?.idCurriculum,
      subjectGuideId: subject?.idSubjectGuide,
      coordinadorId: subject?.coordinatorId,
      teacherId: subject?.userId,
    };

    localStorage.setItem('guideObj', JSON.stringify(objRedirect));

    if (subject?.idStatus === this.subjectGuideStatus.IN_REVIEW) {
      this.router.navigate([
        `${RoutesApp.SUBJECT_PROGRAMS}/${RoutesApp.CREATE_UPDATE_SUBJECT_GUIDE}`,
      ]);
    }
  }

  actionStatusActivityDirector(subject: any, type: number) {
    const objRedirect: any = {
      type: type,
      curriculumId: subject?.idCurriculum,
      subjectGuideId: subject?.idSubjectGuide,
      coordinadorId: subject?.coordinatorId,
      teacherId: subject?.userId,
    };

    localStorage.setItem('guideObj', JSON.stringify(objRedirect));

    if (subject?.idStatus === this.subjectGuideStatus.IN_REVIEW) {
      this.router.navigate([
        `${RoutesApp.SUBJECT_PROGRAMS}/${RoutesApp.CREATE_UPDATE_SUBJECT_GUIDE}`,
      ]);
    }
  }

  redirectCreateUpdateSubjectGuide(subject: any, type: number, request?: any) {
    const objRedirect: any = {
      type: type,
      curriculumId: subject?.idCurriculum,
      subjectGuideId: subject?.idSubjectGuide,
      coordinadorId: subject?.coordinatorId,
      teacherId: subject?.userId,
      idRenovationSubjectGuide: request?.idRenovationSubjectGuide,
      reuestTeacherId: request?.userId,
    };

    if (request) {
      objRedirect.idRenovationSubjectGuide = request?.idRenovationSubjectGuide;
      objRedirect.reuestTeacherId = request?.userId;
    }

    localStorage.setItem('guideObj', JSON.stringify(objRedirect));

    this.router.navigate([
      `${RoutesApp.SUBJECT_PROGRAMS}/${RoutesApp.CREATE_UPDATE_SUBJECT_GUIDE}`,
    ]);
  }

  redirectCreateUpdateSubjectGuide2(request: any, type: any) {
    const objRedirect: any = {
      type: type,
      curriculumId: this.selectSubjectView?.idCurriculum,
      subjectGuideId: this.selectSubjectView?.idSubjectGuide,
      coordinadorId: this.selectSubjectView?.coordinatorId,
      teacherId: this.selectSubjectView?.userId,
      idRenovationSubjectGuide: request?.idRenovationSubjectGuide,
      requestTeacherId: request?.userId,
    };

    localStorage.setItem('guideObj', JSON.stringify(objRedirect));

    this.router.navigate([
      `${RoutesApp.SUBJECT_PROGRAMS}/${RoutesApp.CREATE_UPDATE_SUBJECT_GUIDE}`,
    ]);
  }
}
