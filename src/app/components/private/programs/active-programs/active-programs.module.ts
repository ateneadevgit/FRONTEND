import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveProgramsRoutingModule } from './active-programs-routing.module';
import { ActiveProgramsComponent } from './active-programs.component';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogActiveEditModule } from '../edit-program/dialog-active-edit/dialog-active-edit.module';
import { InputTextModule } from 'primeng/inputtext';

/**
 * Este módulo permite visualizar una tabla con todos los programas activos,
 * proporcionando información detallada de cada uno de ellos. Los usuarios pueden acceder
 * a esta tabla para obtener una visión general de los programas en funcionamiento,
 * incluyendo detalles como el nombre del programa, la fecha de inicio, la duración, etc.
 * Además, el módulo ofrece la funcionalidad de acceder a otros módulos para editar y
 * renovar los programas existentes. Esto permite a los administradores o responsables
 * realizar cambios y actualizaciones en los programas de manera eficiente y precisa,
 * asegurando que la información esté siempre actualizada y refleje con precisión el
 * estado de cada programa.
 */

@NgModule({
  declarations: [ActiveProgramsComponent],
  imports: [
    CommonModule,
    ActiveProgramsRoutingModule,
    TableModule,
    InputSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    DialogActiveEditModule,
    InputTextModule,
  ],
  exports: [ActiveProgramsComponent],
  providers: [ConfirmationService, MessageService],
})
export class ActiveProgramsModule {}
