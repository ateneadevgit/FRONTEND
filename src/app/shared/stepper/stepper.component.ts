/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StepperItems } from 'src/models/items-stepper.interface';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() items: StepperItems[] | undefined;
  @Input() viewText = false;
  @Input() showStepHorizonal = false;
  @Input() activeStep = 0;
  activeIndex = 0;
  @Output() showTextEmit = new EventEmitter<boolean>();
  @Output() emitCurrentStep = new EventEmitter<any>();

  constructor(public messageService: MessageService) {}

  onActiveIndexChange(event: any) {
    if (event.isEditable) {
      // Activa o desactiva la seleccion del paso
      this.activeIndex = event.orderId;
      this.emitCurrentStep.emit(event);
    }
  }

  showText() {
    this.showTextEmit.emit(!this.viewText);
  }
}
