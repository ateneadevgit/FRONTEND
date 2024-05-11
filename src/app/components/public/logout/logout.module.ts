import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import { MessageService } from 'primeng/api';
/**
 * 
Este módulo es responsable de gestionar el proceso de cierre de sesión de los usuarios en la aplicación. Cuando un usuario solicita cerrar sesión, este módulo elimina todos los datos de sesión almacenados tanto en el almacenamiento de sesión como en el almacenamiento local del navegador. Luego, redirige al usuario a la página de inicio de sesión para que puedan iniciar sesión nuevamente si lo desean. De esta manera, garantiza que los usuarios finalicen adecuadamente su sesión y elimina cualquier información sensible almacenada en el navegador.
 */
@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, LogoutRoutingModule],
  providers: [MessageService],
})
export class LogoutModule {}
