import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepFlowRoutingModule } from './step-flow-routing.module';
import { StepFlowComponent } from './step-flow.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ViewStepModule } from './view-step/view-step.module';
import { UpdateStepModule } from './update-step/update-step.module';

@NgModule({
  declarations: [StepFlowComponent],
  imports: [
    CommonModule,
    StepFlowRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    InputSwitchModule,
    SharedModule,
    InputNumberModule,
    DropdownModule,
    ViewStepModule,
    UpdateStepModule,
  ],
  exports: [StepFlowComponent],
})
export class StepFlowModule {}
