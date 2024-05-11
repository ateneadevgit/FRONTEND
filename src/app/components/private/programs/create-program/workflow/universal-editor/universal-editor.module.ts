import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalEditorComponent } from './universal-editor.component';
import { UniversalEditorRoutingModule } from './universal-editor-routing.module';
import { CommentsModule } from '../comments/comments.module';
import { ToastModule } from 'primeng/toast';
/**
 * Este módulo transversal se encarga de gestionar el texto enriquecido
 * que algunos módulos necesitan en sus formularios.
 * Proporciona una interfaz para editar el texto enriquecido,
 * lo que permite al usuario dar formato al texto, agregar imágenes y
 * realizar otras acciones de edición según sea necesario. Una vez que se completa
 * la edición, el módulo transversal proporciona una salida del resultado formateado
 * para que el módulo que lo integra pueda mostrar este contenido enriquecido de
 * manera adecuada. De esta manera, los módulos que requieren funcionalidad de
 * texto enriquecido pueden integrar este módulo transversal para obtener esta
 * funcionalidad de manera consistente y eficiente.
 */
@NgModule({
  declarations: [UniversalEditorComponent],
  imports: [
    CommonModule,
    UniversalEditorRoutingModule,
    ToastModule,
    ButtonModule,
    CommentsModule,
    TreeTableModule,
    SidebarModule,
    SharedModule,
    TabViewModule,
    DialogModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [UniversalEditorComponent],
  providers: [MessageService],
})
export class UniversalEditorModule {}
