import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteTableRoutingModule } from './favorite-table-routing.module';
import { FavoriteTableComponent } from './favorite-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [FavoriteTableComponent],
  imports: [
    CommonModule,
    FavoriteTableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
  ],
  exports: [FavoriteTableComponent],
})
export class FavoriteTableModule {}
