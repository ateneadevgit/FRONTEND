import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailCurriculumRoutingModule } from './detail-curriculum-routing.module';
import { DetailCurriculumComponent } from './detail-curriculum.component';
import { TableModule } from 'primeng/table';

/**
 * Este módulo transversal proporciona al usuario la capacidad de navegar
 * por diferentes niveles de estructura dentro del sistema educativo.
 * Permite explorar componentes, ciclos, áreas, núcleos, ejes y subnúcleos,
 * proporcionando una descripción general de cada uno. Además, el usuario
 * puede ver los elementos que dependen de cada nivel para seguir navegando,
 * lo que facilita la comprensión y la navegación fluida a través de la
 * jerarquía del sistema educativo.
 */

@NgModule({
  declarations: [DetailCurriculumComponent],
  imports: [CommonModule, DetailCurriculumRoutingModule, TableModule],
})
export class DetailCurriculumModule {}
