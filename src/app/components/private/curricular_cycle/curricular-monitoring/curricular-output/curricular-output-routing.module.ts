import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurricularOutputComponent } from './curricular-output.component';

const routes: Routes = [
  {
    path: '',
    component: CurricularOutputComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurricularOutputRoutingModule {}
