import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocGuidelinesRoutingModule } from './doc-guidelines-routing.module';
import { DocGuidelinesComponent } from './doc-guidelines.component';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [DocGuidelinesComponent],
  imports: [
    CommonModule,
    DocGuidelinesRoutingModule,
    TableModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
  ],
  exports: [DocGuidelinesComponent],
})
export class DocGuidelinesModule {}
