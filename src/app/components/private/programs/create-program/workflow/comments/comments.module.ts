import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { TimelineModule } from 'primeng/timeline';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { DialogModule } from 'primeng/dialog';

/**
 *
 * Este módulo se encarga de gestionar los comentarios en cada uno
 * de los pasos de condiciones para la creación de un programa académico.
 * Permite a los usuarios visualizar los comentarios existentes, así como
 * crear nuevos comentarios o responder a los comentarios ya existentes.
 * De esta manera, facilita la comunicación y colaboración entre los usuarios
 * involucrados en el proceso de creación del programa académico al proporcionar
 * un espacio dedicado para intercambiar ideas, sugerencias y aclaraciones en
 * cada etapa del proceso.
 */

@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    TimelineModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DialogModule,
  ],
  exports: [CommentsComponent],
})
export class CommentsModule {}
