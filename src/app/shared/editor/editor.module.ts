import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
/**
 * 
El módulo de edición se vale de la librería NgxEditorModule para proporcionar a los usuarios una interfaz de edición de texto enriquecido. Esta herramienta permite a los usuarios crear y editar contenido con formato de manera intuitiva y eficiente.

Con la integración de NgxEditorModule, los usuarios pueden disfrutar de funciones avanzadas de edición de texto, como negrita, cursiva, subrayado, listas numeradas y con viñetas, así como también cambios de tamaño y color de fuente. Además, ofrece capacidades de añadir enlaces, imágenes y otros elementos multimedia para enriquecer el contenido.

El módulo ofrece una interfaz fácil de usar, con controles accesibles que permiten a los usuarios realizar ediciones rápidas y precisas. Además, la integración con NgxEditorModule garantiza una experiencia de edición fluida y optimizada.

En resumen, el módulo de edición potenciado por NgxEditorModule proporciona a los usuarios una herramienta robusta y flexible para crear y editar contenido con formato, mejorando así la experiencia general de edición en la aplicación.
 */
@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    NgxEditorModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
  ],
  exports: [EditorComponent],
})
export class EditorModule {}
