import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProgramComponent } from './edit-program.component';
import { EditProgramRoutingModule } from './edit-program-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { EditSummaryProgramModule } from './edit-summary-program/edit-summary-program.module';
/**
 * Este módulo tiene la función de listar los módulos que han sido aprobados para la edición
 * de un programa activo en el sistema. Proporciona acceso a cada uno de estos módulos para
 * su posterior edición y aprobación, dependiendo del flujo de trabajo que se haya definido en
 * el momento de crear la edición.
 * Al listar estos módulos aprobados, el módulo permite a los usuarios seguir de cerca
 * el progreso de la edición del programa académico. Además, indica el estado de cada módulo,
 * ya sea aprobado, en revisión o inicializado, lo que brinda una visión clara del proceso de
 * edición en su totalidad.
 * Este módulo es útil para los administradores y responsables del programa
 * académico, ya que les permite gestionar eficientemente el proceso de edición
 * y asegurarse de que todos los módulos necesarios estén en el estado adecuado antes
 * de su implementación.
 */
@NgModule({
  declarations: [EditProgramComponent],
  imports: [
    CommonModule,
    EditProgramRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DialogModule,
    EditSummaryProgramModule,
  ],
})
export class EditProgramModule {}
