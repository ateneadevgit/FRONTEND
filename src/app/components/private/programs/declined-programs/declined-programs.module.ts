import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeclinedProgramsRoutingModule } from './declined-programs-routing.module';
import { DeclinedProgramsComponent } from './declined-programs.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
/**
 * Este módulo tiene la función de listar los programas que han sido declinados durante la
 * fase de creación por parte del vicerrector. Esto permite tener un registro claro de los
 * programas que no han cumplido con los criterios o requisitos establecidos durante el
 * proceso de creación.
 * La lista proporcionada por este módulo permite a los usuarios identificar rápidamente
 * los programas que han sido declinados, lo que puede ser útil para realizar ajustes o
 * mejoras en futuros intentos de creación de programas académicos. Además, este registro
 * puede ser utilizado para análisis y seguimiento, ayudando a identificar patrones o áreas
 * de mejora en el proceso de creación de programas académicos.
 */
@NgModule({
  declarations: [DeclinedProgramsComponent],
  imports: [CommonModule, DeclinedProgramsRoutingModule, TableModule, SharedModule],
  exports: [DeclinedProgramsComponent],
})
export class DeclinedProgramsModule {}
