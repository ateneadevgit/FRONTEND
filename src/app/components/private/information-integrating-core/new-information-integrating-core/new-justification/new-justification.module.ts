import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { NewJustificationRoutingModule } from './new-justification-routing.module';
import { NewJustificationComponent } from './new-justification.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageModule } from 'primeng/image';
/**
 * Este módulo se encarga de la creación y edición de la justificación en el Núcleo Integrador
 * de Formación sanmartiniana, permitiendo la carga de imágenes y la descripción correspondiente.
 * Facilita a los usuarios la elaboración de una justificación completa y detallada,
 * enriquecida con contenido visual, para respaldar y fundamentar el proceso de formación
 * en el contexto del Núcleo Integrador de Formación.
 */
@NgModule({
  declarations: [NewJustificationComponent],
  imports: [
    CommonModule,
    NewJustificationRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    FileUploadModule,
    NgxFileDropModule,
    ImageModule,
  ],
  exports: [NewJustificationComponent],
})
export class NewJustificationModule {}
