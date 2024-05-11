import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { NewSubcoreComponent } from './new-subcore.component';
import { NewSubcoreRoutingModule } from './new-subcore-routing.module';
import { CreateSubcoreModule } from './create-subcore/create-subcore.module';
import { ViewSubcoreModule } from './view-subcore/view-subcore.module';
import { SharedModule } from 'primeng/api';
/**
 * Este módulo está dedicado a la edición y creación de subnúcleos dentro del
 * Núcleo Integrador de Formación Sanmartiniana. Permite a los usuarios desarrollar y
 * gestionar subnúcleos de forma eficiente, brindando herramientas para estructurar y
 * organizar el contenido educativo de acuerdo con los objetivos del Núcleo Integrador de
 * Formación. Con este módulo, los usuarios pueden crear una estructura educativa coherente y
 * adaptada a las necesidades de su programa educativo.
 */
@NgModule({
  declarations: [NewSubcoreComponent],
  imports: [
    CommonModule,
    NewSubcoreRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    CardModule,
    CreateSubcoreModule,
    ViewSubcoreModule,
  ],
  exports: [NewSubcoreComponent],
})
export class NewSubcoreModule {}
