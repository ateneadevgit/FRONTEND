import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadDocumentWithCommentRoutingModule } from './load-document-with-comment-routing.module';
import { LoadDocumentWithCommentComponent } from './load-document-with-comment.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { EditorModule } from '../editor/editor.module';
/**

Este módulo permite cargar un documento y un resumen, luego devuelve la información al módulo que lo implementa. Su funcionalidad se centra en dos acciones principales:

Carga de documento: Permite al usuario cargar un documento, ya sea seleccionándolo desde el sistema de archivos local o proporcionando una URL. Una vez que se carga el documento, el módulo procesa la información y la prepara para su uso posterior.

Ingreso de resumen: Proporciona un área donde el usuario puede ingresar un resumen relacionado con el documento cargado. Este resumen puede ser opcional o requerido, dependiendo de los requisitos de la aplicación.

Una vez que se completa la carga del documento y se ingresa el resumen (si es necesario), el módulo devuelve toda la información recopilada al módulo que lo implementa. Esto generalmente se hace a través de eventos o métodos proporcionados por el módulo, lo que permite al módulo que lo implementa acceder y utilizar la información según sea necesario.

En resumen, este módulo facilita la carga y el procesamiento de documentos junto con la entrada de un resumen, proporcionando una forma eficiente de manejar esta tarea específica y devolver los datos resultantes al módulo principal de la aplicación para su procesamiento adicional.
 */
@NgModule({
  declarations: [LoadDocumentWithCommentComponent],
  imports: [
    CommonModule,
    LoadDocumentWithCommentRoutingModule,
    DialogModule,
    ToastModule,
    EditorModule,
  ],
  exports: [LoadDocumentWithCommentComponent],
  providers: [MessageService],
})
export class LoadDocumentWithCommentModule {}
