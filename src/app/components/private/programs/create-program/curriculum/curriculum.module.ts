import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumComponent } from './curriculum.component';
import { StudyPlanModule } from 'src/app/shared/study-plan/study-plan.module';
/**
 * Este módulo se encarga de heredar las funcionalidades del módulo de
 * plan de estudios (StudyPlanModule) para indicar que será un proceso de
 * creación de programa académico. Al heredar estas funcionalidades, el módulo
 * de creación de programa académico puede aprovechar las características y la
 * lógica ya implementadas en el módulo de plan de estudios, adaptándolas según
 * las necesidades específicas del proceso de creación de programas académicos.
 * Esto facilita el desarrollo al reutilizar componentes y funcionalidades existentes,
 * asegurando una consistencia y coherencia en la experiencia del usuario.
 */
@NgModule({
  declarations: [CurriculumComponent],
  imports: [CommonModule, CurriculumRoutingModule, StudyPlanModule],
})
export class CurriculumModule {}
