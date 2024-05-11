import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ProblemBanckComponent } from './problem-banck.component';
import { ProblemBanckRoutingModule } from './problem-banck-routing.module';
import { ProgramHistoryModule } from '../program-history/program-history.module';
import { ModuleHeaderModule } from '../module-header/module-header.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ProblemBanckComponent],
  imports: [
    ProblemBanckRoutingModule,
    ProgramHistoryModule,
    ModuleHeaderModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    CommonModule,
    SharedModule,
  ],
  exports: [ProblemBanckComponent],
})
export class ProblemBanckModule {}
