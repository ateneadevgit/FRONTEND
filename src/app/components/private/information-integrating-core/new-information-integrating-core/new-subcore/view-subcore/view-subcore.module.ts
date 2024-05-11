import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewSubcoreComponent } from './view-subcore.component';
import { ViewSubcoreRoutingModule } from './view-subcore-routing.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { TableModule } from 'primeng/table';
/**
 * Este módulo permite la visualización de los subnúcleos que han sido creados
 * para el Núcleo Integrador de Formación Sanmartiniana. Proporciona a los usuarios
 * una manera fácil y conveniente de explorar y acceder a los subnúcleos existentes,
 * lo que les permite familiarizarse con el contenido educativo y la estructura del
 * Núcleo Integrador de Formación.
 */
@NgModule({
  declarations: [ViewSubcoreComponent],
  imports: [
    CommonModule,
    ViewSubcoreRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDocViewerModule,
    TableModule,
  ],
  exports: [ViewSubcoreComponent],
})
export class ViewSubcoreModule {}
