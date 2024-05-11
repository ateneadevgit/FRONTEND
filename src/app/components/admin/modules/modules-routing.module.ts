import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
  },
  {
    path: `${RoutesApp.PERMISSION_MODULE}/:id`,
    loadChildren: () =>
      import('./create-permission/create-permission.module').then((m) => m.CreatePermissionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
