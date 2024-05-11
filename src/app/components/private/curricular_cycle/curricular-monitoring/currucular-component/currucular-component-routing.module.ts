import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrucularComponentComponent } from './currucular-component.component';

const routes: Routes = [
  {
    path: '',
    component: CurrucularComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrucularComponentRoutingModule {}
