import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogActiveEditModule } from '../../programs/edit-program/dialog-active-edit/dialog-active-edit.module';
import { DialogModule } from 'primeng/dialog';
import { GuidelinesRoutingModule } from './guidelines-routing.module';
import { GuidelinesComponent } from './guidelines.component';
/**
 * Módulo que lista las guías de asignatura y permite su visualización.
 */
@NgModule({
  declarations: [GuidelinesComponent],
  imports: [
    CommonModule,
    GuidelinesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DialogActiveEditModule,
    DialogModule,
  ],
})
export class GuidelinesModule {}
