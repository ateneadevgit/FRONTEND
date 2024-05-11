/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ReponseComponentCurriculum, SemesterModel } from 'src/models/workflow.interface';

@Component({
  selector: 'app-study-plan-student',
  templateUrl: './study-plan-student.component.html',
  styleUrls: ['./study-plan-student.component.scss'],
})
export class StudyPlanStudentComponent implements OnInit {
  idProgram?: number;
  idType?: number;
  selectedProgram: any;
  routerApp = RoutesApp;
  asignatureCoreSubCoreList: any[] = [];

  planSelect = '';

  objPlan: ReponseComponentCurriculum[] = [];
  objSemesterList: SemesterModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private http: HttpClient,
    private programsService: ProgramsService,
    private workflowService: WorkflowService,
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('idprogram') ? Number(params.get('idprogram')) : 0;
      this.idType = params.get('type') ? Number(params.get('type')) : 0;
    });

    await this.loadSelectedProgram();
    await this.loadDataPlan();
  }

  loadSelectedProgram() {
    this.programsService.getProgram(this.idProgram ?? 0).subscribe((response) => {
      const { data } = response;
      this.selectedProgram = data;
    });
  }

  loadDataPlan() {
    if (this.idProgram)
      this.workflowService.getCurriculumStudent(this.idProgram.toString()).subscribe((response) => {
        const { data } = response;
        this.objPlan = data.curriculumList;
        this.objSemesterList = data.semesterList;
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

  downloadDocument() {
    if (this.idProgram)
      this.workflowService.getPdfStudyPlan(this.idProgram?.toString()).subscribe((response) => {
        window.open(response.data, 'blank');
      });
  }
}
