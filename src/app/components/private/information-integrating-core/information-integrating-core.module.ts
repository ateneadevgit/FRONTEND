import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InformationIntegratingCoreComponent } from './information-integrating-core.component';
import { InformationIntegratingCoreRoutingModule } from './information-integrating-core-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { NewInformationIntegratingCoreModule } from './new-information-integrating-core/new-information-integrating-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Modulo que sirve de enunciado para  Núcleo integrador de formación sanmartiniana.
 */
@NgModule({
  declarations: [InformationIntegratingCoreComponent],
  imports: [
    CommonModule,
    InformationIntegratingCoreRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    NewInformationIntegratingCoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InformationIntegratingCoreModule {}
