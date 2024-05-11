import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversalEditorComponent } from './universal-editor.component';

const routes: Routes = [
  {
    path: '',
    component: UniversalEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversalEditorRoutingModule {}
