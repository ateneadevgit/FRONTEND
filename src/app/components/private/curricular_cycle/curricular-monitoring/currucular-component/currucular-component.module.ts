import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { CurrucularComponentComponent } from './currucular-component.component';
import { CurrucularComponentRoutingModule } from './currucular-component-routing.module';
import { ProgramHistoryModule } from '../program-history/program-history.module';
import { ModuleHeaderModule } from '../module-header/module-header.module';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [CurrucularComponentComponent],
  imports: [
    CurrucularComponentRoutingModule,
    CommonModule,
    SharedModule,
    SharedModule,
    ProgramHistoryModule,
    ModuleHeaderModule,
    TableModule,
    TabViewModule,
  ],
  exports: [CurrucularComponentComponent],
})
export class CurrucularComponentModule {}
