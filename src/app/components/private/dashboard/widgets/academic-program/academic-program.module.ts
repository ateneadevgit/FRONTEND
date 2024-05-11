import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicProgramComponent } from './academic-program.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Este módulo incorpora un widget dedicado a la visualización
 * de los programas activos en la plataforma.
 * Proporciona funcionalidades de filtrado por sede,
 * facultad, nivel de formación y modalidad, lo que permite
 * a los usuarios encontrar rápidamente la información relevante
 * según sus necesidades específicas.
 */
@NgModule({
  declarations: [AcademicProgramComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AcademicProgramComponent],
})
export class AcademicProgramModule {}
