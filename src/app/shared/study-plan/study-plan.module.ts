import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyPlanRoutingModule } from './study-plan-routing.module';
import { StudyPlanComponent } from './study-plan.component';
import { DialogModule } from 'primeng/dialog';
import { CreateComponentModule } from './create-component/create-component.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddLevelModule } from './add-level/add-level.module';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { NodoModule } from './nodo/nodo.module';
/**
 * 
Este módulo permite a los usuarios crear, editar y visualizar planes de estudios de manera dinámica. Proporciona una interfaz intuitiva que facilita la gestión de los planes de estudio, lo que permite a los usuarios diseñar y ajustar los programas educativos según sea necesario. Además, ofrece funcionalidades interactivas que mejoran la experiencia del usuario al trabajar con los planes de estudio.
 */
@NgModule({
  declarations: [StudyPlanComponent],
  imports: [
    CommonModule,
    StudyPlanRoutingModule,
    DialogModule,
    CreateComponentModule,
    ConfirmDialogModule,
    ToastModule,
    AddLevelModule,
    TooltipModule,
    TableModule,
    NodoModule,
  ],
  exports: [StudyPlanComponent],
  providers: [MessageService, ConfirmationService],
})
export class StudyPlanModule {}
