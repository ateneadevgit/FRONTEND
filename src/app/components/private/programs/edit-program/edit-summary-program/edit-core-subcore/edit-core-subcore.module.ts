import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCoreSubcoreComponent } from './edit-core-subcore.component';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
/**
 * 
Este módulo ofrece la capacidad de editar tanto el núcleo como los subnúcleos del plan de estudios de un programa académico. Permite al usuario realizar modificaciones en la estructura curricular, actualizar la información del núcleo y de cada subnúcleo de manera individual.

El módulo proporciona una interfaz intuitiva que permite la edición de cada componente del plan de estudios de forma separada. Esto incluye la posibilidad de agregar, modificar o eliminar información relacionada con el núcleo y los subnúcleos.

Además, ofrece funcionalidades adicionales como la gestión de créditos académicos, la descripción de los contenidos de cada subnúcleo, y la organización del plan de estudios de acuerdo a los requerimientos específicos del programa académico.

En resumen, este módulo facilita la tarea de editar y gestionar la estructura curricular de un programa académico, proporcionando herramientas para realizar cambios de manera eficiente y precisa.
 */
@NgModule({
  declarations: [EditCoreSubcoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [EditCoreSubcoreComponent],
})
export class EditCoreSubcoreModule {}
