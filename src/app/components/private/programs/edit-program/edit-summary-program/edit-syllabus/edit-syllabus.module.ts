import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSyllabusComponent } from './edit-syllabus.component';
import { SyllabusModule } from '../../../create-program/syllabus/syllabus.module';
/**
 * Este módulo aprovecha el módulo de creación de sílabos para llevar a cabo su edición,
 * reutilizando funcionalidades ya diseñadas y optimizando el proceso de modificación de los
 * sílabos existentes.
 * Al utilizar el módulo de creación de sílabos como base, este módulo de edición
 * proporciona una interfaz familiar y consistente para que los usuarios realicen
 * cambios en los sílabos de manera eficiente y efectiva.
 * Los usuarios pueden acceder a todas las funcionalidades necesarias para editar los sílabos,
 */
@NgModule({
  declarations: [EditSyllabusComponent],
  imports: [CommonModule, SyllabusModule],
  exports: [EditSyllabusComponent],
})
export class EditSyllabusModule {}
