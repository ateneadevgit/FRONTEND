import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocInstrumentsComponent } from './doc-instruments.component';

const routes: Routes = [
  {
    path: '',
    component: DocInstrumentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocInstrumentsRoutingModule {}
