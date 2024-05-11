import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteTableComponent } from './favorite-table.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteTableRoutingModule {}
