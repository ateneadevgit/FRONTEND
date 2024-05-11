import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: `${RoutesApp.NEWS}/${RoutesApp.CREATE_UPDATE_NEW}`,
    loadChildren: () =>
      import('../news/create-update-new/create-update-new.module').then(
        (m) => m.CreateUpdateNewModule,
      ),
  },
  {
    path: `${RoutesApp.NEWS}/${RoutesApp.CREATE_UPDATE_NEW}/:id`,
    loadChildren: () =>
      import('../news/create-update-new/create-update-new.module').then(
        (m) => m.CreateUpdateNewModule,
      ),
  },
  {
    path: `${RoutesApp.NEWS}/${RoutesApp.VIEW_NEW}/:id`,
    loadChildren: () => import('../news/view-new/view-new.module').then((m) => m.ViewNewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
