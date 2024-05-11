import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CurricularMonitoringComponent } from './curricular-monitoring.component';
import { CurricularMonitoringRoutingModule } from './curricular-monitoring-routing.module';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogActiveEditModule } from '../../programs/edit-program/dialog-active-edit/dialog-active-edit.module';
import { DialogModule } from 'primeng/dialog';
/**
 * Módulo encargado de visualizar la información detalla del
 * historial de los programas académicos listando todos los
 * módulos que lo integran, adicional a ello se encontrara el
 * botón para solicitar la actualización del programa iniciando el
 * flujo de edición por parte de un decano.
 */
@NgModule({
  declarations: [CurricularMonitoringComponent],
  imports: [
    CommonModule,
    CurricularMonitoringRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DialogActiveEditModule,
    DialogModule,
  ],
})
export class CurricularMonitoringModule {}
