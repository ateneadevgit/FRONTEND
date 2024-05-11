import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyllabusComponent } from './syllabus.component';

const routes: Routes = [
  {
    path: '',
    component: SyllabusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyllabusRoutingModule {}
