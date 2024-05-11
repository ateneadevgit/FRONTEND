import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarAteneaComponent } from './calendar-atenea.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarAteneaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarAteneaRoutingModule {}
