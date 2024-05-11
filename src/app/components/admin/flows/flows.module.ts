import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowsRoutingModule } from './flows-routing.module';
import { FlowsComponent } from './flows.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [FlowsComponent],
  imports: [
    CommonModule,
    FlowsRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
  ],
  exports: [FlowsComponent],
})
export class FlowsModule {}
