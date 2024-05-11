import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
/**
 * 
Este módulo es responsable de gestionar el proceso de inicio de sesión de los usuarios en la aplicación. Cuando un usuario intenta iniciar sesión, este módulo verifica las credenciales proporcionadas y, si son válidas, cifra los datos de sesión y los almacena en el almacenamiento local del navegador. Luego, el módulo recupera el menú correspondiente basado en el rol del usuario para mostrar las opciones de navegación adecuadas en la interfaz de usuario. De esta manera, garantiza que los usuarios accedan solo a las funcionalidades y datos autorizados según su rol en el sistema.
 */
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class LoginModule {}
