import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSecondLanguageComponent } from './home-second-language.component';

const routes: Routes = [
  {
    path: '',
    component: HomeSecondLanguageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSecondLanguageRoutingModule {}
