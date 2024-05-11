import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewNewComponent } from './view-new.component';

const routes: Routes = [
  {
    path: '',
    component: ViewNewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewNewRoutingModule {}
