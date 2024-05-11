import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurricularMonitoringComponent } from './curricular-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: CurricularMonitoringComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurricularMonitoringRoutingModule {}
