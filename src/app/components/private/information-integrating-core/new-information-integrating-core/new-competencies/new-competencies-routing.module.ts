import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCompetenciesComponent } from './new-competencies.component';

const routes: Routes = [
  {
    path: '',
    component: NewCompetenciesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCompetenciesRoutingModule {}
