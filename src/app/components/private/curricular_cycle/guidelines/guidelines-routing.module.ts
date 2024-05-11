import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidelinesComponent } from './guidelines.component';

const routes: Routes = [
  {
    path: '',
    component: GuidelinesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuidelinesRoutingModule {}
