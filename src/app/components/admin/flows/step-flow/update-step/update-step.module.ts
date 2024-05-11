import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateStepRoutingModule } from './update-step-routing.module';
import { UpdateStepComponent } from './update-step.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [UpdateStepComponent],
  imports: [
    CommonModule,
    UpdateStepRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    InputSwitchModule,
    SharedModule,
    InputNumberModule,
    DropdownModule,
  ],
  exports: [UpdateStepComponent],
})
export class UpdateStepModule {}
