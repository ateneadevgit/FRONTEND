/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { ComponenteCurricularType } from 'src/enums/component-curricular-type.enum';
import { CurriculumSumaryType } from 'src/enums/curriculum-sumary.enum';
import { RoutesApp } from 'src/enums/routes.enum';

@Component({
  selector: 'app-summary-academic',
  templateUrl: './summary-academic.component.html',
  styleUrls: ['./summary-academic.component.scss'],
})
export class SummaryAcademicComponent {
  componenteCurricularType = ComponenteCurricularType;
  curriculumSumaryType = CurriculumSumaryType;
  idProgram = 0;
  idType = 0;
  idItem = 0;
  title = '';
  text = '';
  typeTemplate = 0; // 0 Resumen default , 1 Resumen imagen horizontal, 2 semestres subnucleo
  childs: any[] = [];
  nameNucleo = '';
  srcImage = './../../../../../assets/images/template/img1.jpg';
  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private programService: ProgramsService,
    private router: Router,
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('idprogram') ? Number(params.get('idprogram')) : 0;
      this.idType = params.get('type') ? Number(params.get('type')) : 0;
      this.idItem = params.get('idItem') ? Number(params.get('idItem')) : 0;
    });

    this.srcImage = './../../../../../assets/images/template/img1.jpg';
    switch (this.idType) {
      case this.componenteCurricularType.EPISTEMOLOGICO:
        this.title = 'Componente epistemológico';
        this.typeTemplate = 0;
        this.loadData();
        break;
      case this.componenteCurricularType.EVALUACION:
        this.srcImage = './../../../../../assets/images/template/img2.jpg';
        this.title = 'Componente evaluativo';
        this.typeTemplate = 1;
        this.loadData();
        break;
      case this.componenteCurricularType.FORMATIVO:
        this.title = 'Componente formativo';
        this.typeTemplate = 0;
        this.loadData();
        break;
      case this.componenteCurricularType.INTERACCION:
        this.title = 'Componente de interacción';
        this.typeTemplate = 0;
        this.loadData();
        break;
      case this.componenteCurricularType.PEDAGOGICO:
        this.title = 'Componente pedagógico';
        this.typeTemplate = 1;
        this.srcImage = './../../../../../assets/images/template/img2.jpg';
        this.loadData();
        break;
      case this.curriculumSumaryType.GRADUATION_PROFILE:
        this.title = 'Perfil de egreso';
        this.srcImage = './../../../../../assets/images/template/img4.jpg';
        this.loadDataTraining();
        break;
      case this.curriculumSumaryType.RAE:
        this.title = 'RAE';
        this.srcImage = './../../../../../assets/images/template/img4.jpg';
        this.loadDataTraining();
        break;
      case this.curriculumSumaryType.COMPETENCE:
        this.title = 'Competencias';
        this.srcImage = './../../../../../assets/images/template/img4.jpg';
        this.loadDataTraining();
        break;
      case this.curriculumSumaryType.PROGRAM_OBJECTIVE:
        this.title = 'Objetivo de formación';
        this.srcImage = './../../../../../assets/images/template/img4.jpg';
        this.loadDataTraining();
        break;
      case 100: // REAG NUCLEO
        this.title = 'Resultados de aprendizajes específicos generales (RAEG)';
        this.srcImage = './../../../../../assets/images/template/img6.jpg';
        this.loadDataRaeg();
        break;
      case 101: // Subnucleo
        this.title = 'Núcleo problemático fundamentos de las ciencias biomédicas';
        this.srcImage = './../../../../../assets/images/template/img6.jpg';
        this.loadDataRaeg();
        this.typeTemplate = 2;
        break;
      //No formal
      case this.componenteCurricularType.GRADUATE_PROFILE:
        this.title = 'Perfil de egreso';
        this.typeTemplate = 0;
        this.loadData();
        break;
      case this.componenteCurricularType.PROGRAM_JUSTIFICATION:
        this.title = 'Justificación del programa';
        this.typeTemplate = 0;
        this.loadData();
        break;
      case this.componenteCurricularType.RESOURCES:
        this.title =
          'Recursos específicos para desarrollar el programa de acuerdo con la metodología propuesta';
        this.srcImage = './../../../../../assets/images/template/img3.jpg';
        this.typeTemplate = 1;
        this.loadData();
        break;
      case this.componenteCurricularType.PROGRAM_OBJECTIVE:
        this.title = 'Objetivos de formación';
        this.typeTemplate = 0;
        this.loadData();
        break;
    }
  }

  loadData() {
    this.workflowService
      .getCurricularByType(this.idProgram.toString(), this.idType.toString())
      .subscribe((response) => {
        const { data } = response;
        this.text = data.summary;
      });
  }

  loadDataTraining() {
    this.workflowService
      .getCurriculumSummaryType(this.idProgram.toString(), this.idType.toString())
      .subscribe((response) => {
        const { data } = response;
        this.text = data.curriculumSummary;
      });
  }

  loadDataRaeg() {
    this.workflowService.getDetailIdStudyPlan(this.idItem).subscribe((response) => {
      const { data } = response;
      this.text = data.raeg;
      this.childs = data.childs;
      this.nameNucleo = data.name;
    });
  }

  redirectSubNucleo(id: number) {
    this.router.navigate([
      `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.TRAINING}/${this.idProgram}/type/9/${RoutesApp.STUDY_PLAN}/detail/${id}`,
    ]);
  }
}
