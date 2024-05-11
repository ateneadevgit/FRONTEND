import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { NewCompetenciesComponent } from './new-competencies.component';
import { NewCompetenciesRoutingModule } from './new-competencies-routing.module';
import { CompetenciesModule } from '../../../problem-bank/competencies/competencies.module';
/**
 * Este módulo incorpora la funcionalidad de competencias, que ha sido desarrollada
 * en el módulo CompetenciesModule. Utiliza las competencias como una propiedad de entrada, integrándolas
 * desde el módulo de NIF (Núcleo Integrador de Formación). Esta integración permite
 * acceder y utilizar las competencias dentro del contexto del NIF, lo que enriquece la
 * funcionalidad del módulo y facilita la gestión de competencias dentro de la plataforma.
 */
@NgModule({
  declarations: [NewCompetenciesComponent],
  imports: [
    CommonModule,
    NewCompetenciesRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    CompetenciesModule,
  ],
  exports: [NewCompetenciesComponent],
})
export class NewCompetenciesModule {}
