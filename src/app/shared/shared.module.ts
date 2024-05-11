import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderModuleModule } from './header-module/header-module.module';
import { CropImageModule } from './crop-image/crop-image.module';
import { PreviewDocumentModule } from './preview-document/preview-document.module';
import { PaginationModule } from './pagination/pagination.module';
import { StepperModule } from './stepper/stepper.module';
import { EditorModule } from './editor/editor.module';
import { LoadDocumentWithCommentModule } from './load-document-with-comment/load-document-with-comment.module';
/**
 * Este módulo integra una serie de submódulos auxiliares que son implementados en varios módulos del aplicativo, lo que permite la reutilización transversal de funcionalidades. Los submódulos incluidos son:

- CropImageModule: Permite recortar imágenes cargadas por el usuario para su posterior uso en otros módulos.
- PreviewDocumentModule: Proporciona la funcionalidad de previsualización de documentos para facilitar su visualización antes de su uso.
- PaginationModule: Ofrece servicios de paginación a tablas donde se implemente, facilitando la navegación y la gestión de grandes conjuntos de datos.
- StepperModule: Implementa un componente de pasos que guía al usuario a través de un proceso paso a paso, como en la creación de un programa académico.
- EditorModule: Integra la funcionalidad de edición mediante un editor, como NgxEditorModule, para permitir la manipulación de contenido textual.
- LoadDocumentWithCommentModule: Permite cargar un documento junto con comentarios asociados para una revisión o análisis más detallado.

Estos submódulos proporcionan funcionalidades comunes que se pueden utilizar en diferentes partes del aplicativo, lo que promueve la coherencia, la eficiencia y la facilidad de mantenimiento en el desarrollo de la aplicación.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CropImageModule,
    PreviewDocumentModule,
    PaginationModule,
    StepperModule,
    EditorModule,
    LoadDocumentWithCommentModule,
  ],
  exports: [
    HeaderModuleModule,
    CropImageModule,
    PreviewDocumentModule,
    PaginationModule,
    StepperModule,
    EditorModule,
    LoadDocumentWithCommentModule,
  ],
})
export class SharedModule {}
