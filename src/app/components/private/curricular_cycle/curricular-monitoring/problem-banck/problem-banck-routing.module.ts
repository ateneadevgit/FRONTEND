import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemBanckComponent } from './problem-banck.component';

const routes: Routes = [
  {
    path: '',
    component: ProblemBanckComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemBanckRoutingModule {}
