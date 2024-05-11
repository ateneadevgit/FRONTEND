import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTemplateRoutingModule } from './create-template-routing.module';
import { CreateTemplateComponent } from './create-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateTemplateComponent],
  imports: [
    CommonModule,
    CreateTemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SharedModule,
  ],
  exports: [CreateTemplateComponent],
})
export class CreateTemplateModule {}
