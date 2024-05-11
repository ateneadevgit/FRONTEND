import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateStepComponent } from './update-step.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateStepComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStepRoutingModule {}
