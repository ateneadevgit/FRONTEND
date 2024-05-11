import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreSubcoresComponent } from './core-subcores.component';

const routes: Routes = [
  {
    path: '',
    component: CoreSubcoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreSubCoreRoutingModule {}
