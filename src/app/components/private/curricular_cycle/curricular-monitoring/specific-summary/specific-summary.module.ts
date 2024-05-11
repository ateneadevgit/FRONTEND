import { NgModule } from '@angular/core';
import { SpecificSummaryRoutingModule } from './specific-summary-routing.module';
import { SpecificSummaryComponent } from './specific-summary.component';
import { ProgramHistoryModule } from '../program-history/program-history.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ModuleHeaderModule } from '../module-header/module-header.module';

@NgModule({
  declarations: [SpecificSummaryComponent],
  imports: [
    SpecificSummaryRoutingModule,
    ProgramHistoryModule,
    ModuleHeaderModule,
    CommonModule,
    SharedModule,
  ],
  exports: [SpecificSummaryComponent],
})
export class SpecificSummaryModule {}
