import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSubcoreComponent } from './new-subcore.component';

const routes: Routes = [
  {
    path: '',
    component: NewSubcoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSubcoreRoutingModule {}
