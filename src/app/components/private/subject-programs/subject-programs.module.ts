import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectProgramsComponent } from './subject-programs.component';
import { SubjectProgramsRoutingModule } from './subject-programs-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CreateUpdateSubjectGuideModule } from './create-update-subject-guide/create-update-subject-guide.module';
import { TreeTableModule } from 'primeng/treetable';
import { FilterDirectorPipe2 } from './pipes/filter-director.pipe';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommentsTwoModule } from './comments/comments-two.module';
import { SidebarModule } from 'primeng/sidebar';
/**
 * 
Este módulo brinda la capacidad de crear, actualizar y mantenerse informado sobre los programas de asignaturas. Permite a los usuarios crear guías de asignaturas de manera eficiente, actualizando la información cuando sea necesario y recibiendo notificaciones relevantes para mantenerse al día con los cambios. Es una herramienta integral para gestionar y administrar los programas de asignaturas de manera efectiva.
 */
@NgModule({
  declarations: [SubjectProgramsComponent, FilterDirectorPipe2],
  imports: [
    SubjectProgramsRoutingModule,
    CreateUpdateSubjectGuideModule,
    ReactiveFormsModule,
    TreeTableModule,
    CommentsTwoModule,
    SidebarModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    DialogModule,
    SharedModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    CardModule,
  ],
})
export class SubjectProgramsModule {}
