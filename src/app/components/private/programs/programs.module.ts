import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ActiveProgramsModule } from './active-programs/active-programs.module';
import { ConstructionProgramsModule } from './construction-programs/construction-programs.module';
import { PorpousesModule } from './porpouses/porpouses.module';
import { DeclinedProgramsModule } from './declined-programs/declined-programs.module';
import { DesactivatedProgramsModule } from './desactivated-programs/desactivated-programs.module';
import { DialogModule } from 'primeng/dialog';
import { CreatePorpouseModule } from './porpouses/create-porpouse/create-porpouse.module';
/**
 * Este módulo está compuesto por varios submódulos diseñados para listar diferentes tipos de programas académicos según su estado. Aquí está la descripción de cada submódulo:

ActiveProgramsModule: Este submódulo se encarga de listar los programas académicos que están actualmente activos y en funcionamiento en el sistema.

ConstructionProgramsModule: En este submódulo se listan los programas académicos que se encuentran en proceso de construcción o creación. Estos programas aún no están activos, pero están en fase de desarrollo.

PorpousesModule: Este submódulo lista los programas académicos que están en estado de propuesta, es decir, están siendo considerados para su aprobación y posterior implementación.

DeclinedProgramsModule: Aquí se muestran los programas académicos que han sido rechazados durante el proceso de revisión o aprobación. Estos programas no han sido aprobados para su implementación.

DesactivatedProgramsModule: Este submódulo presenta los programas académicos que estaban previamente activos pero que han sido desactivados por alguna razón.
 */
@NgModule({
  declarations: [ProgramsComponent],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    ActiveProgramsModule,
    ConstructionProgramsModule,
    PorpousesModule,
    DeclinedProgramsModule,
    DesactivatedProgramsModule,
    CreatePorpouseModule,
    DialogModule,
  ],
})
export class ProgramsModule {}
