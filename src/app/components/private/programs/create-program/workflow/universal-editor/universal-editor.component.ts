import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import {
  CurriculumSummary,
  SendCurriculmSummary,
  UpdateCurriculumSummary,
} from 'src/models/sumary.intefaces';
import { StepsWorkflow } from 'src/models/workflow.interface';
import dataType from 'src/assets/data/sumarytype.json';
import { RoutesApp } from 'src/enums/routes.enum';
import { MessageService } from 'primeng/api';
import { ProgramsService } from 'src/app/services/programs/programs.service';

@Component({
  selector: 'app-universal-editor',
  templateUrl: './universal-editor.component.html',
  styleUrls: ['./universal-editor.component.scss'],
})
export class UniversalEditorComponent implements OnInit {
  currentStep?: StepsWorkflow;
  workFlowId?: number;
  stepId?: number;
  type?: number;
  idProgram?: number;
  selectCondition?: string;
  progamName?: string;
  html: string | null = null;
  htmlToReply = '';
  disabledEditor = false;
  titleComponent = '';
  sidebarComments = false;
  sumaryRegister?: CurriculumSummary;
  enabledSave = false;
  permissionsView = false;
  permissionsCreate = false;

  dataTypes = dataType;

  constructor(
    private workflowService: WorkflowService,
    public permissionsService: PermissionsService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private programsService: ProgramsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') ? Number(params.get('id')) : 0;
      this.stepId = params.get('idstep') ? Number(params.get('idstep')) : 0;
      this.workFlowId = params.get('idworkflow') ? Number(params.get('idworkflow')) : 0;
      this.type = params.get('idtype') ? Number(params.get('idtype')) : 0;
      this.selectCondition = params.get('condition') ? params.get('condition') ?? '' : '';
      this.getWorkflow();
    });
  }

  getWorkflow() {
    this.workflowService
      .getWorkflow(this.idProgram?.toString() ?? '', this.selectCondition ?? '')
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.currentStep = data.steps.find((item) => item.stepId === this.stepId);
          this.loadProgram();
          this.permissions();
          this.setPermisions();
          this.loadSumary();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'No se encontraron programas asociados',
            detail: 'Inténtalo nuevamente',
          });
        },
      });
  }

  loadProgram() {
    this.programsService.getProgram(this.idProgram ?? 0).subscribe((response) => {
      const { data } = response;
      this.progamName = data?.name ?? '';
    });
  }

  permissions() {
    this.permissionsService.mappingPermissions(this.currentStep?.actions ?? []);
  }

  setPermisions() {
    if (this.type == dataType.GRADUATION_PROFILE.id) {
      this.titleComponent = dataType.GRADUATION_PROFILE.title;
      this.permissionsView = this.permissionsService.permissions.canViewProfileEntry;
      this.permissionsCreate = this.permissionsService.permissions.canCreateProfileEntry;
    }
    if (this.type == dataType.RAE.id) {
      this.titleComponent = dataType.RAE.title;
      this.permissionsView = this.permissionsService.permissions.canViewRae;
      this.permissionsCreate = this.permissionsService.permissions.canCreateRae;
    }
    if (this.type == dataType.COMPETENCE.id) {
      this.titleComponent = dataType.COMPETENCE.title;
      this.permissionsView = this.permissionsService.permissions.canViewCompetencies;
      this.permissionsCreate = this.permissionsService.permissions.canCreateCompetencies;
    }
    if (this.type == dataType.PROGRAM_OBJECTIVE.id) {
      this.titleComponent = dataType.PROGRAM_OBJECTIVE.title;
      this.permissionsView = this.permissionsService.permissions.canViewProgramObjective;
      this.permissionsCreate = this.permissionsService.permissions.canCreateProgramObjective;
    }
    if (this.type == dataType.ENGLISH_FORMATION.id) {
      this.titleComponent = dataType.ENGLISH_FORMATION.title;
      this.permissionsView = this.permissionsService.permissions.canViewEnglishFormation;
      this.permissionsCreate = this.permissionsService.permissions.canCreateEnglishFormation;
    }
    if (this.type == dataType.CAMPUS_ACADEMIC_PROGRAM.id) {
      this.titleComponent = dataType.CAMPUS_ACADEMIC_PROGRAM.title;
      this.permissionsView = this.permissionsService.permissions.canViewAcademicProgramsOfCampus;
      this.permissionsCreate =
        this.permissionsService.permissions.canCreateAcademicProgramsOfCampus;
    }
    if (this.type == dataType.EXTENSION_SOCIAL_PROJECTION.id) {
      this.titleComponent = dataType.EXTENSION_SOCIAL_PROJECTION.title;
      this.permissionsView = this.permissionsService.permissions.canViewExtensionSocialProjection;
      this.permissionsCreate =
        this.permissionsService.permissions.canCreateExtensionSocialProjection;
    }
    if (this.type == dataType.INTERNATIONAL.id) {
      this.titleComponent = dataType.INTERNATIONAL.title;
      this.permissionsView = this.permissionsService.permissions.canViewInternational;
      this.permissionsCreate = this.permissionsService.permissions.canCreateInternational;
    }

    if (this.type == dataType.INVESTIGATIVE_INFORMATION.id) {
      this.titleComponent = dataType.INVESTIGATIVE_INFORMATION.title;
      this.permissionsView = this.permissionsService.permissions.canViewInvestigativeInformation;
      this.permissionsCreate =
        this.permissionsService.permissions.canCreateInvestigativeInformation;
    }
  }

  loadSumary() {
    this.workflowService
      .getCurriculumSummary(this.type ?? 0, this.workFlowId ?? 0, this.stepId ?? 0)
      .subscribe((response) => {
        const { data } = response;
        this.sumaryRegister = data;
        setTimeout(() => {
          this.html = this.sumaryRegister?.curriculumSummary
            ? this.sumaryRegister?.curriculumSummary
            : '';
        }, 100);
      });
  }

  updateSumary() {
    const payload: UpdateCurriculumSummary = {
      curriculum: this.html ?? '',
    };
    this.disabledEditor = true;

    this.workflowService
      .updateCurriculumSummary(payload, this.sumaryRegister?.curriculumSummaryId ?? 0)
      .subscribe((response) => {
        this.disabledEditor = false;
        this.loadSumary();
        if (response) this.sucessToast();
      });
  }

  sendSumary() {
    const payload: SendCurriculmSummary = {
      createdBy: '',
      roleId: 0,
      stepId: this.stepId ?? 0,
      workflowId: this.workFlowId ?? 0,
      curriculumType: this.type ?? 0,
      summary: this.html ?? '',
    };

    this.disabledEditor = true;
    this.workflowService.createCurriculumSummary(payload).subscribe((response) => {
      this.disabledEditor = false;
      if (response) this.sucessToast();
      this.loadSumary();
    });
  }

  createHtml($event: string) {
    this.html = $event;
  }

  navigateCreateProgram() {
    this.router.navigate([`${RoutesApp.PROGRAMS}/${RoutesApp.CREATE_PROGRAM}/${this.idProgram}`]);
  }

  sucessToast() {
    this.messageService.add({
      key: 'tl',
      severity: 'success',
      detail: 'Cambios guardados exitosamente',
      icon: 'pi pi-check',
    });
  }
}
