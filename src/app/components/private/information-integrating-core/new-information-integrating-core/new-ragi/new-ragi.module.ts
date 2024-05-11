import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { NewRagiComponent } from './new-ragi.component';
import { NewRagiRoutingModule } from './new-ragi-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageModule } from 'primeng/image';
/**
 * Este módulo facilita la creación y edición de Resultados de Aprendizaje Generales
 * Institucionales, dentro del proceso de desarrollo de un Núcleo Integrador de Formación
 * Sanmartiniana. Permite cargar imágenes y descripciones que enriquecen estos resultados,
 * contribuyendo así a un proceso de aprendizaje más completo y visualmente atractivo.
 * El módulo es una parte esencial del desarrollo y diseño del Núcleo Integrador de
 * Formación Sanmartiniana, proporcionando herramientas para definir los objetivos
 * educativos institucionales de manera clara y efectiva.
 */
@NgModule({
  declarations: [NewRagiComponent],
  imports: [
    CommonModule,
    NewRagiRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    FileUploadModule,
    NgxFileDropModule,
    ImageModule,
  ],
  exports: [NewRagiComponent],
})
export class NewRagiModule {}
