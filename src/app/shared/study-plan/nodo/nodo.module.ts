import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodoComponent } from './nodo.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { AddLevelModule } from '../add-level/add-level.module';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { CreateComponentModule } from '../create-component/create-component.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
/**
 * Este módulo integra la funcionalidad de mostrar un componente padre junto con sus hijos que dependen de él. Permite la creación de más elementos hijos o incluso un nuevo nivel para el plan de estudios. Esta capacidad facilita la estructuración y organización jerárquica de los elementos del plan de estudios, lo que proporciona una experiencia de usuario más completa y flexible en la gestión de programas educativos.
 */
@NgModule({
  declarations: [NodoComponent],
  imports: [
    CommonModule,
    DialogModule,
    ToastModule,
    AddLevelModule,
    TooltipModule,
    TableModule,
    CreateComponentModule,
    ConfirmDialogModule,
  ],
  exports: [NodoComponent],
  providers: [MessageService, ConfirmationService],
})
export class NodoModule {}
