import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarAteneaRoutingModule } from './calendar-atenea-routing.module';
import { CalendarAteneaComponent } from './calendar-atenea.component';
import { CreateEventModule } from './create-event/create-event.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CreateEventPersonModule } from './create-event-person/create-event-person.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

/**
 * Módulo encargado de la gestión de calendario para todos los usuarios del aplicativo.
 */

@NgModule({
  declarations: [CalendarAteneaComponent],
  imports: [
    CommonModule,
    CalendarAteneaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    InputTextModule,
    SharedModule,
    MultiSelectModule,
    DropdownModule,
    CheckboxModule,
    CreateEventModule,
    CreateEventPersonModule,
    ConfirmDialogModule,
  ],
  exports: [CalendarAteneaComponent],
  providers: [ConfirmationService],
})
export class CalendarAteneaModule {}
