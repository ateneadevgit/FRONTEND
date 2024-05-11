import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleHeaderComponent } from './module-header.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleHeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleHeaderRoutingModule {}
