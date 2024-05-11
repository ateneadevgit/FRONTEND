import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsCurrentComponent } from './programs-current.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
/**
 *  Este módulo incorpora un widget que enumera los programas activos
 * y proporciona información sobre su estado específicamente para los
 * funcionarios académicos. Permite a los usuarios acceder fácilmente a
 * los programas vigentes y obtener detalles relevantes sobre su estado actual.
 */
@NgModule({
  declarations: [ProgramsCurrentComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ButtonModule,
  ],
  exports: [ProgramsCurrentComponent],
})
export class ProgramsCurrentModule {}
