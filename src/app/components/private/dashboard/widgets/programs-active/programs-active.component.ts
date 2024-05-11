/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { Workflow } from 'src/enums/workflow.enum';

@Component({
  selector: 'app-programs-active',
  templateUrl: './programs-active.component.html',
  styleUrls: ['./programs-active.component.scss'],
})
export class ProgramsActiveComponent {
  rows: any = [];
  listColor = [
    { value: 'MEN_RED', start: 0, end: 0 },
    { value: 'MEN_GREEN', start: 0, end: 0 },
    { value: 'MEN_YELLOW', start: 0, end: 0 },
  ];

  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private programsService: ProgramsService,
    private utilsService: UtilsService,
    private configService: ConfigService,
  ) {
    this.loadPrograms();
    this.loadSettingColor();
  }

  loadSettingColor() {
    this.listColor.map((obj) => {
      this.configService.getSettingById(obj.value).subscribe((response) => {
        const part = response.data.split('-');
        obj.start = Number(part[0]);
        obj.end = Number(part[1]);
      });
    });
  }

  loadPrograms() {
    this.rows = [];
    this.programsService
      .getProgramByStatus(Workflow.ACTIVE, '', '', this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.totalRecords = data.totalNumberItems;
          data.content.forEach((element: any) => {
            this.rows.push(JSON.parse(element));
          });
          this.rows.forEach((element: any) => {
            const fecha = new Date(element?.men_end_date);

            // Obtener los componentes de fecha (día, mes, año)
            const dia = fecha.getDate().toString().padStart(2, '0');
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // ¡Ojo! Los meses en JavaScript son indexados desde 0
            const año = fecha.getFullYear();

            // Formatear la fecha en el formato dd/mm/yyyy
            element.men_end_date_format = `${dia}/${mes}/${año}`;
          });
        },
      });
  }
  getColor(value: any, isdate: boolean): string {
    if (!value) {
      return 'gray'; // Color por defecto si no hay fecha
    }
    const hoy = new Date();
    let fecha = new Date();
    if (isdate) {
      fecha = new Date(value);
    } else {
      const partes = value.split('/');
      // Verificar si hay tres partes y son números
      if (partes.length === 3 && partes.every((part: string) => !isNaN(Number(part)))) {
        // Crear un objeto de fecha en formato yyyy/mm/dd
        const fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        fecha = new Date(fechaFormateada);
      }
    }

    const diferenciaAnio = this.calcularDiferenciaAnios(hoy, fecha);

    if (diferenciaAnio <= this.listColor.find((obj) => obj.value === 'MEN_RED')!.end) {
      // Calcula el color en dias
      return 'red';
    } else if (diferenciaAnio <= this.listColor.find((obj) => obj.value === 'MEN_YELLOW')!.end) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
  private calcularDiferenciaAnios(fecha1: Date, fecha2: Date): number {
    const year1 = fecha1.getFullYear();
    const year2 = fecha2.getFullYear();
    return Math.abs(year1 - year2);
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }
}
