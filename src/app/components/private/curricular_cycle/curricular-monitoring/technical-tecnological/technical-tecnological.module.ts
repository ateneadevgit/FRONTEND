import { NgModule } from '@angular/core';
import { TechnicalTecnologicalRoutingModule } from './technical-tecnological-routing.module';
import { TechnicalTecnologicalComponent } from './technical-tecnological.component';
import { ProgramHistoryModule } from '../program-history/program-history.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ModuleHeaderModule } from '../module-header/module-header.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TechnicalTecnologicalComponent],
  imports: [
    TechnicalTecnologicalRoutingModule,
    ProgramHistoryModule,
    ModuleHeaderModule,
    CommonModule,
    SharedModule,
    CommonModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [TechnicalTecnologicalComponent],
})
export class TechnicalTecnologicalModule {}
