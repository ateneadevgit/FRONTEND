/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { CurriculumItem } from 'src/models/curriculum-item.interface';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';

@Component({
  selector: 'app-problem-banck',
  templateUrl: './problem-banck.component.html',
  styleUrls: ['./problem-banck.component.scss'],
})
export class ProblemBanckComponent implements OnInit {
  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  problemBankList?: any[];
  programHistorical?: ProgramHistorical[];
  routerApp = RoutesApp;

  semeterList: CurriculumItem[] = [];
  selectSemester?: CurriculumItem;

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
    this.loadSelectedProgram();
    this.loadProgramHistorica();
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
        return;
      }
      this.selectedModule = data.find((item) => item.moduleId == this.idModule);
    });
  }

  loadProgramBySemester() {
    this.programHistorical = undefined;
    this.problemBankList = undefined;

    this.programsService
      .getProgramHistoryByModuleAndType(this.idProgram ?? 0, this.idModule ?? 0, Number(1))
      .subscribe((response) => {
        const { data } = response;
        this.problemBankList = data;
        if (this.problemBankList.length === 0) {
          this.alertService.showInfoMessage({ message: 'No se encontraron resultados' });
          return;
        }
      });
  }

  loadProgramHistorica() {
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

  loadProgramHistorical(item: any) {
    this.programHistorical = undefined;
    if (item) {
      this.programsService
        .getProgramHistoryByModuleAndType(this.idProgram ?? 0, this.idModule ?? 0, Number(item))
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
}
