import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/enums/routes.enum';
import { NewInformationIntegratingCoreComponent } from './new-information-integrating-core.component';

const routes: Routes = [
  {
    path: '',
    component: NewInformationIntegratingCoreComponent,
  },
  {
    path: RoutesApp.VIEW_INF_INT_CORE_EDIT,
    loadChildren: () =>
      import(
        '../new-information-integrating-core/new-subcore/create-subcore/create-subcore.module'
      ).then((m) => m.CreateSubcoreModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewInformationIntegratingCoreRoutingModule {}
