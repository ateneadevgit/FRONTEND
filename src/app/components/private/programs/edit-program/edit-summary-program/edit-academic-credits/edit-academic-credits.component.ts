/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IObjCreditsAcademic } from 'src/models/program.interface';

@Component({
  selector: 'app-edit-academic-credits',
  templateUrl: './edit-academic-credits.component.html',
  styleUrls: ['./edit-academic-credits.component.scss'],
})
export class EditAcademicCreditsComponent implements OnInit {
  @Input() moduleId = '';
  @Input() programId = '';
  @Input() coreId = '';
  @Input() objAcademicCredits: IObjCreditsAcademic[] = [];
  @Output() updateObject = new EventEmitter<any>();
  buscador = '';

  subnucleosFiltrados = [...this.objAcademicCredits];

  ngOnInit(): void {
    setTimeout(() => {
      this.subnucleosFiltrados = [...this.objAcademicCredits];
    }, 2000);
  }

  editandoId: number | null = null;
  creditosEditados: string | null = null;

  // Método para activar la edición
  activarEdicion(id: number, creditos: string): void {
    this.editandoId = id;
    this.creditosEditados = creditos;
  }

  // Método para guardar los cambios
  guardarCambios(id: number): void {
    // Aquí puedes agregar la lógica para guardar los cambios, por ejemplo, hacer una solicitud HTTP
    const indice = this.objAcademicCredits.findIndex((item) => item.subjectId === id);

    if (indice !== -1) {
      // Actualiza el valor de créditos en el array
      this.objAcademicCredits[indice].creditNumber = Number(this.creditosEditados) || 0; // Puedes manejar el caso de valor nulo según tus necesidades
    }
    // Reinicia las propiedades de edición
    this.editandoId = null;
    this.creditosEditados = null;
    this.updateObject.emit(this.objAcademicCredits);
  }

  search() {
    const textoBusqueda = this.buscador.toLowerCase();
    if (this.buscador === '') {
      this.subnucleosFiltrados = this.objAcademicCredits;
    } else {
      this.subnucleosFiltrados = this.objAcademicCredits.filter((item) =>
        item.name.toLowerCase().includes(textoBusqueda),
      );
    }
  }

  cleanSearch() {
    this.buscador = '';
    this.search();
  }
}
