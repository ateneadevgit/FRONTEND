import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewNewComponent } from './view-new.component';
import { ViewNewRoutingModule } from './view-new-routing.module';
/**
 * Este módulo está diseñado para mostrar la información de una noticia de manera
 * visual y atractiva. Los usuarios pueden ver las imágenes asociadas a la noticia
 * junto con su descripción. Esto proporciona una experiencia de lectura más completa
 * y envolvente, permitiendo que los usuarios comprendan rápidamente el contenido de
 * la noticia y se mantengan informados de manera efectiva.
 */
@NgModule({
  declarations: [ViewNewComponent],
  imports: [
    CommonModule,
    ViewNewRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    SharedModule,
  ],
  exports: [ViewNewComponent],
})
export class ViewNewModule {}
