import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsTwoRoutingModule } from './comments-two-routing.module';
import { CommentsTwoComponent } from './comments-two.component';
import { TimelineModule } from 'primeng/timeline';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { DialogModule } from 'primeng/dialog';
/**
 * Este módulo gestiona los comentarios relacionados con los programas de asignaturas y las guías de asignaturas. Permite a los usuarios visualizar y agregar comentarios para proporcionar retroalimentación, hacer preguntas o discutir aspectos específicos de los programas o guías de asignaturas. Además, ofrece funcionalidades para responder a comentarios existentes, editar comentarios propios y eliminarlos si es necesario. El objetivo principal es fomentar la colaboración y la comunicación entre los usuarios para mejorar la calidad y la comprensión de los programas y las guías de asignaturas.
 */
@NgModule({
  declarations: [CommentsTwoComponent],
  imports: [
    CommonModule,
    CommentsTwoRoutingModule,
    TimelineModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DialogModule,
  ],
  exports: [CommentsTwoComponent],
})
export class CommentsTwoModule {}
