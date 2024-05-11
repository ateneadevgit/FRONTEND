import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [ModulesComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    CheckboxModule,
  ],
  exports: [ModulesComponent],
})
export class ModulesModule {}
