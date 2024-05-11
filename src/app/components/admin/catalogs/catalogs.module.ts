import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CatalogsComponent } from './catalogs.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCatalogModule } from './create-catalog/create-catalog.module';

@NgModule({
  declarations: [CatalogsComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    TableModule,
    SharedModule,
    DialogModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CreateCatalogModule,
  ],
  exports: [CatalogsComponent],
})
export class CatalogsModule {}
