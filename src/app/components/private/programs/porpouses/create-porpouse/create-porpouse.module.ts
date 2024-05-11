import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateAcademicProgramModule } from './create-academic-program/create-academic-program.module';
import { CreatePorpouseRoutingModule } from './create-porpouse-routing.module';
import { CreatePorpouseComponent } from './create-porpouse.component';
import { CreateRenewProgramModule } from './create-renew-program/create-renew-program.module';
/**
 * Este módulo consta de dos submódulos: CreateAcademicProgramModule y CreateRenewProgramModule. Estos submódulos permiten crear una propuesta para la creación de un programa académico o para la renovación de un programa existente.
 */
@NgModule({
  declarations: [CreatePorpouseComponent],
  imports: [
    CommonModule,
    CreatePorpouseRoutingModule,
    TableModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateAcademicProgramModule,
    CreateRenewProgramModule,
    SharedModule,
  ],
  exports: [CreatePorpouseComponent],
})
export class CreatePorpouseModule {}
