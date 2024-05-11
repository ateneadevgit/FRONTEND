import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/enums/routes.enum';
import { InformationIntegratingCoreComponent } from './information-integrating-core.component';

const routes: Routes = [
  {
    path: '',
    component: InformationIntegratingCoreComponent,
  },
  {
    path: RoutesApp.NEW_INFORMATION_INTEGRATING_CORE,
    loadChildren: () =>
      import(
        '../information-integrating-core/new-information-integrating-core/new-information-integrating-core.module'
      ).then((m) => m.NewInformationIntegratingCoreModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationIntegratingCoreRoutingModule {}
