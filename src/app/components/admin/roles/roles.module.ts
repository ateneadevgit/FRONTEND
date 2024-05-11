import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    TableModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
  ],
  exports: [RolesComponent],
})
export class RolesModule {}
