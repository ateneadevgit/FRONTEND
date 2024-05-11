/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CurricularComponent } from 'src/enums/curriculum-sumary.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';

@Component({
  selector: 'app-currucular-component',
  templateUrl: './currucular-component.component.html',
  styleUrls: ['./currucular-component.component.scss'],
})
export class CurrucularComponentComponent implements OnInit {
  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  programHistorical?: ProgramHistorical[];
  routerApp = RoutesApp;
  curricularComponent = CurricularComponent;

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
    this.loadProgramHistory(this.curricularComponent.EPISTEMOLOGICAL);
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
        this.alertService.showInfoMessage({ message: 'No se encontraron módulos asociados' });
        return;
      }
      this.selectedModule = data.find((item) => item.moduleId == this.idModule);
    });
  }

  loadProgramHistory(type: any) {
    this.programHistorical = undefined;
    if (type) {
      this.programsService
        .getProgramHistoryByModuleAndType(this.idProgram ?? 0, this.idModule ?? 0, Number(type))
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

  onTabChange(event: any) {
    const index = event.index;
    switch (index) {
      case 0:
        this.loadProgramHistory(this.curricularComponent.EPISTEMOLOGICAL);
        break;
      case 1:
        this.loadProgramHistory(this.curricularComponent.PADAGOGICAL);
        break;
      case 2:
        this.loadProgramHistory(this.curricularComponent.FORMATIVO);
        break;
      case 3:
        this.loadProgramHistory(this.curricularComponent.INTERACTION);
        break;
      case 4:
        this.loadProgramHistory(this.curricularComponent.ASSESSMENT);
        break;
    }
  }
}
