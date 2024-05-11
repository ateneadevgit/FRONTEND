/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';

@Component({
  selector: 'app-academic-credit',
  templateUrl: './academic-credit.component.html',
  styleUrls: ['./academic-credit.component.scss'],
})
export class AcademicCreditComponent implements OnInit {
  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  programHistorical?: ProgramHistorical[];
  routerApp = RoutesApp;
  asignatureCoreSubCoreList: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private programsService: ProgramsService,
    private workflowService: WorkflowService,
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') ? Number(params.get('id')) : 0;
      this.idModule = params.get('idmodule') ? Number(params.get('idmodule')) : 0;
    });

    await this.loadProgramModule();
    await this.loadSelectedProgram();

    setTimeout(() => {
      this.getSubjects();
    }, 2500);
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

  getSubjects() {
    this.asignatureCoreSubCoreList = [];
    this.workflowService.getSubjects(this.idProgram?.toString() ?? '').subscribe((response) => {
      const { data } = response;
      this.asignatureCoreSubCoreList = data;
    });
  }

  getValueEvent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return filterValue;
  }

  getProgramHistoryByModuleAndType(item: any) {
    this.programHistorical = undefined;
    if (item) {
      this.programsService
        .getProgramHistoryByModuleAndType(
          this.idProgram ?? 0,
          this.idModule ?? 0,
          Number(item.subjectId),
        )
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
