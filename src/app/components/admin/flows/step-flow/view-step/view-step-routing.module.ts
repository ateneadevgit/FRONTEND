import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStepComponent } from './view-step.component';

const routes: Routes = [
  {
    path: '',
    component: ViewStepComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStepRoutingModule {}
