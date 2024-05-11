import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRagiComponent } from './new-ragi.component';

const routes: Routes = [
  {
    path: '',
    component: NewRagiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRagiRoutingModule {}
