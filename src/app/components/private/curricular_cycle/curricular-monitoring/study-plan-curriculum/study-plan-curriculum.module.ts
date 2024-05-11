import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyPlanCurriculumRoutingModule } from './study-plan-curriculum-routing.module';
import { StudyPlanCurriculumComponent } from './study-plan-curriculum.component';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ProgramHistoryModule } from '../program-history/program-history.module';
import { ModuleHeaderModule } from '../module-header/module-header.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { StudyPlanModule } from 'src/app/shared/study-plan/study-plan.module';
import { SemestreCurriculumModule } from './semestre-curriculum/semestre-curriculum.module';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [StudyPlanCurriculumComponent],
  imports: [
    CommonModule,
    StudyPlanCurriculumRoutingModule,
    SharedModule,
    TableModule,
    ProgramHistoryModule,
    ModuleHeaderModule,
    InputTextModule,
    FormsModule,
    StudyPlanModule,
    SemestreCurriculumModule,
    TabViewModule,
  ],
})
export class StudyPlanCurriculumModule {}
