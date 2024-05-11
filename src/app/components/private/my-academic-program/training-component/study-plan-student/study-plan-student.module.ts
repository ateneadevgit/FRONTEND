import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyPlanStudentRoutingModule } from './study-plan-student-routing.module';
import { StudyPlanStudentComponent } from './study-plan-student.component';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ModuleHeaderModule } from '../../../curricular_cycle/curricular-monitoring/module-header/module-header.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SemestreCurriculumModule } from '../../../curricular_cycle/curricular-monitoring/study-plan-curriculum/semestre-curriculum/semestre-curriculum.module';
import { TabViewModule } from 'primeng/tabview';
import { StudyPlanModule } from 'src/app/shared/study-plan/study-plan.module';
/**
 * Este módulo es una herramienta para que los estudiantes puedan explorar y
 * comprender su plan de estudios de manera fácil y completa. Les permite navegar
 * a través de los diferentes componentes, áreas, ciclos y núcleos del plan de estudios.
 * Además, proporciona la capacidad de ver una lista de subnúcleos organizados por semestre.
 * Para hacer esto posible, el módulo implementa funcionalidades heredadas de otros módulos,
 * como StudyPlanModule y SemestreCurriculumModule, que contribuyen a la experiencia
 * completa del usuario al interactuar con su plan de estudios.
 */
@NgModule({
  declarations: [StudyPlanStudentComponent],
  imports: [
    CommonModule,
    StudyPlanStudentRoutingModule,
    SharedModule,
    TableModule,
    ModuleHeaderModule,
    InputTextModule,
    FormsModule,
    StudyPlanModule,
    SemestreCurriculumModule,
    TabViewModule,
  ],
})
export class StudyPlanStudentModule {}
