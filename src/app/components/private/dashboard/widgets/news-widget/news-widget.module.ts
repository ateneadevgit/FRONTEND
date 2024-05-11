import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsWidgetComponent } from './news-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
/**
 *  Este módulo integra un widget de noticias que muestra las últimas cuatro
 * noticias registradas en la plataforma. Ofrece un acceso rápido a cada una
 * de ellas, permitiendo a los usuarios mantenerse al día con la información
 * más reciente de manera conveniente y eficiente.
 */
@NgModule({
  declarations: [NewsWidgetComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    MultiSelectModule,
    ImageModule,
    CardModule,
  ],
  exports: [NewsWidgetComponent],
})
export class NewsWidgetModule {}
