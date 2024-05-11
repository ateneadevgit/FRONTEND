import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemBankTableComponent } from './problem-bank-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
/**
 * Este módulo administra toda la lógica del banco de problemas para los roles de Director,
 * Decano, Vicerrector y Estudiante, definiendo los flujos de datos para la creación,
 * edición y eliminación de los mismos. Proporciona una plataforma centralizada donde
 * estos roles pueden colaborar en la gestión de problemas de manera eficiente y efectiva.
 * Además, garantiza que los usuarios accedan únicamente a las funcionalidades y datos
 * pertinentes a su rol, manteniendo la integridad y seguridad del sistema.
 *  */
@NgModule({
  declarations: [ProblemBankTableComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    NgxEditorModule,
    InputSwitchModule,
  ],
  exports: [ProblemBankTableComponent],
  providers: [MessageService, ConfirmationService],
})
export class ProblemBankTableModule {}
