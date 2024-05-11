import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTemplateComponent } from './create-template.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTemplateRoutingModule {}
