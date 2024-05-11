import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { NewInformationIntegratingCoreComponent } from './new-information-integrating-core.component';
import { NewInformationIntegratingCoreRoutingModule } from './new-information-integrating-core-routing.module';
import { NewJustificationModule } from './new-justification/new-justification.module';
import { NewBankProblemModule } from './new-bank-problem/new-bank-problem.module';
import { NewCompetenciesModule } from './new-competencies/new-competencies.module';
import { NewRagiModule } from './new-ragi/new-ragi.module';
import { NewSubcoreModule } from './new-subcore/new-subcore.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewNifsModule } from './view-nifs/view-nifs.module';
import { HomeInformationIntegratingModule } from '../home-information-integrating/home-information-integrating.module';
/**
 * Este módulo sirve como núcleo central para la creación de un Núcleo Integrador
 * de Formación (NIF) sanmartiniano, integrando diversos componentes de otros módulos.
 * Su funcionalidad abarca todas las etapas del proceso de creación de un NIF, desde la
 * planificación hasta la implementación. Al combinar diferentes componentes de otros
 * módulos, este núcleo central proporciona una solución integral que facilita la creación y
 * gestión efectiva de un NIF en el aplicativo.
 */
@NgModule({
  declarations: [NewInformationIntegratingCoreComponent],
  imports: [
    CommonModule,
    NewInformationIntegratingCoreRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    NewJustificationModule,
    NewBankProblemModule,
    NewCompetenciesModule,
    NewRagiModule,
    NewSubcoreModule,
    ViewNifsModule,
    SharedModule,
    HomeInformationIntegratingModule,
  ],
  exports: [NewInformationIntegratingCoreComponent],
})
export class NewInformationIntegratingCoreModule {}
