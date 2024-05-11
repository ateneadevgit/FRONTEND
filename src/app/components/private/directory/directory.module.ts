import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';
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
 * Este módulo presenta una tabla que contiene toda la información de contacto de los
 * docentes y funcionarios, facilitando su acceso para que puedan ser contactados más fácilmente.
 * Los estudiantes y otros usuarios pueden encontrar rápidamente la información de contacto
 * necesaria, como direcciones de correo electrónico, facultad y sede,
 * lo que simplifica el proceso de comunicación con el personal académico y
 * administrativo.
 */
@NgModule({
  declarations: [DirectoryComponent],
  imports: [
    CommonModule,
    DirectoryRoutingModule,
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
  exports: [DirectoryComponent],
})
export class DirectoryModule {}
