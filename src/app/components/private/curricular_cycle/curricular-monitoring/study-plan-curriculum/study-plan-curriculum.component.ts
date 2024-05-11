/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';
import { ReponseComponentCurriculum, SemesterModel } from 'src/models/workflow.interface';

@Component({
  selector: 'app-study-plan-curriculum',
  templateUrl: './study-plan-curriculum.component.html',
  styleUrls: ['./study-plan-curriculum.component.scss'],
})
export class StudyPlanCurriculumComponent implements OnInit {
  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  programHistorical?: ProgramHistorical[];
  routerApp = RoutesApp;
  asignatureCoreSubCoreList: any[] = [];

  planSelect = '';

  objPlan: ReponseComponentCurriculum[] = [];
  objSemesterList: SemesterModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private programsService: ProgramsService,
    private workflowService: WorkflowService,
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') ? Number(params.get('id')) : 0;
      this.idModule = params.get('idmodule') ? Number(params.get('idmodule')) : 0;
    });

    await this.loadProgramModule();
    await this.loadSelectedProgram();
    await this.loadProgramHistorical();
  }

  loadSelectedProgram() {
    this.programsService.getProgram(this.idProgram ?? 0).subscribe((response) => {
      const { data } = response;
      this.selectedProgram = data;
    });
  }

  loadProgramModule() {
    this.programsService.getProgramModule(false).subscribe((response) => {
      const { data } = response;
      if (data.length === 0) {
        this.alertService.showInfoMessage({ message: 'No se encontraron modulos asociados' });
        return;
      }
      this.selectedModule = data.find((item) => item.moduleId == this.idModule);
    });
  }

  loadProgramHistorical() {
    this.programsService
      .getProgramHistoricalSpecific(this.idProgram ?? 0, this.idModule ?? 0)
      .subscribe((response) => {
        const { data } = response;
        this.programHistorical = data;
        if (this.programHistorical.length === 0) {
          this.alertService.showInfoMessage({ message: 'No se encontraron resultados' });
          return;
        }
      });
  }

  activePlan(value: string) {
    this.planSelect = value;
    this.objPlan = JSON.parse(this.planSelect).curriculumList;
    this.objSemesterList = JSON.parse(this.planSelect).semesterList;
  }

  reset() {
    this.objPlan = [];
    this.objSemesterList = [];
  }
}
