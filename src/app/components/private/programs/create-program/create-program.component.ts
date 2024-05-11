/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { SinuService } from 'src/app/services/sinu/sinu.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { WorklowType } from 'src/enums/workflow.enum';
import { environment } from 'src/environments/environment';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { StepperItems } from 'src/models/items-stepper.interface';
import { DirectorsRole } from 'src/models/sinu.interface';
import {
  CreateWorkflow,
  IUserAssigned,
  StepsWorkflow,
  Workflow,
} from 'src/models/workflow.interface';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss'],
})
export class CreateProgramComponent implements OnInit {
  selectCondition?: CatalogsByIdResponse;
  typePrograms: CatalogsByIdResponse[] = [];
  stepperItems: StepperItems[] = [];
  currentStep: any;
  viewText = false;
  showStepHorizonal = false;
  idProgram? = '';
  statusList: CatalogsByIdResponse[] = [];
  conditionsList: CatalogsByIdResponse[] = [];
  currentWorkFlow?: Workflow;
  visibleCreateDirector = false;
  listDirector: DirectorsRole[] = [];
  search = '';
  step = 0;
  workflowId = 0;
  showSyllabus = false;
  isFormal = true;
  isPaper = false;
  RoleEnum = Role;
  role = 0;
  visibleAssignDc = false;
  searchDc = '';
  listAssignedDirector: IUserAssigned[] = [];
  filteredListDirector: DirectorsRole[] = [];

  repeat = false; // Bandera que evita multiples llamados al getworkflow

  constructor(
    private activateRoute: ActivatedRoute,
    private catalogsService: CatalogsService,
    private workflowService: WorkflowService,
    private router: Router,
    private messageService: MessageService,
    private sinuService: SinuService,
    private loginService: LoginService,
    private alertService: AlertService,
  ) {
    this.idProgram = this.activateRoute?.snapshot?.paramMap.get('id') ?? undefined;
    this.workflowService.reload.subscribe(() => {
      if (!this.repeat) {
        this.currentStep = undefined;
        this.getWorkflow();
      }
    });
  }

  selectTypeCondition() {
    this.step = 0;
    this.getWorkflow();
  }

  async ngOnInit() {
    this.getRole();
    await this.loadStatus();
    await this.loadConditions();
    if (!this.idProgram) {
      this.router.navigate([RoutesApp.DASHBOARD]);
      return;
    }
    setTimeout(() => {
      //this.getWorkflow();
      this.hasFlowStarted();
    }, 1500);
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  selectDirector(director: DirectorsRole) {
    const payload: CreateWorkflow = {
      createdBy: null,
      roleId: null,
      userData: director,
      workflowObjectId: Number(this.idProgram) ?? 0, // this.currentWorkFlow?.workflowBaseId ?? 0,
      workflowType: WorklowType.PROGRAM,
    };

    this.workflowService.createWorkflow(payload).subscribe({
      next: () => {
        this.visibleCreateDirector = false;
        this.getWorkflow();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Asignando director',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }

  getDirectors() {
    this.sinuService.getAllDirectors(this.RoleEnum.DIRECTOR).subscribe({
      next: (response) => {
        this.listDirector = response.data;
      },
    });
  }

  hasFlowStarted() {
    this.workflowService.hasFlowStarted(this.idProgram ?? '').subscribe({
      next: (response) => {
        this.workflowService.isFormal(this.idProgram ?? '').subscribe({
          next: (rta) => {
            if (rta.data) {
              this.isFormal = false;
            } else {
              this.isFormal = true;
            }
            if (!response.data) {
              this.visibleCreateDirector = true;
              this.getDirectors();
            } else {
              this.getWorkflow();
            }
          },
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'cargando inicio del flujo',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }

  getWorkflow() {
    this.repeat = true;
    this.currentWorkFlow = undefined;
    this.workflowService
      .getWorkflow(
        this.idProgram ?? '',
        this.isFormal ? String(this.selectCondition?.catalogItemName) ?? '' : 'no-formal',
      )
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.currentWorkFlow = data;
          this.getSteperItems();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'No se encontraron programas asociados',
            detail: 'Inténtalo nuevamente',
          });
        },
        complete: () => {
          setTimeout(() => {
            this.repeat = false;
          }, 1500);
        },
      });
  }

  loadConditions() {
    this.catalogsService
      .getAllCatalogsByid(CatalogsEnum.CONDITIONS_WORKFLOW)
      .subscribe((response) => {
        const { data } = response;
        this.conditionsList = data;
        this.conditionsList.sort((a, b) => b.catalogItemId - a.catalogItemId);
        this.selectCondition = this.conditionsList[0];
      });
  }
  loadStatus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.STATUS_WORKFLOW).subscribe((response) => {
      const { data } = response;
      this.statusList = data;
      this.statusList.sort((a, b) => b.catalogItemId - a.catalogItemId);
    });
  }

  getSteperItems() {
    if (!this.currentWorkFlow) return;
    this.stepperItems = [];
    this.currentStep = undefined;

    this.currentWorkFlow?.steps.forEach((step, index) => {
      const stepItem = step;
      stepItem.isSmall = step?.orderId === 0 ? true : false;
      if (String(this.selectCondition?.catalogItemName) !== 'paper') {
        stepItem.hasIcon =
          step?.orderId === 0 || this.currentWorkFlow?.steps?.length === index + 1 ? true : false;

        stepItem.icon = this.currentWorkFlow?.steps?.length === index + 1 ? 'pi pi-check' : '';
      } else {
        stepItem.hasIcon = false;
        stepItem.icon = '';
      }

      this.stepperItems?.push(stepItem);
    });

    setTimeout(() => {
      if (this.isFormal && String(this.selectCondition?.catalogItemName) === 'paper') {
        this.isPaper = true;
        this.currentStep =
          this.step === 0 ? this.stepperItems[0] : this.stepperItems[this.step - 1];
      } else {
        this.isPaper = false;
        this.currentStep = this.stepperItems[this.step];
      }
    }, 100);
  }

  currentStepper(event: StepsWorkflow) {
    if (environment.production && !event.isEditable) return;
    this.step = event.orderId;
    this.currentStep = undefined;
    setTimeout(() => {
      this.currentStep = event;
    }, 100);
  }

  showText($event: boolean) {
    this.viewText = $event;
  }

  openSyllabus(value: boolean) {
    this.showSyllabus = value;
  }

  closeAssignDirectorLevel() {
    this.visibleAssignDc = false;
    this.visibleCreateDirector = false;
    this.searchDc = '';
    this.filteredListDirector = [];
  }

  filterTable() {
    this.filteredListDirector = this.listDirector.filter((director: any) => {
      return director.userEmail.toLowerCase().includes(this.searchDc.toLowerCase());
    });
  }

  openSelectDirector() {
    this.getDirectors();
    this.getAssignedUser(Number(this.idProgram));
    this.visibleCreateDirector = false;
    this.visibleAssignDc = true;
  }

  getAssignedUser(idProgram: number) {
    this.workflowService.getUserRelatedWithProgram(idProgram, this.RoleEnum.DIRECTOR).subscribe({
      next: (response) => {
        this.listAssignedDirector = response.data;
      },
    });
  }

  relateUserToWorkflow(director: DirectorsRole) {
    this.workflowService.relateUserToWorkflow(Number(this.idProgram), director).subscribe({
      next: () => {
        this.closeAssignDirectorLevel();
        this.alertService.showSuccessMessage({
          message: 'Director asignado correctamente',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Asignando director',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }
}
