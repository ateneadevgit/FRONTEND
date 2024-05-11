import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCurricularComponentsComponent } from './edit-curricular-components.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { NgxEditorModule } from 'ngx-editor';
import { EditorModule } from 'src/app/shared/editor/editor.module';
/**
 * Este módulo permite la edición de cada uno de los elementos mencionados, tales como
 * "Epistemológico", "Pedagógico", "Formativo", "Interacción" y "Evaluativo".
 * Cada uno de estos elementos se representa en una pestaña diferente, lo que
 * facilita la navegación y la edición específica de cada aspecto.
 * Dentro de cada pestaña, se encuentra un componente de editor (`<app-editor>`)
 * que permite al usuario editar el contenido correspondiente.
 * Cuando se realiza una edición en el editor, se activa un evento que captura el
 * HTML generado y lo pasa al método `createHtml()` junto con un identificador único
 * para cada elemento. Este método se encarga de procesar y almacenar el HTML
 * generado para cada elemento en una estructura de datos correspondiente.
 * En resumen, este módulo proporciona una interfaz organizada y eficiente para
 * la edición de los diferentes aspectos mencionados, permitiendo al usuario trabajar
 * de manera efectiva en la creación y modificación de contenido específico para cada elemento.
 */
@NgModule({
  declarations: [EditCurricularComponentsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    NgxEditorModule,
    EditorModule,
  ],
  exports: [EditCurricularComponentsComponent],
})
export class EditCurricularComponentsModule {}
