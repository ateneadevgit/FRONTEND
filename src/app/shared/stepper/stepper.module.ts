import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperRoutingModule } from './stepper-routing.module';
import { StepperComponent } from './stepper.component';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
/**
 * Este módulo implementa el StepsModule para proporcionar una interfaz paso a paso que guía al usuario a través del proceso de creación de un programa académico. Con StepsModule, los usuarios pueden ver claramente las condiciones y los pasos necesarios para completar la creación del programa académico, lo que facilita la comprensión y el seguimiento del proceso.
 */
@NgModule({
  declarations: [StepperComponent],
  imports: [CommonModule, StepperRoutingModule, StepsModule, ToastModule, TooltipModule],
  exports: [StepperComponent],
  providers: [MessageService],
})
export class StepperModule {}
