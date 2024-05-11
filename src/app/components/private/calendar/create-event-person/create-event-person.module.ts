import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CreateEventPersonRoutingModule } from './create-event-person-routing.module';
import { CreateEventPersonComponent } from './create-event-person.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
/**
 * Módulo encargado de la creación y edición de un evento de
 * calendario que afecta solo al usuario que lo crea o edita.
 */
@NgModule({
  declarations: [CreateEventPersonComponent],
  imports: [
    CommonModule,
    CreateEventPersonRoutingModule,
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
  exports: [CreateEventPersonComponent],
})
export class CreateEventPersonModule {}
