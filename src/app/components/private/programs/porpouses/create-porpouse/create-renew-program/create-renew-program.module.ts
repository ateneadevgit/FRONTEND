import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRenewProgramComponent } from './create-renew-program.component';

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
Este módulo alberga un formulario que facilita la selección de un programa activo para iniciar el proceso de renovación. En el formulario, el usuario puede elegir el programa que desea renovar, proporcionando detalles iniciales e información relevante para la renovación.

Una vez seleccionado el programa a renovar y completado el formulario con la información necesaria, el usuario puede enviar la propuesta de renovación para su revisión y aprobación por parte del vicerrector. Este módulo actúa como el punto de inicio para iniciar el proceso de renovación de un programa académico existente en el sistema.
*/
@NgModule({
  declarations: [CreateRenewProgramComponent],
  imports: [
    CommonModule,
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
  exports: [CreateRenewProgramComponent],
})
export class CreateRenewProgramModule {}
