import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicProposalsComponent } from './academic-proposals.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicProposalsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicProposalsRoutingModule {}
