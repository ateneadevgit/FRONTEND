import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProgramComponent } from './edit-program.component';
import { EditSummaryProgramComponent } from './edit-summary-program/edit-summary-program.component';

const routes: Routes = [
  {
    path: '',
    component: EditProgramComponent,
  },
  {
    path: 'summary/:idmodule',
    component: EditSummaryProgramComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProgramRoutingModule {}
