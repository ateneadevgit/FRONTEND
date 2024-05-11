import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalTecnologicalComponent } from './technical-tecnological.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicalTecnologicalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalTecnologicalRoutingModule {}
