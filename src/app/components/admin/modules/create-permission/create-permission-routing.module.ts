import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePermissionComponent } from './create-permission.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePermissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePermissionRoutingModule {}
