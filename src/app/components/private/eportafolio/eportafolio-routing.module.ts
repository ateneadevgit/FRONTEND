import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EportafolioComponent } from './eportafolio.component';

const routes: Routes = [
  {
    path: '',
    component: EportafolioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EportafolioRoutingModule {}
