import { CreateUpdateSubjectGuideComponent } from './create-update-subject-guide.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdateSubjectGuideComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUpdateSubjectGuideRoutingModule {}
