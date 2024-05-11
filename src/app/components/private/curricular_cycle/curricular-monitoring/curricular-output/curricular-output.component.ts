/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { ProgramModuleTypes } from 'src/enums/module-type';
import { RoutesApp } from 'src/enums/routes.enum';
import { CurriculumItem } from 'src/models/curriculum-item.interface';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';
import coresubcore from 'src/assets/data/core-subcore.json';

@Component({
  selector: 'app-curricular-output',
  templateUrl: './curricular-output.component.html',
  styleUrls: ['./curricular-output.component.scss'],
})
export class CurricularOutputComponent implements OnInit {
  nucleoList: CurriculumItem[] = [];
  subnucleoList: CurriculumItem[] = [];

  selectNucleo?: CurriculumItem;
  selectSubnucleo?: CurriculumItem;

  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  programHistorical?: ProgramHistorical[];

  routerApp = RoutesApp;
  ModuleTypes = ProgramModuleTypes;
  coreSubCoreLit = coresubcore;
  coreSubCoreSelect?: any;

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private programsService: ProgramsService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') ? Number(params.get('id')) : 0;
      this.idModule = params.get('idmodule') ? Number(params.get('idmodule')) : 0;
    });

    this.loadNucleoList();
    this.loadProgramModule();
    this.loadSelectedProgram();
  }

  loadNucleoList() {
    this.workflowService.getCurriculumByType(this.idProgram?.toString() || '', '53').subscribe({
      next: (response) => {
        const { data } = response;
        if (data.length > 0) {
          this.nucleoList = data;
        }
      },
    });
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

  loadSubNucleo() {
    this.programHistorical = undefined;
    if (this.selectNucleo) {
      this.workflowService
        .getCurriculumByFather(
          this.idProgram?.toString() || '',
          this.selectNucleo.curriculumId.toString(),
        )
        .subscribe({
          next: (response) => {
            const { data } = response;
            this.subnucleoList = data;
          },
        });
    }
  }

  loadCoreSubCoreHistorical() {
    this.programHistorical = undefined;
    if (this.selectSubnucleo) {
      this.programsService
        .getProgramHistoryByModuleAndType(
          this.idProgram ?? 0,
          this.idModule ?? 0,
          Number(this.selectSubnucleo.curriculumId),
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
