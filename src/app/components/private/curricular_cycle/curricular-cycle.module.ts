import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CurricularCycleRoutingModule } from './curricular-cycle-routing.module';
import { ButtonModule } from 'primeng/button';
import { CurricularCycleComponent } from './curricular-cycle.component';
/**
 * Módulo que lista menu para acceder a lasa opciones de un ciclo curricular con los siguientes elementos:
 * 1. Lineamientos institucionales de gestión curricular.
 * 2. Monitoreo curricular.
 * 3. Comités
 */
@NgModule({
  declarations: [CurricularCycleComponent],
  imports: [CommonModule, CurricularCycleRoutingModule, ReactiveFormsModule, ButtonModule],
})
export class CurricularCycleModule {}
