import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationRoutingModule } from './pagination-routing.module';
import { PaginationComponent } from './pagination.component';
import { PaginatorModule } from 'primeng/paginator';
/**
 * Este módulo transversal proporciona servicios de paginación para tablas que utilizan el componente Paginator de PrimeNG. Con este módulo, puedes implementar fácilmente la paginación en tus tablas Angular y PrimeNG, lo que permite una navegación sencilla entre páginas de datos.
 */
@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, PaginationRoutingModule, PaginatorModule],
  exports: [PaginationComponent],
})
export class PaginationModule {}
