import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingComponentRoutingModule } from './training-component-routing.module';
import { TrainingComponentComponent } from './training-component.component';
/**
 * Modulo que permite ver toda la información importante sobre tu plan de estudios.
 * Puedes encontrar detalles sobre el programa, como el nombre y la sede.
 * Además, tienes acceso a diferentes opciones, como ver el perfil de egreso,
 * las competencias del programa, y la estructura curricular. Es una forma fácil
 * de mantenerte informado sobre tu progreso académico y explorar lo que ofrece tu
 * plan de estudios.
 */
@NgModule({
  declarations: [TrainingComponentComponent],
  imports: [CommonModule, TrainingComponentRoutingModule],
})
export class TrainingComponentModule {}
