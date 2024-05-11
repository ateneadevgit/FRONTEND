import { NgModule } from '@angular/core';
import { ModuleHeaderComponent } from './module-header.component';
import { ModuleHeaderRoutingModule } from './module-header-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ModuleHeaderComponent],
  imports: [ModuleHeaderRoutingModule, CommonModule],
  exports: [ModuleHeaderComponent],
})
export class ModuleHeaderModule {}
