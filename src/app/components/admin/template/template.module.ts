import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CreateTemplateModule } from './create-template/create-template.module';

@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    TableModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    CreateTemplateModule,
  ],
  exports: [TemplateComponent],
})
export class TemplateModule {}
