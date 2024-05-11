import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ThemeModule } from './shared/theme/theme.module';
import { HttpRequestInterceptor } from './services/interceptors/http-request.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
/**
 * En el AppModule, se importan y configuran otros módulos de Angular, como BrowserModule, FormsModule, HttpClientModule, RouterModule, etc. Además, se declaran los componentes, directivas y servicios principales que se utilizan en toda la aplicación.

El AppModule también puede contener configuraciones globales, como proveedores de servicios, guardias de rutas, interceptores HTTP, etc. Además, se establecen las rutas principales de la aplicación utilizando el enrutador de Angular.

En resumen, el AppModule es el punto de entrada principal de una aplicación Angular, donde se configuran los elementos fundamentales y se definen las dependencias principales. Es el módulo que Angular carga al iniciar la aplicación.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
