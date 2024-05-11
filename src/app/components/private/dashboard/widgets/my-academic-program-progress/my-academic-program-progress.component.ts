import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { LoginService } from 'src/app/services/login/login.service';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { IDataMyProgress } from 'src/models/dashboard.inteface';
import { LoginResponse } from 'src/models/login.interface';
import { ContentProgram } from 'src/models/program.interface';

@Component({
  selector: 'app-my-academic-program-progress',
  templateUrl: './my-academic-program-progress.component.html',
  styleUrls: ['./my-academic-program-progress.component.scss'],
})
export class MyAcademicProgramProgressComponent implements OnInit, AfterViewInit {
  percentage = 10; // Porcentaje lleno
  session?: LoginResponse;
  dataStudent: IDataMyProgress | null = null;

  programSelect: ContentProgram | null = null;
  programs: number[] | null = [];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cryptsService: CryptsService,
    private loginService: LoginService,
  ) {
    this.session = this.cryptsService.decryptData(SessionStorageItems.SESSION) as LoginResponse;
    this.programs = this.loginService.getProgram();
    this.loadData();
  }

  ngOnInit(): void {
    this.updateDonut();
  }

  ngAfterViewInit() {
    this.draw();
  }

  @ViewChild('donutSegment') donutSegment!: ElementRef;
  updateDonut() {
    if (!this.donutSegment) return; // Verifica que donutSegment no sea undefined
    const circumference = 2 * Math.PI * 90;
    const dasharray =
      ((100 - this.percentage) / 100) * circumference +
      ' ' +
      (this.percentage / 100) * circumference;
    this.donutSegment.nativeElement.setAttribute('stroke-dasharray', dasharray);
  }

  fillPercentage = 30;
  calculateFillPercentage(): string {
    // Ajustar el porcentaje de llenado al rango de 0 a 360 grados (completo)
    return this.fillPercentage * 3.6 + 'deg';
  }

  loadData() {
    if (this.programs && this.programs.length > 0)
      this.dashboardService.getProgramProgress(this.programs[0]).subscribe((response) => {
        this.dataStudent = response.data;
        this.draw();
      });
  }

  redirect() {
    this.router.navigate([`/${RoutesApp.DASHBOARD}/${RoutesApp.ACADEMIC_RECORD}`]);
  }

  @ViewChild('pieChartCanvas', { static: true }) pieChartCanvas!: ElementRef<HTMLCanvasElement>;

  draw() {
    if (this.pieChartCanvas && this.dataStudent) {
      const canvas = this.pieChartCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY);

      // Calcula el ángulo de inicio y fin para el arco interior (fondo)
      const startAngleInner = Math.PI * (120 / 180);
      const endAngleInner = Math.PI * (60 / 180);

      // Calcula el ángulo de inicio y fin para el arco exterior (indicador)
      const startAngleOuter = startAngleInner;

      const endAngleOuter = startAngleInner + 2 * Math.PI * (this.dataStudent.totalProgress / 100);

      if (ctx) {
        // Dibuja el arco interior (fondo)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.6, startAngleInner, endAngleInner, false);
        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = radius * 0.2;
        ctx.stroke();

        // Dibuja el arco exterior (indicador)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.6, startAngleOuter, endAngleOuter, false);
        ctx.strokeStyle = '#4b878d';
        ctx.lineWidth = radius * 0.2;
        ctx.stroke();
        const fontSize = 20;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = '#4b878d';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const valorRedondeado = this.dataStudent.totalProgress.toFixed(2);
        ctx.fillText(`${valorRedondeado}%`, centerX, centerY);
      }
    }
  }
}
