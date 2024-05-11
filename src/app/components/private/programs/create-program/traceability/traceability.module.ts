import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraceabilityRoutingModule } from './traceability-routing.module';
import { TraceabilityComponent } from './traceability.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
/**
 * Este módulo representa el último paso en el flujo de creación de un programa académico.
 * Requiere que el vicerrector complete la información sobre fechas y registros para
 * finalizar el proceso y activar el programa dentro del aplicativo. Una vez que se
 * completan estos detalles, el programa se considera como activo y disponible para su
 * uso en el sistema. Este módulo asegura que todos los aspectos administrativos necesarios
 * se completen antes de que el programa esté completamente funcional y accesible para los
 * usuarios finales.
 */
@NgModule({
  declarations: [TraceabilityComponent],
  imports: [
    CommonModule,
    TraceabilityRoutingModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
  ],
  exports: [TraceabilityComponent],
  providers: [MessageService],
})
export class TraceabilityModule {}
