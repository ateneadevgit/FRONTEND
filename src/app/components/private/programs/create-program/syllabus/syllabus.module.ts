import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SyllabusRoutingModule } from './syllabus-routing.module';
import { SyllabusComponent } from './syllabus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
/**
 * Este módulo permite al usuario crear los sílabos de los subnúcleos,
 * solicitando toda la información necesaria para su completitud.
 * Una vez creado, proporciona la opción de descargar un PDF con la información
 * ingresada. Ofrece una interfaz intuitiva y guiada para facilitar el proceso
 * de creación del sílabo, asegurando que se incluyan todos los detalles relevantes
 * para el subnúcleo. Además, garantiza que los usuarios puedan acceder fácilmente al
 * sílabo creado en formato PDF para su posterior consulta o distribución.
 */
@NgModule({
  declarations: [SyllabusComponent],
  imports: [
    CommonModule,
    SyllabusRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    InputTextareaModule,
    MultiSelectModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
  ],
  exports: [SyllabusComponent],
})
export class SyllabusModule {}
