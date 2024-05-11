import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { SidebarModule } from 'primeng/sidebar';
import { CommentsModule } from './comments/comments.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveCampusModule } from './approve-campus/approve-campus.module';
import { TableModule } from 'primeng/table';
/**
 * Este módulo se encarga de gestionar la visualización de los documentos asociados
 * a cada uno de los pasos en la creación de un programa académico.
 * Permite a los usuarios ver y revisar los documentos que se agregan durante
 * el proceso de creación del programa, así como también aprobarlos. Además,
 * facilita la gestión del flujo de trabajo, permitiendo que el director,
 * el decano y el vicerrector realicen las revisiones necesarias y tomen decisiones
 * en cada etapa.
 * Una de las funcionalidades clave de este módulo es la capacidad de agregar
 * resúmenes a los pasos y enviarlos para revisión por parte del decano y el vicerrector.
 * Esto agiliza el proceso de revisión y garantiza que se cumplan con los estándares de
 * calidad establecidos.
 * Además, el módulo proporciona acceso rápido a submódulos específicos, como la
 * creación de un plan de estudios, el desarrollo de un RAE (Reglamento de Evaluación
 * y Acreditación), la internacionalización, entre otros. Esto permite a los usuarios
 * trabajar de manera eficiente en cada aspecto del programa académico, asegurando su
 * correcta elaboración y cumplimiento de los requisitos institucionales.
 */
@NgModule({
  declarations: [WorkflowComponent],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
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
    ApproveCampusModule,
    TableModule,
  ],
  exports: [WorkflowComponent],
  providers: [MessageService],
})
export class WorkflowModule {}
