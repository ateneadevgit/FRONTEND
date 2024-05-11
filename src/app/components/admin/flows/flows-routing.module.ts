import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowsComponent } from './flows.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: FlowsComponent,
  },
  {
    path: `${RoutesApp.STEP_FLOW}/:id`,
    loadChildren: () => import('./step-flow/step-flow.module').then((m) => m.StepFlowModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowsRoutingModule {}
