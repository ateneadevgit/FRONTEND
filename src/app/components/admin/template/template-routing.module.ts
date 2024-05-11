import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
  },
  {
    path: `${RoutesApp.UPDATE_TEMPLATE}/:id`,
    loadChildren: () =>
      import('./create-template/create-template.module').then((m) => m.CreateTemplateModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
