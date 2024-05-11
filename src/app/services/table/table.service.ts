import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  /**
   * Asigna un nombre legible a una columna de la tabla.
   * @param column El nombre de la columna.
   * @returns El nombre legible de la columna.
   */
  nameColumn(column: string) {
    if (column === 'id_program') {
      return 'ID';
    }
    if (column === 'name') {
      return 'Nombre';
    }
    return column;
  }
}
