import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewNifsComponent } from './view-nifs.component';

const routes: Routes = [
  {
    path: '',
    component: ViewNifsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewNifsRoutingModule {}
