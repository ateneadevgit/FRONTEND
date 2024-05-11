import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CropImageRoutingModule } from './crop-image-routing.module';
import { CropImageComponent } from './crop-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * El módulo de recorte de imágenes es una herramienta transversal diseñada para permitir a los usuarios recortar imágenes cargadas antes de ser enviadas al módulo que las implementa. Esta funcionalidad agrega una capa adicional de versatilidad y precisión al proceso de manejo de imágenes en aplicaciones web y móviles.

Facilita a los usuarios la carga de imágenes desde sus dispositivos, lo que les permite seleccionar y cargar imágenes de forma rápida y sencilla para su posterior edición.

Una vez cargadas, los usuarios pueden recortar las imágenes utilizando controles intuitivos, como herramientas de selección y ajuste, para definir áreas específicas de interés.

Finalmente, las imágenes recortadas pueden ser enviadas al módulo correspondiente para su procesamiento adicional o para su uso en otras partes de la aplicación. Este módulo proporciona una solución eficaz y fácil de usar para la manipulación de imágenes, mejorando así la experiencia del usuario y la funcionalidad global de la aplicación.

*/
@NgModule({
  declarations: [CropImageComponent],
  imports: [
    CommonModule,
    CropImageRoutingModule,
    ImageCropperModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [CropImageComponent],
})
export class CropImageModule {}
