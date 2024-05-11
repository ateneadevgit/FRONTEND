import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCatalogRoutingModule } from './create-catalog-routing.module';
import { CreateCatalogComponent } from './create-catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [CreateCatalogComponent],
  imports: [
    CommonModule,
    CreateCatalogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    InputSwitchModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    BreadcrumbModule,
  ],
  exports: [CreateCatalogComponent],
})
export class CreateCatalogModule {}
