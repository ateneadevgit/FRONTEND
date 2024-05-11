import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogActiveEditModule } from '../../programs/edit-program/dialog-active-edit/dialog-active-edit.module';
import { DialogModule } from 'primeng/dialog';
import { CommittesComponent } from './committes.component';
import { CommittesRoutingModule } from './committes-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'src/app/shared/shared.module';
import { TreeTableModule } from 'primeng/treetable';
/**
 * Módulo que permite la visualización de los comites,
 * la creación de actas y presentaciones que soportan cada uno de ellos.
 */
@NgModule({
  declarations: [CommittesComponent],
  imports: [
    CommonModule,
    CommittesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DialogActiveEditModule,
    DialogModule,
    TabViewModule,
    CheckboxModule,
    FileUploadModule,
    TableModule,
    TreeTableModule,
    SharedModule,
    AccordionModule,
  ],
})
export class CommitesModule {}
