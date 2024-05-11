import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AcademicProgramModule } from './widgets/academic-program/academic-program.module';
import { MyAcademicProgramProgressModule } from './widgets/my-academic-program-progress/my-academic-program-progress.module';
import { NewsWidgetModule } from './widgets/news-widget/news-widget.module';
import { MyAcademicProgramCurrentModule } from './widgets/my-academic-program-current/my-academic-program-current.module';
import { AdvertisingModule } from './widgets/advertising/advertising.module';
import { ProgramsCurrentModule } from './widgets/programs-current/programs-current.module';
import { ProgramsActiveModule } from './widgets/programs-active/programs-active.module';
import { StatisticModule } from './widgets/statistic/statistic.module';
import { CalendarModule } from './widgets/calendar/calendar.module';
/**
 * Este módulo se encarga de la visualización del dashboard,
 * el cual genera vistas dinámicas utilizando widgets.
 * Dependiendo del rol del usuario que accede al sistema,
 * se cargan específicamente algunos widgets.
 * Este módulo proporciona una experiencia personalizada en
 * función de los permisos y el contexto del usuario.
 */
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AcademicProgramModule,
    MyAcademicProgramProgressModule,
    MyAcademicProgramCurrentModule,
    NewsWidgetModule,
    AdvertisingModule,
    ProgramsCurrentModule,
    ProgramsActiveModule,
    StatisticModule,
    CalendarModule,
  ],
})
export class DashboardModule {}
