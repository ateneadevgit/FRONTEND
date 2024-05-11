import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleSyllabusComponent } from './module-syllabus.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleSyllabusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleSyllabusRoutingModule {}
