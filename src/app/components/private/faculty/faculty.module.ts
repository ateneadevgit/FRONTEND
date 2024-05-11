import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyComponent } from './faculty.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Este módulo lista todas las facultades que están registradas en el aplicativo.
 * Proporciona una visión general de todas las facultades disponibles en la plataforma,
 * lo que facilita a los usuarios encontrar la información relacionada con cada una de
 * ellas de manera rápida y sencilla.
 */
@NgModule({
  declarations: [FacultyComponent],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FacultyComponent],
})
export class FacultyModule {}
