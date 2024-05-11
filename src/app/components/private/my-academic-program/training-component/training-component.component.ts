import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { ComponenteCurricularType } from 'src/enums/component-curricular-type.enum';
import { CurriculumSumaryType } from 'src/enums/curriculum-sumary.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { ContentProgram } from 'src/models/program.interface';

@Component({
  selector: 'app-training-component',
  templateUrl: './training-component.component.html',
  styleUrls: ['./training-component.component.scss'],
})
export class TrainingComponentComponent {
  curriculumSumaryType = CurriculumSumaryType;
  componenteCurricularType = ComponenteCurricularType;
  idProgram = 0;
  idType = 0;
  title = '';
  text = '';
  typeTemplate = 0;
  srcImage = './../../../../../assets/images/template/img3.jpg';
  activeProgram?: ContentProgram;
  role = 0;
  Role = Role;
  campus: CatalogsByIdResponse[] = [];
  constructor(
    private workflowService: WorkflowService,
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private catalogsService: CatalogsService,
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('idprogram') ? Number(params.get('idprogram')) : 0;
      this.idType = params.get('type') ? Number(params.get('type')) : 0;
    });
    this.programsService.getProgram(this.idProgram ?? 0).subscribe((response) => {
      const { data } = response;
      this.activeProgram = data;
      this.loadCampus();
    });
    this.loadData();
    this.getRole();
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
      if (this.activeProgram) {
        const campusIds = this.activeProgram.campusList.split(',').map((id) => +id.trim());
        const campusNames = campusIds
          .map((id) => {
            const item = this.campus.find((catalogItem) => catalogItem.catalogItemId === id);
            return item ? item.catalogItemName : null;
          })
          .filter(Boolean); // Filtrar elementos nulos por si acaso no se encontró el nombre correspondiente

        // Asignar los nombres convertidos a la propiedad campusListName en el mismo objeto
        this.activeProgram.nameCampusList = campusNames.join(', ');
      }
    });
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  redirectType(idProgram: number, idType: number) {
    this.router.navigate([
      `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.SUMMARY}/${idProgram}/type/${idType}`,
    ]);
  }

  redirectStudyPlan(idProgram: number) {
    this.router.navigate([
      `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.TRAINING}/${idProgram}/type/9/${RoutesApp.STUDY_PLAN}`,
    ]);
  }

  redirectBankProblem() {
    this.router.navigate([`${RoutesApp.PROBLEM_BANK}`]);
  }

  loadData() {
    this.workflowService
      .getCurricularByType(this.idProgram.toString(), this.idType.toString())
      .subscribe((response) => {
        const { data } = response;
        this.text = data.summary;
      });
  }
}
