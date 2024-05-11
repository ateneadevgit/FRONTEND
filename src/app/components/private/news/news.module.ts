import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
/**
 * Este módulo central actúa como la piedra angular del sistema al permitir
 * la visualización de todas las noticias creadas en la plataforma.
 * Ofrece acceso rápido y fácil a la información detallada de cada noticia y
 * también proporciona la funcionalidad para editarlas, siempre y cuando el usuario
 * tenga los permisos necesarios. De esta manera, el módulo central sirve como un punto
 * centralizado para administrar y acceder a todas las noticias del sistema,
 * brindando una experiencia de usuario coherente y eficiente.
 */
@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    MultiSelectModule,
    ImageModule,
    ConfirmDialogModule,
    CardModule,
  ],
  providers: [ConfirmationService],
})
export class NewsModule {}
