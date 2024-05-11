import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageModule } from 'primeng/image';
import { ViewNifsComponent } from './view-nifs.component';
import { ViewNifsRoutingModule } from './view-nifs-routing.module';
/**
 * 
Este módulo está encargado de la visualización de la información básica del 
Núcleo Integrador de Formación (NIF). Proporciona una interfaz para acceder a 
los detalles esenciales del NIF, como su nombre, descripción, objetivos y 
cualquier otra información relevante. Esta visualización permite a los usuarios 
obtener una comprensión rápida y clara del propósito y alcance del NIF en cuestión.
 */
@NgModule({
  declarations: [ViewNifsComponent],
  imports: [
    CommonModule,
    ViewNifsRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    FileUploadModule,
    NgxFileDropModule,
    ImageModule,
  ],
  exports: [ViewNifsComponent],
})
export class ViewNifsModule {}
