import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { ComponenteCurricularType } from 'src/enums/component-curricular-type.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { ContentProgram } from 'src/models/program.interface';

@Component({
  selector: 'app-my-academic-program',
  templateUrl: './my-academic-program.component.html',
  styleUrls: ['./my-academic-program.component.scss'],
})
export class MyAcademicProgramComponent implements OnInit {
  componenteCurricularType = ComponenteCurricularType;

  //idProgram = 1;
  idPrograms: number[] = [];

  listPrograms: ContentProgram[] = [];
  role = 0;
  Role = Role;
  visibleRegulation = false;
  urlA = '';
  urlB = '';
  constructor(
    private programsService: ProgramsService,
    private router: Router,
    private loginService: LoginService,
  ) {}
  ngOnInit(): void {
    this.getRole();
    const programs = this.loginService.getProgram();
    this.idPrograms = Array.isArray(programs) ? programs : [];
    this.idPrograms.forEach((element) => {
      this.programsService.getProgram(element).subscribe((response) => {
        const { data } = response;
        this.listPrograms.push(data);
      });
    });
  }
  getRole() {
    this.role = this.loginService.getRole();
    // this.role = Role.ESTUDIANTE_NO_FORMAL;
  }

  redirectType(idProgram: number, idType: number) {
    if (
      idType === this.componenteCurricularType.FORMATIVO ||
      idType === this.componenteCurricularType.CURRICULUM
    ) {
      this.router.navigate([
        `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.TRAINING}/${idProgram}/type/${idType}`,
      ]);
    } else {
      this.router.navigate([
        `${RoutesApp.MY_ACADEMIC_PROGRAM}/${RoutesApp.SUMMARY}/${idProgram}/type/${idType}`,
      ]);
    }
  }

  downloadDocument(document: string) {
    window.open(document, '#blanck');
  }
}
