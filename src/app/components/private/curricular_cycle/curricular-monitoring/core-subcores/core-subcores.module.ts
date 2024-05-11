import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { CoreSubcoresComponent } from './core-subcores.component';
import { CoreSubCoreRoutingModule } from './core-subcores-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramHistoryModule } from '../program-history/program-history.module';

@NgModule({
  declarations: [CoreSubcoresComponent],
  imports: [
    CoreSubCoreRoutingModule,
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
export class CoreSubCoreModule {}
