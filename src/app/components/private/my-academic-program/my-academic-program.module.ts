import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MyAcademicProgramRoutingModule } from './my-academic-program-routing.module';
import { MyAcademicProgramComponent } from './my-academic-program.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
/**
 *Este módulo tiene la responsabilidad de enumerar los programas académicos 
 disponibles tanto para estudiantes formales como no formales. Su propósito 
 es proporcionar a los estudiantes una visión completa y detallada de su programa 
 académico, permitiéndoles acceder a toda la información relevante relacionada 
 con el mismo
 */
@NgModule({
  declarations: [MyAcademicProgramComponent],
  imports: [CommonModule, MyAcademicProgramRoutingModule, CardModule, ButtonModule, DialogModule],
})
export class MyAcademicProgramModule {}
