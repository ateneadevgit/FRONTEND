import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarDashboardModule } from '../../../calendar/calendar-dashboard/calendar-dashboard.module';
/**
 * Este módulo integra un widget de calendario para un fácil acceso a las
 * funcionalidades básicas de visualización de eventos. Permite el filtrado
 * por tipo de evento, proporcionando una manera conveniente para los usuarios
 * de acceder y explorar los eventos disponibles en la plataforma.
 */
@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, CalendarDashboardModule],
  exports: [CalendarComponent],
})
export class CalendarModule {}
