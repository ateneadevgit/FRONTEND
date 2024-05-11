import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSubcoreComponent } from './view-subcore.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSubcoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSubcoreRoutingModule {}
