import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveCampusRoutingModule } from './approve-campus-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveCampusComponent } from './approve-campus.component';
/**
 * Este módulo se encarga de gestionar la aprobación por parte del vicerrector
 * de las sedes en las que opera un programa académico durante el proceso de
 * creación del mismo. Permite al vicerrector revisar y aprobar las sedes propuestas
 * para la operación del programa académico, asegurando que se cumplan con los
 * requisitos y criterios establecidos. Una vez que el vicerrector aprueba las
 * sedes, el programa académico puede avanzar al siguiente paso del proceso de creación.
 * Este módulo proporciona una interfaz intuitiva para que el vicerrector pueda revisar
 * y tomar decisiones con respecto a las sedes propuestas, agilizando así el proceso de
 * creación del programa académico.
 */
@NgModule({
  declarations: [ApproveCampusComponent],
  imports: [
    CommonModule,
    ApproveCampusRoutingModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ApproveCampusComponent],
})
export class ApproveCampusModule {}
