import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
/**
 * 
Este módulo permite buscar documentos públicos almacenados en el sistema para su consulta. Los usuarios pueden realizar búsquedas utilizando diferentes criterios, como nombre del documento y palabra clave. Además, se puede filtrar la búsqueda por tipo de formato del documento. Una vez especificados los criterios de búsqueda, los usuarios pueden presionar el botón "Buscar" para obtener los resultados correspondientes. También se proporciona la opción de limpiar los criterios de búsqueda para realizar una nueva búsqueda. Este formulario mejora la experiencia del usuario al facilitar la búsqueda y acceso a la información pública almacenada en el sistema.
 */
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
