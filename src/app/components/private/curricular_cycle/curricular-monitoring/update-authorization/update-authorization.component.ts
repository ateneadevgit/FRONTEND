/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';

@Component({
  selector: 'app-update-authorization',
  templateUrl: './update-authorization.component.html',
  styleUrls: ['./update-authorization.component.scss'],
})
export class UpdateAuthorizationComponent implements OnInit {
  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  programHistorical?: ProgramHistorical[];
  routerApp = RoutesApp;

  constructor(
    private activatedRoute: ActivatedRoute,
    private programsService: ProgramsService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') ? Number(params.get('id')) : 0;
      this.idModule = params.get('idmodule') ? Number(params.get('idmodule')) : 0;
    });
    this.loadProgramModule();
    this.loadProgramHistorical();
    this.loadSelectedProgram();
  }

  loadSelectedProgram() {
    this.programsService.getProgram(this.idProgram ?? 0).subscribe((response) => {
      const { data } = response;
      this.selectedProgram = data;
    });
  }

  loadProgramModule() {
    this.programsService.getProgramModule(false).subscribe((response) => {
      const { data } = response;
      if (data.length === 0) {
        this.alertService.showInfoMessage({ message: 'No se encontraron modulos asociados' });
        return;
      }
      this.selectedModule = data.find((item) => item.moduleId == this.idModule);
    });
  }

  loadProgramHistorical() {
    this.programsService
      .getProgramHistoricalSpecific(this.idProgram ?? 0, this.idModule ?? 0)
      .subscribe((response) => {
        const { data } = response;
        this.programHistorical = data;
        if (this.programHistorical.length === 0) {
          this.alertService.showInfoMessage({ message: 'No se encontraron resultados' });
          return;
        }
      });
  }
}
