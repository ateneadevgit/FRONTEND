import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
/**
 *  Este módulo presenta información estadística sobre la población de la fundación,
 * proporcionando datos sobre la cantidad de matriculados por género y el número de
 * matriculados por facultad. Permite una visualización clara y detallada de la distribución
 * demográfica de los estudiantes en función de estos criterios.
 */
@NgModule({
  declarations: [StatisticComponent],
  imports: [
    CommonModule,
    TabViewModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
  ],
  exports: [StatisticComponent],
})
export class StatisticModule {}
