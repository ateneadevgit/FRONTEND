import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryAcademicComponent } from './summary-academic.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryAcademicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryAcademicRoutingModule {}
