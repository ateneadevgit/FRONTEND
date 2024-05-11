import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CreateUpdateSubjectGuideComponent } from './create-update-subject-guide.component';
import { CreateUpdateSubjectGuideRoutingModule } from './create-update-subject-guide-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

/**
 * 
Este módulo proporciona un formulario completo para crear y editar guías de asignaturas. Permite a los usuarios ingresar toda la información relevante necesaria para cada asignatura, incluyendo detalles del curso, objetivos de aprendizaje, contenido del plan de estudios, recursos recomendados y cualquier otra información pertinente. Además, facilita la actualización de las guías de asignaturas existentes, garantizando que la información esté siempre actualizada y precisa.
 */

@NgModule({
  declarations: [CreateUpdateSubjectGuideComponent],
  imports: [
    CreateUpdateSubjectGuideRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    MultiSelectModule,
    InputTextModule,
    MessagesModule,
    CheckboxModule,
    DropdownModule,
    MessageModule,
    CalendarModule,
    TabViewModule,
    DialogModule,
    CommonModule,
    SharedModule,
    ButtonModule,
    TableModule,
    CardModule,
  ],
})
export class CreateUpdateSubjectGuideModule {}
