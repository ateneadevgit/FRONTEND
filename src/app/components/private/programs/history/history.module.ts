import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
/**
 * 
Este módulo tiene la función de listar el historial de programas académicos, proporcionando a los usuarios una visión retrospectiva de los programas que han estado activos en el sistema. Permite acceder a información detallada sobre cada programa, incluyendo su nombre, fecha de inicio y fin, así como cualquier otro dato relevante para el usuario. Esto facilita el seguimiento y la referencia de programas anteriores, lo que puede ser útil para propósitos de auditoría, análisis histórico o simplemente para mantener un registro de los programas académicos previos.
 */
@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    TimelineModule,
    CardModule,
    SharedModule,
    ToastModule,
  ],
  exports: [HistoryComponent],
  providers: [MessageService],
})
export class HistoryModule {}
