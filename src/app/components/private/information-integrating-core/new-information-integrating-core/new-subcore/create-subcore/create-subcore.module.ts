import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CreateSubcoreComponent } from './create-subcore.component';
import { CreateSubcoreRoutingModule } from './create-subcore-routing.module';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
/**
 * Este módulo alberga el formulario que posibilita la edición y creación de un subnúcleo
 * para el Núcleo Integrador de Formación Sanmartiniana. Proporciona una interfaz intuitiva
 * y fácil de usar que permite a los usuarios modificar y agregar contenido a los subnúcleos,
 * asegurando que se cumplan los requisitos y objetivos del programa educativo.
 */
@NgModule({
  declarations: [CreateSubcoreComponent],
  imports: [
    CommonModule,
    CreateSubcoreRoutingModule,
    ButtonModule,
    TabViewModule,
    CardModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    MultiSelectModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    TableModule,
    DialogModule,
    InputNumberModule,
  ],
  exports: [CreateSubcoreComponent],
})
export class CreateSubcoreModule {}
