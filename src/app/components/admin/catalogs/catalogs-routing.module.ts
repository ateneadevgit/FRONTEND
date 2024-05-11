import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './catalogs.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: CatalogsComponent,
  },
  {
    path: `${RoutesApp.CREATE_CATALOGS}/:id`,
    loadChildren: () =>
      import('./create-catalog/create-catalog.module').then((m) => m.CreateCatalogModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsRoutingModule {}
