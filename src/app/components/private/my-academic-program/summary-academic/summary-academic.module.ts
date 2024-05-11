import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryAcademicRoutingModule } from './summary-academic-routing.module';
import { SummaryAcademicComponent } from './summary-academic.component';
/**
 * Este módulo transversal ofrece una plataforma para la visualización de una
 * amplia gama de información, utilizando un identificador de plantilla para
 * determinar cómo se muestra cada componente. Esto incluye la carga de imágenes
 * y la descripción de los nombres correspondientes. La información proporcionada
 * se centra en el plan de estudios y sus detalles asociados. Este enfoque flexible
 * permite una experiencia de usuario personalizada y adaptada a las necesidades
 * específicas de cada contexto de visualización dentro del plan de estudios.
 */
@NgModule({
  declarations: [SummaryAcademicComponent],
  imports: [CommonModule, SummaryAcademicRoutingModule],
  exports: [SummaryAcademicComponent],
})
export class SummaryAcademicModule {}
