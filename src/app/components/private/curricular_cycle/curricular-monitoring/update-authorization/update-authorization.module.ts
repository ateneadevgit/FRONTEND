import { NgModule } from '@angular/core';

import { ProgramHistoryModule } from '../program-history/program-history.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ModuleHeaderModule } from '../module-header/module-header.module';
import { UpdateAuthorizationComponent } from './update-authorization.component';
import { UpdateAuthorizationRoutingModule } from './update-authorization-routing.module';

@NgModule({
  declarations: [UpdateAuthorizationComponent],
  imports: [
    UpdateAuthorizationRoutingModule,
    ProgramHistoryModule,
    ModuleHeaderModule,
    CommonModule,
    SharedModule,
  ],
  exports: [UpdateAuthorizationComponent],
})
export class UpdateAuthorizationModule {}
