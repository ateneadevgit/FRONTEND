import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateSecondLanguageComponent } from './create-update-second-language.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdateSecondLanguageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUpdateSecondLanguageRoutingModule {}
