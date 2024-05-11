import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepFlowComponent } from './step-flow.component';

const routes: Routes = [
  {
    path: '',
    component: StepFlowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepFlowRoutingModule {}
