import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { IGender } from 'src/models/dashboard.inteface';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit, AfterViewInit {
  public chart!: Chart;

  facultyList: CatalogsByIdResponse[] = [];
  facultySelect: CatalogsByIdResponse | null = null;

  gender!: IGender;
  countStudent = 0;

  constructor(
    private dashboardService: DashboardService,
    private catalogsService: CatalogsService,
  ) {
    this.loadData();
    this.loadCountUsers();
  }

  ngOnInit(): void {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        },
      ],
    };
    if (ctx != null) {
      this.chart = new Chart(ctx, {
        type: 'pie' as ChartType,
        data: data,
      });
    }
  }

  loadData() {
    this.catalogsService.getCatalogItemsByCatalog(CatalogsEnum.FACULTIES).subscribe((response) => {
      this.facultyList = response.data;
    });
    this.dashboardService.getUserGender().subscribe((response) => {
      this.gender = response.data;
      this.drawPieChart();
    });
  }

  loadCountUsers() {
    const search = this.facultySelect ? this.facultySelect.catalogItemId : 0;

    this.dashboardService.getUserByFaculty(search).subscribe((response) => {
      this.countStudent = response.data;
    });
  }

  @ViewChild('pieChartCanvas', { static: true }) pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  variable1 = 10;
  variable2 = 10;

  ngAfterViewInit() {
    this.drawPieChart();
  }

  drawPieChart() {
    if (this.gender) {
      const total = this.gender.masc + this.gender.fem;

      // Calcula el porcentaje de cada valor
      //const porcentaje1 = (this.gender.masc / total) * 100;
      const porcentaje2 = (this.gender.fem / total) * 100;

      const canvas = this.pieChartCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY);
      if (ctx) {
        // Dibuja el segmento para variable1
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI * (porcentaje2 / 100));
        ctx.fillStyle = '#df586e';
        ctx.fill();

        // Dibuja el segmento para variable2
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 2 * Math.PI * (porcentaje2 / 100), 2 * Math.PI);
        ctx.fillStyle = '#3b9ff6';
        ctx.fill();
      }
    }
  }
}
