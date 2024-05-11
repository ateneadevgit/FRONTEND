import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyPlanCurriculumComponent } from './study-plan-curriculum.component';

const routes: Routes = [
  {
    path: '',
    component: StudyPlanCurriculumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyPlanCurriculumRoutingModule {}
