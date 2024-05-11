import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAcademicProgramProgressComponent } from './my-academic-program-progress.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
/**
 * Este módulo proporciona información al estudiante sobre su proceso académico actual,
 * indicando el estado de su programa académico en curso en términos porcentuales.
 * También muestra el total de créditos académicos del programa y los que el estudiante
 * ha completado hasta el momento. Además, a través de un botón, se le permite acceder
 * a información detallada sobre los programas ya cursados, ofreciendo una visión
 * completa de su progreso académico
 */
@NgModule({
  declarations: [MyAcademicProgramProgressComponent],
  imports: [CommonModule, CardModule, ProgressSpinnerModule],
  exports: [MyAcademicProgramProgressComponent],
})
export class MyAcademicProgramProgressModule {}
