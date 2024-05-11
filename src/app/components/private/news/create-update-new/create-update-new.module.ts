import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CreateUpdateNewRoutingModule } from './create-update-new-routing.module';
import { CreateUpdateNewComponent } from './create-update-new.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ViewNewModule } from '../view-new/view-new.module';
import { MultiSelectModule } from 'primeng/multiselect';
/**
 * Este módulo aloja un formulario que permite la creación y actualización de noticias.
 * Los usuarios pueden ingresar una descripción, una imagen de portada y varias
 * imágenes de referencia para enriquecer la noticia con información relevante.
 * De esta manera, se asegura de que cada noticia esté completa y tenga todos los
 * detalles necesarios para captar la atención del usuario y proporcionar una experiencia
 * informativa y atractiva.
 */
@NgModule({
  declarations: [CreateUpdateNewComponent],
  imports: [
    CommonModule,
    CreateUpdateNewRoutingModule,
    ReactiveFormsModule,
    ViewNewModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    MultiSelectModule,
  ],
  exports: [CreateUpdateNewComponent],
})
export class CreateUpdateNewModule {}
