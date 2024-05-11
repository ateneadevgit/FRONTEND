import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { IAreaColor, IMyProgramCourse } from 'src/models/dashboard.inteface';
import { ContentProgram } from 'src/models/program.interface';

@Component({
  selector: 'app-my-academic-program-current',
  templateUrl: './my-academic-program-current.component.html',
  styleUrls: ['./my-academic-program-current.component.scss'],
})
export class MyAcademicProgramCurrentComponent {
  demo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  idPrograms: number[] = [];

  listPrograms: ContentProgram[] = [];
  programSelect: ContentProgram | null = null;

  listCourse: IMyProgramCourse[] = [];
  areaList: IAreaColor[] = [];
  constructor(
    private dashboardService: DashboardService,
    private programsService: ProgramsService,
    private loginService: LoginService,
    private router: Router,
  ) {
    const programs = this.loginService.getProgram();
    this.idPrograms = Array.isArray(programs) ? programs : [];
    this.idPrograms.forEach((element) => {
      this.programsService.getProgram(element).subscribe((response) => {
        const { data } = response;
        this.listPrograms.push(data);
        this.programSelect = this.listPrograms[0];
        this.loadData();
      });
    });
  }

  loadData() {
    this.dashboardService.getHistorySubject(this.idPrograms[0]).subscribe((response) => {
      this.listCourse = response.data;
      this.areaList = this.organizeAndGenerateColors(this.listCourse);
    });
  }

  getRandomColorPair(): { color: string; colorBody: string } {
    const colors = ['#e4ffeb', '#b7e7eb', '#c5f4ff', '#ffe884'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    // Generar un color oscuro relacionado para colorBody
    const colorBody = this.darkenColor(color);
    return { color, colorBody };
  }
  darkenColor(color: string): string {
    // Oscurecer el color
    // Por ejemplo, para oscurecer en un 20%, podrías usar el mismo enfoque que se mostró antes
    // Este es solo un ejemplo básico, puedes ajustar la lógica según tus necesidades específicas
    const percent = 0.2;
    const num = parseInt(color.slice(1), 16);
    const r = (num >> 16) - (num >> 16) * percent;
    const g = ((num >> 8) & 0x00ff) - ((num >> 8) & 0x00ff) * percent;
    const b = (num & 0x0000ff) - (num & 0x0000ff) * percent;
    return `#${((r << 16) | (g << 8) | b).toString(16)}`;
  }

  organizeAndGenerateColors(objects: IMyProgramCourse[]): IAreaColor[] {
    // Organize by coreId
    const organizedObjects = objects.sort((a, b) => a.coreId - b.coreId);
    // Create new array with structure { name, color, colorBody }
    const newArray: IAreaColor[] = [];

    const uniqueCoreNames = new Set<string>();
    // Map and transform each object
    organizedObjects.forEach((obj) => {
      if (!uniqueCoreNames.has(obj.coreName)) {
        uniqueCoreNames.add(obj.coreName);
        const genColor = this.getRandomColorPair();
        newArray.push({
          name: obj.coreName,
          color: genColor.color, // Get random color
          colorBody: genColor.colorBody, // Darken a random color
        });
      }
    });
    return newArray;
  }

  redirect(idSubject: number) {
    if (this.programSelect)
      this.router.navigate([
        `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.TRAINING}/${this.programSelect.idProgram}/type/9/${RoutesApp.STUDY_PLAN}/detail/${idSubject}`,
      ]);
  }

  getColor(courseName: string): string {
    const course = this.areaList.find((item) => item.name === courseName);
    return course ? course.color : 'white'; // Default color si no se encuentra el nombre
  }

  // Método para obtener el color de fondo del container-curse_data
  getColorBody(courseName: string): string {
    const course = this.areaList.find((item) => item.name === courseName);
    return course ? course.colorBody : 'white'; // Default color si no se encuentra el nombre
  }
}
