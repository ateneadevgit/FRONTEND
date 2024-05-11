import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAcademicCreditsComponent } from './edit-academic-credits.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
/**
 * 
Este módulo permite editar los créditos académicos asignados a cada subnúcleo dentro de un programa académico. Los créditos académicos son unidades que representan el valor académico o carga de trabajo asociada a cada subnúcleo.

Con esta herramienta, los usuarios tienen la capacidad de ajustar los créditos académicos de manera individual para cada subnúcleo, según las necesidades específicas del plan de estudios. Esto puede implicar aumentar o disminuir el número de créditos asignados a un subnúcleo en función de diversos factores, como el contenido del curso, la carga horaria, los requisitos académicos, entre otros.

El módulo proporciona una interfaz intuitiva que permite realizar estas ediciones de manera eficiente. Los usuarios pueden acceder a la información de cada subnúcleo, modificar el número de créditos asignados y guardar los cambios realizados.

En resumen, este módulo facilita la gestión y personalización de los créditos académicos dentro de un programa académico, permitiendo adaptar la carga de trabajo de manera flexible según las necesidades específicas de cada subnúcleo.
 */
@NgModule({
  declarations: [EditAcademicCreditsComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [EditAcademicCreditsComponent],
})
export class EditAcademicCreditsModule {}
