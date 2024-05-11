import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInformationIntegratingComponent } from './home-information-integrating.component';

const routes: Routes = [
  {
    path: '',
    component: HomeInformationIntegratingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeInformationIntegratingRoutingModule {}
