import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewStepRoutingModule } from './view-step-routing.module';
import { ViewStepComponent } from './view-step.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewStepComponent],
  imports: [
    CommonModule,
    ViewStepRoutingModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
  ],
  exports: [ViewStepComponent],
})
export class ViewStepModule {}
