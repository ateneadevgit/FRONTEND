import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCatalogComponent } from './create-catalog.component';

const routes: Routes = [
  {
    path: '',
    component: CreateCatalogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCatalogRoutingModule {}
