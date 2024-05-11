import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocGuidelinesComponent } from './doc-guidelines.component';

const routes: Routes = [
  {
    path: '',
    component: DocGuidelinesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocGuidelinesRoutingModule {}
