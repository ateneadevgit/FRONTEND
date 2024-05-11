import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { AcademicCreditComponent } from './academic-credit.component';
import { AcademicCreditRoutingModule } from './academic-credit-routing.module';
import { TableModule } from 'primeng/table';
import { ProgramHistoryModule } from '../program-history/program-history.module';
import { ModuleHeaderModule } from '../module-header/module-header.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [AcademicCreditComponent],
  imports: [
    AcademicCreditRoutingModule,
    CommonModule,
    SharedModule,
    TableModule,
    ProgramHistoryModule,
    ModuleHeaderModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    SliderModule,
    ContextMenuModule,
  ],
})
export class AcademicCreditModule {}
