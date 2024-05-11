import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateAuthorizationComponent } from './update-authorization.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateAuthorizationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAuthorizationRoutingModule {}
