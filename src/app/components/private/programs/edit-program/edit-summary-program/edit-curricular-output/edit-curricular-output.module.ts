import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCurricularOutputComponent } from './edit-curricular-output.component';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Este módulo está específicamente diseñado para la edición de la salida curricular y
 * sus subnúcleos. Proporciona una interfaz intuitiva y eficiente para que los usuarios
 * realicen cambios en la salida curricular de un programa académico, así como en los
 * subnúcleos asociados.
 * Al utilizar este módulo, los usuarios pueden acceder a todas las funcionalidades
 * necesarias para editar la salida curricular y sus subnúcleos de manera efectiva.
 * Esto incluye la capacidad de agregar, eliminar o modificar información relacionada
 * con los subnúcleos, como los objetivos de aprendizaje, los contenidos temáticos,
 * los métodos de evaluación y los recursos necesarios.
 */
@NgModule({
  declarations: [EditCurricularOutputComponent],
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
  exports: [EditCurricularOutputComponent],
})
export class EditCurricularOutputModule {}
