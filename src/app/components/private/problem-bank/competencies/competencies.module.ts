import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenciesComponent } from './competencies.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from 'src/app/shared/shared.module';
/**
 *
 * Este módulo administra toda la lógica de competencias que son utilizadas para la
 * creación de problemas en el banco de problemas, dirigido a los roles de Director,
 * Decano, Vicerrector y Estudiante. Define los flujos de datos para la creación,
 * edición y eliminación de las competencias, proporcionando una interfaz intuitiva y
 * funcionalidades específicas adaptadas a las necesidades de cada rol. Además, garantiza
 * que los usuarios puedan acceder y gestionar las competencias de manera eficiente y segura,
 * contribuyendo así a la mejora continua del sistema educativo.
 */
@NgModule({
  declarations: [CompetenciesComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    NgxEditorModule,
  ],
  exports: [CompetenciesComponent],
})
export class CompetenciesModule {}
