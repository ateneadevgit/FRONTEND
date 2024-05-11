import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: `${RoutesApp.ACADEMIC_RECORD}`,
    loadChildren: () =>
      import('../dashboard/academic-record/academic-record.module').then(
        (m) => m.AcademicRecordModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
