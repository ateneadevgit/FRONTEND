import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedTableRoutingModule } from './shared-table-routing.module';
import { SharedTableComponent } from './shared-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
/**
 *  Este módulo presenta una lista de los documentos que han sido compartidos
 * específicamente con el usuario que accede al mismo.
 * Proporciona una forma conveniente para que los usuarios accedan rápidamente a
 * los documentos que han sido compartidos con ellos, lo que les permite mantenerse al
 * tanto de la información relevante y acceder a los recursos necesarios de manera eficiente."
 */
@NgModule({
  declarations: [SharedTableComponent],
  imports: [
    CommonModule,
    SharedTableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
  ],
  exports: [SharedTableComponent],
})
export class SharedTableModule {}
