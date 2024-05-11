import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsActiveComponent } from './programs-active.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
/**
 *  Este módulo incorpora un widget que enumera los programas en construcción
 * y proporciona información sobre su estado específicamente para los
 * funcionarios académicos. Permite a los usuarios acceder fácilmente a
 * los programas en construcción y obtener detalles relevantes sobre su estado actual.
 */
@NgModule({
  declarations: [ProgramsActiveComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ButtonModule,
  ],
  exports: [ProgramsActiveComponent],
})
export class ProgramsActiveModule {}
