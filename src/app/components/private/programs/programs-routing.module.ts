import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsComponent } from './programs.component';
import { RoutesApp } from 'src/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: ProgramsComponent,
  },
  {
    path: `${RoutesApp.CREATE_PROGRAM}/:id`,
    loadChildren: () =>
      import('./create-program/create-program.module').then((m) => m.CreateProgramModule),
  },
  {
    path: `${RoutesApp.CREATE_PROGRAM}/:id/${RoutesApp.CURRICULUM}/step/:idstep/workflow/:idworkflow`,
    loadChildren: () =>
      import('./create-program/curriculum/curriculum.module').then((m) => m.CurriculumModule),
  },
  {
    path: `${RoutesApp.CREATE_PROGRAM}/:id/${RoutesApp.SYLLABUS}/step/:idstep/workflow/:idworkflow`,
    loadChildren: () =>
      import('./create-program/syllabus/syllabus.module').then((m) => m.SyllabusModule),
  },
  {
    path: `${RoutesApp.CREATE_PROGRAM}/:id/${RoutesApp.RAE}/step/:idstep/workflow/:idworkflow/type/:idtype/condition/:condition`,
    loadChildren: () =>
      import('./create-program/workflow/universal-editor/universal-editor.module').then(
        (m) => m.UniversalEditorModule,
      ),
  },
  {
    path: `${RoutesApp.EDIT_PROGRAM}/:id`,
    loadChildren: () =>
      import('./edit-program/edit-program.module').then((m) => m.EditProgramModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsRoutingModule {}
