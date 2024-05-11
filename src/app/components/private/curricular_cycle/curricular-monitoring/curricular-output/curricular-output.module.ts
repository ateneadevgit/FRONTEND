/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { CurricularOutputComponent } from './curricular-output.component';
import { CurricularOutputRoutingModule } from './curricular-output-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramHistoryModule } from '../program-history/program-history.module';

@NgModule({
  declarations: [CurricularOutputComponent],
  imports: [
    CurricularOutputRoutingModule,
    CommonModule,
    SharedModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ProgramHistoryModule,
  ],
})
export class CurricularOutputModule {}
