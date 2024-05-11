import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructionProgramsRoutingModule } from './construction-programs-routing.module';
import { ConstructionProgramsComponent } from './construction-programs.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
/**
 *
 * Este módulo lista los programas en construcción que han sido creados por el decano y
 * autorizados por el vicerrector. Proporciona un acceso directo a los programas en proceso
 * de construcción, permitiendo a los usuarios continuar con la elaboración de cada programa.
 * Además, ofrece la posibilidad de crear un nuevo programa o solicitar la renovación de uno
 * existente a través de un botón específico. Esto facilita la gestión y el seguimiento de los
 * programas en desarrollo, asegurando que se cumplan los procesos de autorización y construcción
 * de manera eficiente.
 */
@NgModule({
  declarations: [ConstructionProgramsComponent],
  imports: [
    CommonModule,
    ConstructionProgramsRoutingModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  exports: [ConstructionProgramsComponent],
})
export class ConstructionProgramsModule {}
