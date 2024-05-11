import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { NewBankProblemComponent } from './new-bank-problem.component';
import { NewBankProblemRoutingModule } from './new-bank-problem-routing.module';
import { ProblemBankTableModule } from '../../../problem-bank/problem-bank-table/problem-bank-table.module';
/**
 * Este módulo incorpora la funcionalidad del banco de problemas,
 * que ha sido desarrollado en el modulo ProblemBankTableModule . Utiliza el banco de problemas
 * como una propiedad de entrada, integrándolo desde el módulo de NIF
 * (Núcleo Integrador de Formación). Esta integración permite acceder y
 * utilizar el banco de problemas dentro del contexto del NIF, lo que enriquece
 * la funcionalidad del módulo y facilita la gestión de problemas dentro de la plataforma
 */
@NgModule({
  declarations: [NewBankProblemComponent],
  imports: [
    CommonModule,
    NewBankProblemRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    ProblemBankTableModule,
  ],
  exports: [NewBankProblemComponent],
})
export class NewBankProblemModule {}
