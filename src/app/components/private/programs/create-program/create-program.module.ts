import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProgramRoutingModule } from './create-program-routing.module';
import { CreateProgramComponent } from './create-program.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { WorkflowModule } from './workflow/workflow.module';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FilterDirectorPipe } from './pipes/filter-director.pipe';
import { TraceabilityModule } from './traceability/traceability.module';
import { SyllabusModule } from './syllabus/syllabus.module';
/**
 * Este módulo gestiona la integración de varios componentes relacionados con la creación
 *  y renovación de programas académicos, tanto para programas formales como no formales.
 * Específicamente, se encarga de asignar un director al programa y sirve como núcleo central
 * para todo el flujo de trabajo relacionado.
 * Entre las funciones principales de este módulo se encuentran:
 * Gestión de la creación y renovación de programas académicos.
 * Asignación de un director al programa.
 * Integración de componentes necesarios para el proceso de creación y renovación.
 * Coordinación de flujos de trabajo entre diferentes partes del sistema relacionadas
 * con la gestión de programas académicos.
 * En resumen, este módulo proporciona una plataforma centralizada para gestionar todas
 * las actividades relacionadas con la creación y renovación de programas académicos,
 * garantizando una coordinación eficiente y una asignación adecuada de responsabilidades.
 */
@NgModule({
  declarations: [CreateProgramComponent, FilterDirectorPipe],
  imports: [
    CommonModule,
    CreateProgramRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ToastModule,
    WorkflowModule,
    DialogModule,
    InputTextModule,
    TraceabilityModule,
    SyllabusModule,
  ],
  providers: [MessageService],
})
export class CreateProgramModule {}
