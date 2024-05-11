import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogActiveEditComponent } from './dialog-active-edit.component';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from 'src/app/shared/shared.module';
/**
 * 
Este módulo despliega una funcionalidad crucial en el proceso de edición de un programa académico. Permite iniciar la edición seleccionando los módulos que serán editados por el Decano. El Decano tiene la facultad de elegir qué aspectos específicos del programa académico necesitan modificaciones y cuáles serán los cambios propuestos.

Entre las opciones disponibles se encuentran definir si la edición debe ser validada por el Vicerrector o si la aprobación del Decano es suficiente. Además, el módulo se encarga de llevar a cabo la validación de los módulos aprobados por el Vicerrector, en caso de ser necesario, y proporciona la visualización del acta de edición.

En resumen, este módulo facilita el inicio del proceso de edición de un programa académico, permitiendo que el Decano seleccione los módulos a editar y defina los pasos a seguir en el proceso de validación y aprobación, asegurando una gestión eficiente y transparente de las modificaciones propuestas.
*/
@NgModule({
  declarations: [DialogActiveEditComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    CheckboxModule,
    FileUploadModule,
  ],
  exports: [DialogActiveEditComponent],
  providers: [MessageService],
})
export class DialogActiveEditModule {}
