import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSummaryProgramComponent } from './edit-summary-program.component';
import { EditSummaryProgramRoutingModule } from './edit-summary-program-routing.module';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { SidebarModule } from 'primeng/sidebar';
import { CommentsModule } from '../../create-program/workflow/comments/comments.module';
import { MessageService, SharedModule } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'src/app/shared/editor/editor.module';
import { EditCurricularComponentsModule } from './edit-curricular-components/edit-curricular-components.module';
import { EditStudyPlanModule } from './edit-study-plan/edit-study-plan.module';
import { EditSyllabusModule } from './edit-syllabus/edit-syllabus.module';
import { EditAcademicCreditsModule } from './edit-academic-credits/edit-academic-credits.module';
import { EditCoreSubcoreModule } from './edit-core-subcore/edit-core-subcore.module';
import { EditCurricularOutputModule } from './edit-curricular-output/edit-curricular-output.module';

/**
 * Este módulo se encarga de llevar a cabo la edición de cada uno de los módulos de
 * un programa académico. Desde la creación de resúmenes hasta la edición de silabos o
 * planes de estudio, este módulo aborda todos los aspectos relacionados con la
 * información almacenada del programa académico.
 * Su función principal es proporcionar a los usuarios las herramientas
 * necesarias para modificar y actualizar la información de los diferentes módulos
 * que componen el programa académico. Esto puede incluir la actualización de contenidos,
 * la corrección de errores, la incorporación de nuevas secciones o la eliminación de
 * información obsoleta.
 * En resumen, este módulo es fundamental para mantener actualizada y precisa
 * la información de un programa académico, permitiendo a los responsables realizar
 * cambios de manera eficiente y garantizando la calidad y coherencia de los contenidos.
 */

@NgModule({
  declarations: [EditSummaryProgramComponent],
  imports: [
    CommonModule,
    EditSummaryProgramRoutingModule,
    ButtonModule,
    TreeTableModule,
    SidebarModule,
    CommentsModule,
    SharedModule,
    TabViewModule,
    DialogModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    EditCurricularComponentsModule,
    EditStudyPlanModule,
    EditSyllabusModule,
    EditAcademicCreditsModule,
    EditCoreSubcoreModule,
    EditCurricularOutputModule,
  ],
  exports: [EditSummaryProgramComponent],
  providers: [MessageService],
})
export class EditSummaryProgramModule {}
