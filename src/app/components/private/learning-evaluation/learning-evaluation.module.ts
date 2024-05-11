import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { LearningEvaluationComponent } from './learning-evaluation.component';
import { LearningEvaluationRoutingModule } from './learning-evaluation-routing.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TreeTableModule } from 'primeng/treetable';
/**
 * Para Docentes:

Acceden al módulo de creación, edición y eliminación de evaluaciones de aprendizaje.
Se les solicita seleccionar el programa académico y el nivel correspondiente.
Se les muestra una lista de evaluaciones asociadas con la selección anterior.
Los docentes pueden crear nuevas evaluaciones, editar las existentes y eliminarlas según sea necesario.

Para Estudiantes:
Acceden al módulo de visualización de evaluaciones de aprendizaje.
Se les solicita seleccionar el programa académico y el nivel relacionado con su perfil.
Se les muestra una lista de evaluaciones asociadas con los programas académicos a los que están vinculados.
Los estudiantes pueden ver todas las evaluaciones de aprendizaje creadas por los docentes, pero no tienen la capacidad de crear, editar o eliminar evaluaciones.
 */
@NgModule({
  declarations: [LearningEvaluationComponent],
  imports: [
    LearningEvaluationRoutingModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputSwitchModule,
    InputTextModule,
    TreeTableModule,
    DropdownModule,
    SidebarModule,
    FormsModule,
    CommonModule,
    DialogModule,
    SharedModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    CardModule,
  ],
  providers: [ConfirmationService],
})
export class LearningEvaluationModule {}
