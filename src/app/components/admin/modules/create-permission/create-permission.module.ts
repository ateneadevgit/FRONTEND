import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePermissionRoutingModule } from './create-permission-routing.module';
import { CreatePermissionComponent } from './create-permission.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [CreatePermissionComponent],
  imports: [
    CommonModule,
    CreatePermissionRoutingModule,
    BreadcrumbModule,
    TableModule,
    InputSwitchModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
  ],
  exports: [CreatePermissionComponent],
})
export class CreatePermissionModule {}
