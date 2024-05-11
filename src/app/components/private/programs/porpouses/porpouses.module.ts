import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PorpousesRoutingModule } from './porpouses-routing.module';
import { PorpousesComponent } from './porpouses.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HistoryModule } from '../history/history.module';
import { PreviewDocumentModule } from 'src/app/shared/preview-document/preview-document.module';
/**

Este módulo tiene la función de listar los programas que se encuentran en propuesta para ser aprobados e iniciar el flujo de creación. Los programas listados están pendientes de la aprobación del vicerrector. Este puede revisar cada programa propuesto y tomar la decisión de aprobarlo o denegarlo. Una vez aprobado por el vicerrector, el programa puede avanzar al siguiente paso en el flujo de creación, lo que puede implicar la asignación de recursos, la designación de responsabilidades y otros procesos relacionados con la puesta en marcha del programa académico. 
*/
@NgModule({
  declarations: [PorpousesComponent],
  imports: [
    CommonModule,
    PorpousesRoutingModule,
    TableModule,
    DialogModule,
    ToastModule,
    HistoryModule,
    AccordionModule,
    PreviewDocumentModule,
  ],
  exports: [PorpousesComponent],
  providers: [MessageService],
})
export class PorpousesModule {}
