import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicRecordComponent } from './academic-record.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicRecordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicRecordRoutingModule {}
