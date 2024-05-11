import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyPlanStudentComponent } from './study-plan-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudyPlanStudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyPlanStudentRoutingModule {}
