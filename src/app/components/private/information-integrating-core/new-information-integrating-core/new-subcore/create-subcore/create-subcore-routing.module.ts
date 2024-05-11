import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSubcoreComponent } from './create-subcore.component';

const routes: Routes = [
  {
    path: '',
    component: CreateSubcoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSubcoreRoutingModule {}
