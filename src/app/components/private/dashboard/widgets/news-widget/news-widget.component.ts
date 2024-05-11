import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news/news.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { INew } from 'src/models/news.interface';

@Component({
  selector: 'app-news-widget',
  templateUrl: './news-widget.component.html',
  styleUrls: ['./news-widget.component.scss'],
})
export class NewsWidgetComponent {
  listNew: INew[] = [];
  routesApp = RoutesApp;
  constructor(
    private newsService: NewsService,
    private router: Router,
  ) {
    this.loadNewUpdateById();
  }

  loadNewUpdateById() {
    this.newsService.getNewsByCampus([]).subscribe((response) => {
      const { data } = response;
      this.listNew = data.slice(0, 4);
    });
  }
  getColor(index: number): string {
    // Define tus colores aquí
    const colors = ['#4b878d', '#c19c00', '#16395f', '#871414'];

    // Elige el color en función del índice
    return colors[index % colors.length];
  }

  dateFormatLabel(date: string) {
    const fecha = new Date(date);
    // Paso 2: Obtener el nombre del mes
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const nombreMes = meses[fecha.getMonth()];
    // Paso 3: Obtener el día
    const dia = fecha.getDate();
    // Paso 4: Obtener el año
    const año = fecha.getFullYear();
    // Paso 5: Construir la cadena de fecha en el formato deseado
    const fechaFormateada = `${nombreMes} ${dia} de ${año}`;
    return fechaFormateada;
  }

  redireccionarAPantalla(idnew: number | undefined): void {
    this.router.navigate([
      this.routesApp.NEWS + '/' + this.routesApp.NEWS + '/' + this.routesApp.VIEW_NEW + '/' + idnew,
    ]);
  }
}
