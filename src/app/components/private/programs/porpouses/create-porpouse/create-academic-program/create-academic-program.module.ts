import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAcademicProgramRoutingModule } from './create-academic-program-routing.module';
import { CreateAcademicProgramComponent } from './create-academic-program.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
/**
 * 
Este módulo consta de un formulario que habilita al decano para ingresar la información inicial necesaria para crear una propuesta de programa académico. En este formulario, el decano puede ingresar datos relevantes como el nombre del programa, imagen de portada e icono, tipo de programa, sedes y nivel de formación.

Una vez completado el formulario con la información requerida, el decano puede enviar la propuesta para su revisión y aprobación por parte de las autoridades pertinentes. Este módulo sirve como punto de partida para iniciar el proceso de creación de un nuevo programa académico en el sistema.
 */
@NgModule({
  declarations: [CreateAcademicProgramComponent],
  imports: [
    CommonModule,
    CreateAcademicProgramRoutingModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    FileUploadModule,
    ButtonModule,
    SharedModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DropdownModule,
    MultiSelectModule,
  ],
  exports: [CreateAcademicProgramComponent],
})
export class CreateAcademicProgramModule {}
