import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesactivatedProgramsRoutingModule } from './desactivated-programs-routing.module';
import { DesactivatedProgramsComponent } from './desactivated-programs.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
/**
 * Este módulo se encarga de listar los programas académicos que estaban activos en el
 * sistema pero que han sido desactivados posteriormente. La función principal es
 * proporcionar una visión clara de los programas que ya no están disponibles en el
 * sistema, ya sea porque han finalizado, han sido suspendidos o por cualquier otra razón.
 * Al listar estos programas desactivados, el módulo permite a los usuarios tener un
 * registro histórico de los programas que estuvieron activos en algún momento,
 * lo que puede ser útil para realizar análisis comparativos, seguimiento de
 * cambios en la oferta académica, o para cualquier otro propósito de gestión o
 * auditoría. Además, proporciona una manera de mantener organizada y accesible
 * esta información para futuras referencias.
 */
@NgModule({
  declarations: [DesactivatedProgramsComponent],
  imports: [CommonModule, DesactivatedProgramsRoutingModule, TableModule, SharedModule],
  exports: [DesactivatedProgramsComponent],
})
export class DesactivatedProgramsModule {}
