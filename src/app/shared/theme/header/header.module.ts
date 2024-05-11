import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
/**
 * 
Este módulo es responsable de implementar el encabezado general del aplicativo. En este encabezado se muestra información del usuario logueado, como su nombre y rol, además de presentar el logo del aplicativo. Es una parte importante de la interfaz de usuario, ya que proporciona una identidad visual consistente y familiar para los usuarios del sistema. Además, ofrece una forma rápida y accesible para que los usuarios puedan identificar su sesión y rol en el aplicativo.
 */
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HeaderRoutingModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
