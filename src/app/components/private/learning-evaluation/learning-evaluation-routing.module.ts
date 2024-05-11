import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningEvaluationComponent } from './learning-evaluation.component';

const routes: Routes = [
  {
    path: '',
    component: LearningEvaluationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningEvaluationRoutingModule {}
