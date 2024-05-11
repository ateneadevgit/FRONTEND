import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAcademicProgramComponent } from './my-academic-program.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: MyAcademicProgramComponent,
  },
  {
    path: `${RoutesApp.SUMMARY}/:idprogram/type/:type`,
    loadChildren: () =>
      import('./summary-academic/summary-academic.module').then((m) => m.SummaryAcademicModule),
  },
  {
    path: `${RoutesApp.SUMMARY}/:idprogram/type/:type/:idItem`,
    loadChildren: () =>
      import('./summary-academic/summary-academic.module').then((m) => m.SummaryAcademicModule),
  },
  {
    path: `${RoutesApp.TRAINING}/:idprogram/type/:type`,
    loadChildren: () =>
      import('./training-component/training-component.module').then(
        (m) => m.TrainingComponentModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAcademicProgramRoutingModule {}
