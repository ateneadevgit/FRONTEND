import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponentComponent } from './training-component.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponentComponent,
  },
  {
    path: `${RoutesApp.STUDY_PLAN}`,
    loadChildren: () =>
      import('./study-plan-student/study-plan-student.module').then(
        (m) => m.StudyPlanStudentModule,
      ),
  },
  {
    path: `${RoutesApp.STUDY_PLAN}/detail/:idItem`,
    loadChildren: () =>
      import('./detail-curriculum/detail-curriculum.module').then((m) => m.DetailCurriculumModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingComponentRoutingModule {}
