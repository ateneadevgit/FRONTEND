import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewDocumentRoutingModule } from './preview-document-routing.module';
import { PreviewDocumentComponent } from './preview-document.component';
import { DialogModule } from 'primeng/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
/**
 * Este módulo facilita la previsualización de documentos utilizando la biblioteca NgxDocViewerModule. Con este módulo, puedes integrar fácilmente la visualización de documentos en tu aplicación Angular, lo que permite a los usuarios ver documentos sin necesidad de descargarlos o abrirlos en aplicaciones externas.
 */
@NgModule({
  declarations: [PreviewDocumentComponent],
  imports: [CommonModule, PreviewDocumentRoutingModule, DialogModule, NgxDocViewerModule],
  exports: [PreviewDocumentComponent],
})
export class PreviewDocumentModule {}
