import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateComponentRoutingModule } from './create-component-routing.module';
import { CreateComponentComponent } from './create-component.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
/**
 * Este módulo muestra un formulario que permite la creación de un componente académico o un subnúcleo, dependiendo de la funcionalidad desde la que es invocado. Proporciona una interfaz intuitiva para recopilar y ingresar la información necesaria para definir estos elementos del plan de estudios. Esta flexibilidad permite adaptarse a diferentes contextos y necesidades dentro del sistema educativo, facilitando la gestión y configuración de los componentes académicos de manera eficiente.
 */
@NgModule({
  declarations: [CreateComponentComponent],
  imports: [
    CommonModule,
    CreateComponentRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    ToastModule,
  ],
  exports: [CreateComponentComponent],
  providers: [MessageService],
})
export class CreateComponentModule {}
