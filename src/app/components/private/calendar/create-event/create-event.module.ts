import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CreateEventRoutingModule } from './create-event-routing.module';
import { CreateEventComponent } from './create-event.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
/**
 * Módulo encargado de la creación y edición de un evento a nivel traversal para el calendario.
 */
@NgModule({
  declarations: [CreateEventComponent],
  imports: [
    CommonModule,
    CreateEventRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    SharedModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
  ],
  exports: [CreateEventComponent],
})
export class CreateEventModule {}
