import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurricularCycleComponent } from './curricular-cycle.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: CurricularCycleComponent,
  },
  {
    path: RoutesApp.CURRICULAR_MONITORING,
    loadChildren: () =>
      import('./curricular-monitoring/curricular-monitoring.module').then(
        (m) => m.CurricularMonitoringModule,
      ),
  },
  {
    path: `${RoutesApp.CURRICULAR_MONITORING}/:id`,
    loadChildren: () =>
      import('./curricular-monitoring/curricular-monitoring.module').then(
        (m) => m.CurricularMonitoringModule,
      ),
  },
  {
    path: RoutesApp.GUIDELINES,
    loadChildren: () => import('./guidelines/guidelines.module').then((m) => m.GuidelinesModule),
  },
  {
    path: RoutesApp.COMMITTES,
    loadChildren: () => import('./committes/committes.module').then((m) => m.CommitesModule),
  },
  {
    path: `${RoutesApp.SPECIFIC_SUMARY}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/specific-summary/specific-summary.module').then(
        (m) => m.SpecificSummaryModule,
      ),
  },
  {
    path: `${RoutesApp.CURRICULAR_COMPONENT}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/currucular-component/currucular-component.module').then(
        (m) => m.CurrucularComponentModule,
      ),
  },
  {
    path: `${RoutesApp.MODULE_SYLLABUS}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/module-syllabus/module-syllabus.module').then(
        (m) => m.ModuleSyllabusModule,
      ),
  },
  {
    path: `${RoutesApp.CURRICULAR_OUTPUT}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/curricular-output/curricular-output.module').then(
        (m) => m.CurricularOutputModule,
      ),
  },
  {
    path: `${RoutesApp.ACADEMIC_CREDITS}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/academic-credit/academic-credit.module').then(
        (m) => m.AcademicCreditModule,
      ),
  },
  {
    path: `${RoutesApp.CORE_AND_SUBCORES}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/core-subcores/core-subcores.module').then(
        (m) => m.CoreSubCoreModule,
      ),
  },
  {
    path: `${RoutesApp.TECHNICAL_TECHNOLOGICAL_PROGRAMS}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/technical-tecnological/technical-tecnological.module').then(
        (m) => m.TechnicalTecnologicalModule,
      ),
  },
  {
    path: `${RoutesApp.UPDATE_AUTHORIZATIONS}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/update-authorization/update-authorization.module').then(
        (m) => m.UpdateAuthorizationModule,
      ),
  },
  {
    path: `${RoutesApp.PROBLEM_BANK}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/problem-banck/problem-banck.module').then(
        (m) => m.ProblemBanckModule,
      ),
  },
  {
    path: `${RoutesApp.STUDY_PLAN}/program/:id/module/:idmodule`,
    loadChildren: () =>
      import('./curricular-monitoring/study-plan-curriculum/study-plan-curriculum.module').then(
        (m) => m.StudyPlanCurriculumModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurricularCycleRoutingModule {}
