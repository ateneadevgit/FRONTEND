import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EportafolioRoutingModule } from './eportafolio-routing.module';
import { EportafolioComponent } from './eportafolio.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedTableModule } from './shared-table/shared-table.module';
import { FavoriteTableModule } from './favorite-table/favorite-table.module';
/**
 * Este módulo proporciona funcionalidades para la carga, visualización y administración
 * de archivos y enlaces, permitiendo a los usuarios mantener su información en un solo
 * lugar dentro de la fundación. Los usuarios pueden cargar archivos, como documentos PDF
 * o imágenes, así como agregar enlaces a recursos externos relevantes.
 * Además, el módulo ofrece herramientas de gestión para organizar y acceder fácilmente
 * a estos archivos y enlaces, lo que proporciona una solución integral para almacenar y
 * gestionar información importante.
 */
@NgModule({
  declarations: [EportafolioComponent],
  imports: [
    CommonModule,
    EportafolioRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    RadioButtonModule,
    ColorPickerModule,
    ContextMenuModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ProgressBarModule,
    SharedTableModule,
    FavoriteTableModule,
  ],
  exports: [EportafolioComponent],
})
export class EportafolioModule {}
