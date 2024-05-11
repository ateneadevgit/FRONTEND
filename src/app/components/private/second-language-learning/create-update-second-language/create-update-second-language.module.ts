import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageModule } from 'primeng/image';
import { CreateUpdateSecondLanguageComponent } from './create-update-second-language.component';
import { CreateUpdateSecondLanguageRoutingModule } from './create-update-second-language-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Este módulo es un formulario que permite crear y editar cursos para el Centro de Aprendizaje de una Segunda Lengua. Incluye campos para ingresar detalles como título del curso, objetivos, duración, modalidad y más. Los usuarios pueden cargar imágenes y logos, además de especificar a qué grupo está dirigido el curso. Es una herramienta completa para gestionar la información de los cursos de manera eficiente y personalizada.
 */
@NgModule({
  declarations: [CreateUpdateSecondLanguageComponent],
  imports: [
    CommonModule,
    CreateUpdateSecondLanguageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    FileUploadModule,
    NgxFileDropModule,
    ImageModule,
    InputTextModule,
    DropdownModule,
  ],
  exports: [CreateUpdateSecondLanguageComponent],
})
export class CreateUpdateSecondLanguageModule {}
