import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemBankComponent } from './problem-bank.component';

const routes: Routes = [
  {
    path: '',
    component: ProblemBankComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemBankRoutingModule {}
