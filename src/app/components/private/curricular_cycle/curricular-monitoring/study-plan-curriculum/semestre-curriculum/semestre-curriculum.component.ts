import { Component, Input, OnInit } from '@angular/core';
import { SemesterModel } from 'src/models/workflow.interface';

@Component({
  selector: 'app-semestre-curriculum',
  templateUrl: './semestre-curriculum.component.html',
  styleUrls: ['./semestre-curriculum.component.scss'],
})
export class SemestreCurriculumComponent implements OnInit {
  @Input() objSemesterList: SemesterModel[] = [];

  ngOnInit(): void {
    this.objSemesterList = this.objSemesterList.map((obj) => {
      obj.semesterRoman = this.convertirANumeroRomano(obj.semesterNumber);
      return obj;
    });
  }

  getBackgroundColor(index: number): string {
    const colors = ['#a6cef9', '#6bd6af', '#f7ffb0', '#4181c5']; // Lista de colores
    return colors[index % colors.length]; // Cambia entre los colores en cada iteración
  }

  convertirANumeroRomano(numero: number): string {
    const romanos: [number, string][] = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ];

    let resultado = '';
    for (const [value, roman] of romanos) {
      while (numero >= value) {
        resultado += roman;
        numero -= value;
      }
    }
    return resultado;
  }
}
