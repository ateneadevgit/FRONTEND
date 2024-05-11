import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/enums/routes.enum';
import { ThemeComponent } from './shared/theme/theme.component';
import { sessionGuard } from './guards/session.guard';
import { LogoutComponent } from './components/public/logout/logout.component';

const routes: Routes = [
  {
    path: RoutesApp.LOGIN,
    loadChildren: () => import('./components/public/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: RoutesApp.LOGOUT,
    component: LogoutComponent,
    /* loadChildren: () =>
      import('./components/public/logout/logout.module').then((m) => m.LogoutModule), */
  },
  {
    path: RoutesApp.DASHBOARD,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: RoutesApp.PROGRAMS,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/programs/programs.module').then((m) => m.ProgramsModule),
  },
  {
    path: RoutesApp.SUBJECT_PROGRAMS,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/subject-programs/subject-programs.module').then(
        (m) => m.SubjectProgramsModule,
      ),
  },
  {
    path: RoutesApp.LEARNING_EVALUACION,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/learning-evaluation/learning-evaluation.module').then(
        (m) => m.LearningEvaluationModule,
      ),
  },
  {
    path: RoutesApp.CURRICULAR_CYCLE,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/curricular_cycle/curricular-cycle.module').then(
        (m) => m.CurricularCycleModule,
      ),
  },
  {
    path: RoutesApp.CALENDAR,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/calendar/calendar-atenea.module').then(
        (m) => m.CalendarAteneaModule,
      ),
  },
  {
    path: RoutesApp.NEWS,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () => import('./components/private/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: RoutesApp.MY_ACADEMIC_PROGRAM,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/my-academic-program/my-academic-program.module').then(
        (m) => m.MyAcademicProgramModule,
      ),
  },
  {
    path: RoutesApp.PROBLEM_BANK,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/problem-bank/problem-bank.module').then(
        (m) => m.ProblemBankModule,
      ),
  },
  {
    path: RoutesApp.DIRECTORY,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/directory/directory.module').then((m) => m.DirectoryModule),
  },
  {
    path: RoutesApp.INFORMATION_INTEGRATING_CORE,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import(
        './components/private/information-integrating-core/information-integrating-core.module'
      ).then((m) => m.InformationIntegratingCoreModule),
  },
  {
    path: RoutesApp.FACULTY,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/faculty/faculty.module').then((m) => m.FacultyModule),
  },
  {
    path: RoutesApp.SECONG_LENGUAGE_LEARNINNG,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/second-language-learning/second-language-learning.module').then(
        (m) => m.SecondLanguageLearningModule,
      ),
  },
  {
    path: RoutesApp.SEARCH,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: RoutesApp.CATALGOS,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/admin/catalogs/catalogs.module').then((m) => m.CatalogsModule),
  },
  {
    path: RoutesApp.ROLES,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () => import('./components/admin/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: RoutesApp.EPORTAFOLIO,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/private/eportafolio/eportafolio.module').then(
        (m) => m.EportafolioModule,
      ),
  },
  {
    path: RoutesApp.MODULES,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/admin/modules/modules.module').then((m) => m.ModulesModule),
  },
  {
    path: RoutesApp.SETTINGS,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/admin/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: RoutesApp.DOC_GUIDELINES,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/admin/doc-guidelines/doc-guidelines.module').then(
        (m) => m.DocGuidelinesModule,
      ),
  },
  {
    path: RoutesApp.DOC_INSTRUMENTS,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/admin/doc-instruments/doc-instruments.module').then(
        (m) => m.DocInstrumentsModule,
      ),
  },
  {
    path: RoutesApp.TEMPLATE,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () =>
      import('./components/admin/template/template.module').then((m) => m.TemplateModule),
  },
  {
    path: RoutesApp.FLOWS,
    canActivate: [sessionGuard],
    component: ThemeComponent,
    loadChildren: () => import('./components/admin/flows/flows.module').then((m) => m.FlowsModule),
  },
  {
    path: '',
    redirectTo: RoutesApp.LOGIN,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
