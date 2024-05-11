import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondLanguageLearningComponent } from './second-language-learning.component';

const routes: Routes = [
  {
    path: '',
    component: SecondLanguageLearningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondLanguageLearningRoutingModule {}
