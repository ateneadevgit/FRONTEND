import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedTableComponent } from './shared-table.component';

const routes: Routes = [
  {
    path: '',
    component: SharedTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedTableRoutingModule {}
