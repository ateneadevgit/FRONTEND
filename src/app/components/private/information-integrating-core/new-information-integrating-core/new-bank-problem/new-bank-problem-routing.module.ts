import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBankProblemComponent } from './new-bank-problem.component';

const routes: Routes = [
  {
    path: '',
    component: NewBankProblemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBankProblemRoutingModule {}
