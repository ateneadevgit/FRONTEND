import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicRecordComponent } from './academic-record.component';
import { AcademicRecordRoutingModule } from './academic-record-routing.module';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
/**
 * Este módulo ofrece a los estudiantes la posibilidad de visualizar en detalle
 * todos los subnúcleos que han cursado. Proporciona una visión general a los
 * estudiantes para revisar su progreso académico y obtener una comprensión completa de
 * su formación educativa.
 */
@NgModule({
  declarations: [AcademicRecordComponent],
  imports: [
    CommonModule,
    AcademicRecordRoutingModule,
    CardModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class AcademicRecordModule {}
