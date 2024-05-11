import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectProgramsComponent } from './subject-programs.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: SubjectProgramsComponent,
  },
  {
    path: `${RoutesApp.CREATE_UPDATE_SUBJECT_GUIDE}`,
    loadChildren: () =>
      import('./create-update-subject-guide/create-update-subject-guide-routing.module').then(
        (m) => m.CreateUpdateSubjectGuideRoutingModule,
      ),
  },
  {
    path: `${RoutesApp.CREATE_UPDATE_SUBJECT_GUIDE}`,
    loadChildren: () =>
      import('./create-update-subject-guide/create-update-subject-guide-routing.module').then(
        (m) => m.CreateUpdateSubjectGuideRoutingModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectProgramsRoutingModule {}
