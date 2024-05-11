import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSummaryProgramComponent } from './edit-summary-program.component';

const routes: Routes = [
  {
    path: '',
    component: EditSummaryProgramComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSummaryProgramRoutingModule {}
