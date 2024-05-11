import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemBankRoutingModule } from './problem-bank-routing.module';
import { ProblemBankComponent } from './problem-bank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ProblemBankTableModule } from './problem-bank-table/problem-bank-table.module';
import { CompetenciesModule } from './competencies/competencies.module';
/**
 * Este módulo se encarga de gestionar las vistas del banco de problemas y
 * las competencias, integrando los módulos correspondientes: ProblemBankTableModule y
 * CompetenciesModule. Dependiendo del perfil del usuario que accede al sistema,
 * se envían banderas a los componentes internos para realizar funcionalidades específicas.
 * Esto permite una experiencia personalizada para cada usuario, brindando acceso solo a
 * las funcionalidades y datos relevantes según su perfil, lo que aumenta la eficiencia
 * y la usabilidad del sistema.
 *  */
@NgModule({
  declarations: [ProblemBankComponent],
  imports: [
    CommonModule,
    ProblemBankRoutingModule,
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
    TabViewModule,
    ProblemBankTableModule,
    CompetenciesModule,
  ],
  exports: [ProblemBankComponent],
})
export class ProblemBankModule {}
