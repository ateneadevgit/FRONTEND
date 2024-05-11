import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateNewComponent } from './create-update-new.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdateNewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUpdateNewRoutingModule {}
