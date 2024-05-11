import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLevelRoutingModule } from './add-level-routing.module';
import { AddLevelComponent } from './add-level.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
/**
 * Este módulo facilita la creación de un nuevo nivel jerárquico en el plan de estudios. Proporciona una interfaz intuitiva que guía al usuario a través del proceso de definir y configurar este nuevo nivel, permitiendo una estructura más completa y detallada del plan de estudios. Con esta funcionalidad, los usuarios pueden organizar y gestionar la información de manera jerárquica, lo que facilita la comprensión y la navegación en el sistema educativo.
 */
@NgModule({
  declarations: [AddLevelComponent],
  imports: [
    CommonModule,
    AddLevelRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    AccordionModule,
  ],
  exports: [AddLevelComponent],
  providers: [MessageService],
})
export class AddLevelModule {}
