import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ModuleSyllabusComponent } from './module-syllabus.component';
import { ModuleSyllabusRoutingModule } from './module-syllabus-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramHistoryModule } from '../program-history/program-history.module';

@NgModule({
  declarations: [ModuleSyllabusComponent],
  imports: [
    ModuleSyllabusRoutingModule,
    DropdownModule,
    CommonModule,
    SharedModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ProgramHistoryModule,
  ],
  exports: [ModuleSyllabusComponent],
})
export class ModuleSyllabusModule {}
