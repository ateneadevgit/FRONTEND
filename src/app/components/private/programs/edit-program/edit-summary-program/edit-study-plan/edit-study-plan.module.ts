import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStudyPlanComponent } from './edit-study-plan.component';
import { StudyPlanModule } from 'src/app/shared/study-plan/study-plan.module';
/**
 * Este módulo aprovecha el módulo de creación de plan de estudios para llevar a cabo su edición,
 * reutilizando funcionalidades ya diseñadas y optimizando el proceso de modificación de los
 * planes de estudios existentes.
 * Al utilizar el módulo de creación de plan de estudios como base,
 * este módulo de edición proporciona una interfaz familiar y consistente para que los
 * usuarios realicen cambios en los planes de estudios de manera eficiente y efectiva.
 * Los usuarios pueden acceder a todas las funcionalidades necesarias para editar los
 * planes de estudios, como agregar o eliminar subnucleos, actualizar descripción
 * y establecer requisitos de créditos, entre otras acciones.
 */
@NgModule({
  declarations: [EditStudyPlanComponent],
  imports: [CommonModule, StudyPlanModule],
  exports: [EditStudyPlanComponent],
})
export class EditStudyPlanModule {}
