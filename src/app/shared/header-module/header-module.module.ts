import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModuleRoutingModule } from './header-module-routing.module';
import { HeaderModuleComponent } from './header-module.component';
import { ButtonModule } from 'primeng/button';
/**
 * 
Este módulo sirve como encabezado para el componente que lo implemente. Su función principal es mostrar un título y un botón de acción en una disposición de fila con dos columnas.
 */
@NgModule({
  declarations: [HeaderModuleComponent],
  imports: [CommonModule, HeaderModuleRoutingModule, ButtonModule],
  exports: [HeaderModuleComponent],
})
export class HeaderModuleModule {}
