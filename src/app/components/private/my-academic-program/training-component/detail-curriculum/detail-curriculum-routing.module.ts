import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCurriculumComponent } from './detail-curriculum.component';

const routes: Routes = [
  {
    path: '',
    component: DetailCurriculumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCurriculumRoutingModule {}
