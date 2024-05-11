import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAcademicProgramCurrentComponent } from './my-academic-program-current.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
/**
 * Este módulo muestra todos los subnúcleos que ha cursado un estudiante,
 * proporcionando información sobre los créditos académicos asociados.
 * Además, permite el acceso a un botón que redirige a los usuarios a obtener
 * información detallada sobre cada subnúcleo, lo que facilita la comprensión y
 * el seguimiento del progreso académico del estudiante.
 */
@NgModule({
  declarations: [MyAcademicProgramCurrentComponent],
  imports: [
    CommonModule,
    CardModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  exports: [MyAcademicProgramCurrentComponent],
})
export class MyAcademicProgramCurrentModule {}
