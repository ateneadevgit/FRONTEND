import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificSummaryComponent } from './specific-summary.component';

const routes: Routes = [
  {
    path: '',
    component: SpecificSummaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificSummaryRoutingModule {}
