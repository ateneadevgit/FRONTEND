import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicCreditComponent } from './academic-credit.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicCreditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicCreditRoutingModule {}
