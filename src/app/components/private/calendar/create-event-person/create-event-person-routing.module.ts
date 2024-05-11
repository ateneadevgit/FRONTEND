import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventPersonComponent } from './create-event-person.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEventPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEventPersonRoutingModule {}
