import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocInstrumentsRoutingModule } from './doc-instruments-routing.module';
import { DocInstrumentsComponent } from './doc-instruments.component';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [DocInstrumentsComponent],
  imports: [
    CommonModule,
    DocInstrumentsRoutingModule,
    TableModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
  ],
  exports: [DocInstrumentsComponent],
})
export class DocInstrumentsModule {}
