import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarDashboardComponent } from './calendar-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarDashboardRoutingModule {}
