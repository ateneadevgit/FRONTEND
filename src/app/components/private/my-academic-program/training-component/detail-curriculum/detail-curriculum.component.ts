/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ReponseComponentCurriculum, SemesterModel } from 'src/models/workflow.interface';

@Component({
  selector: 'app-detail-curriculum',
  templateUrl: './detail-curriculum.component.html',
  styleUrls: ['./detail-curriculum.component.scss'],
})
export class DetailCurriculumComponent implements OnInit {
  idProgram?: number;
  idType?: number;
  idItem?: number;
  selectedProgram: any;
  routerApp = RoutesApp;
  asignatureCoreSubCoreList: any[] = [];
  template = 0; // 0 todos , 1 nucleo , 2 subnucleo
  selectItem: any;
  subjectGuideData: any;

  totalCreditNumber = 0; // sumatoria creditos
  totalParticipation = 0; // sumatoria porcentaje

  pdfUrl = ''; // url del silabos
  guideUrl = ''; // url del silabos
  safePdfUrl: SafeResourceUrl = '';
  subjectGuidePdfUrl: SafeResourceUrl = '';

  srcImage = './../../../../../../assets/images/template/img5.jpg';
  srcImageRAEG = './../../../../../../assets/images/template/img6.jpg';
  planSelect = '';

  objPlan: ReponseComponentCurriculum[] = [];
  objSemesterList: SemesterModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private programsService: ProgramsService,
    private workflowService: WorkflowService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('idprogram') ? Number(params.get('idprogram')) : 0;
      this.idType = params.get('type') ? Number(params.get('type')) : 0;
      this.idItem = params.get('idItem') ? Number(params.get('idItem')) : 0;
    });

    await this.loadSelectedProgram();
    await this.loadDataPlan();
    await this.loadActiveItem();
  }

  loadActiveItem() {
    if (this.idItem)
      this.workflowService.getDetailIdStudyPlan(this.idItem).subscribe((response) => {
        const { data } = response;
        this.selectItem = data;
        this.selectItem.nameItem = this.traducirNombre(this.selectItem.type);
        if (this.selectItem.childs.length > 0) {
          this.selectItem.nameItemChild = this.traducirNombre(this.selectItem.childs[0].type);
          this.sumarAtributos(this.selectItem.childs);
        }
        this.selectTemplate(this.selectItem.type);
      });

    const pyloadSubjectGuide = {
      createdBy: null,
      roleId: null,
      teacher: null,
    };

    this.workflowService
      .getSubjectGuideData(this.idItem || 0, pyloadSubjectGuide)
      .subscribe((response) => {
        const { data } = response;
        this.subjectGuideData = data;
      });
  }

  loadSyllabusItem() {
    if (this.idItem)
      this.workflowService
        .getDetailSyllabusId(this.selectItem.curriculumId)
        .subscribe((response) => {
          const { data } = response;
          this.pdfUrl = data;
          this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
          this.template = 3;
        });
  }

  loadSubjectGuidePdfItem() {
    const pyloadSubjectGuide = {
      createdBy: null,
      roleId: null,
      teacher: null,
    };

    if (this.idItem)
      this.workflowService
        .getSubjectGuideNifPdf(this.selectItem.curriculumId || 0, pyloadSubjectGuide)
        .subscribe((response) => {
          const { data } = response;
          this.guideUrl = data;
          this.subjectGuidePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data);
          this.template = 4;
        });
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

  returnCurriculum() {
    if (this.idProgram)
      this.router.navigate([
        `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.TRAINING}/${this.idProgram}/type/9/${RoutesApp.STUDY_PLAN}`,
      ]);
  }

  loadNewDetail(item: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([
        `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.TRAINING}/${this.idProgram}/type/9/${RoutesApp.STUDY_PLAN}/detail/${item.curriculumId}`,
      ]);
    });
  }

  traducirNombre(id: number): string | null {
    switch (id) {
      case 51:
        return 'Ciclo';
      case 52:
        return 'Área';
      case 53:
        return 'Núcleo';
      case 54:
        return 'Eje';
      case 55:
        return 'Subnúcleo';
      case 56:
        return 'Componente';
      default:
        return null; // Devuelve null si el ID no coincide con ninguna entrada conocida
    }
  }

  selectTemplate(id: number) {
    switch (id) {
      case 53:
        this.template = 1; // Nucleo
        break;
      case 55:
        this.template = 2; // Subnucleo
        break;
      default:
        this.template = 0; // Devuelve null si el ID no coincide con ninguna entrada conocida
    }
  }

  sumarAtributos(childs: any[]) {
    for (const child of childs) {
      this.totalCreditNumber += child.creditNumber || 0; // Asegura que el valor sea numérico
      this.totalParticipation += child.participation || 0; // Asegura que el valor sea numérico
    }
  }

  redirectRaegNucleo(id: number) {
    //100 RAEG 101 NUCLEO
    this.router.navigate([
      `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.SUMMARY}/${this.idProgram}/type/${id}/${this.selectItem.curriculumId}`,
    ]);
  }
}
