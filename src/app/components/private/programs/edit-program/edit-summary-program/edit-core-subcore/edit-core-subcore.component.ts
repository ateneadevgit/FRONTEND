/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramModuleTypes } from 'src/enums/module-type';
import {
  CurriculumCore,
  CurriculumItem,
  CurriculumSaveJson,
  CurriculumSubject,
} from 'src/models/curriculum-item.interface';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';
import coresubcore from 'src/assets/data/core-subcore.json';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-core-subcore',
  templateUrl: './edit-core-subcore.component.html',
  styleUrls: ['./edit-core-subcore.component.scss'],
})
export class EditCoreSubcoreComponent implements OnInit {
  @Input() objCoreAndSubnucleo: CurriculumSaveJson[] = [];
  @Output() updateObject = new EventEmitter<any>();

  nucleoList: CurriculumItem[] = [];
  subnucleoList: CurriculumItem[] = [];

  selectNucleo?: CurriculumItem;
  selectSubnucleo?: CurriculumItem;

  objNucleoActivo?: CurriculumCore;
  objSubnucleoActivo?: CurriculumSubject;

  idProgram?: number;
  idModule?: number;
  selectedProgram: any;
  selectedModule?: ProgramModule;
  programHistorical?: ProgramHistorical[];

  ModuleTypes = ProgramModuleTypes;
  coreSubCoreLit = coresubcore;
  coreSubCoreSelect?: any;

  formCore!: FormGroup;

  formCreateComponent: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    creditNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    participation: new FormControl({ value: '', disabled: true }),
    code: new FormControl(''),
    hourSelfWork: new FormControl(''),
    hoursInteractionTeacher: new FormControl(''),
  });

  get f() {
    return this.formCreateComponent?.controls;
  }

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private programsService: ProgramsService,
    private alertService: AlertService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.formCore = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      raeg: ['', Validators.required],
      creditNumber: [{ value: '', disabled: true }, Validators.required],
      participation: [{ value: '', disabled: true }],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProgram = params.get('id') ? Number(params.get('id')) : 0;
      this.idModule = params.get('idmodule') ? Number(params.get('idmodule')) : 0;
    });

    this.loadNucleoList();
    this.loadProgramModule();
    this.loadSelectedProgram();
  }

  loadOptCoreSubCore() {
    this.programHistorical = undefined;
    this.selectNucleo = undefined;
    this.selectSubnucleo = undefined;
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
        this.alertService.showInfoMessage({ message: 'No se encontraron módulos asociados' });
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

  loadCoreHistorical() {
    this.programHistorical = undefined;
    if (this.selectNucleo) {
      this.programsService
        .getProgramHistoryByModuleAndType(
          this.idProgram ?? 0,
          this.idModule ?? 0,
          Number(this.selectNucleo.curriculumId),
        )
        .subscribe((response) => {
          const { data } = response;
          this.programHistorical = data;
          this.objNucleoActivo = JSON.parse(this.programHistorical[0].value);
          const findObj = this.objCoreAndSubnucleo.find(
            (obj) => obj.curriculumId === this.objSubnucleoActivo?.curriculumId,
          );
          if (findObj) {
            this.objNucleoActivo = findObj;
          }
          if (this.objNucleoActivo) {
            this.formCore.patchValue(this.objNucleoActivo);
          }
          if (this.programHistorical.length === 0) {
            this.alertService.showInfoMessage({ message: 'No se encontraron resultados' });
            return;
          }
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
          this.objSubnucleoActivo = JSON.parse(this.programHistorical[0].value);
          const findObj = this.objCoreAndSubnucleo.find(
            (obj) => obj.curriculumId === this.objSubnucleoActivo?.curriculumId,
          );
          if (findObj) {
            this.objSubnucleoActivo = findObj;
          }
          if (this.objSubnucleoActivo) {
            this.formCreateComponent.patchValue(this.objSubnucleoActivo);
          }
          if (this.programHistorical.length === 0) {
            this.alertService.showInfoMessage({ message: 'No se encontraron resultados' });
            return;
          }
        });
    }
  }

  dataSave() {
    if (this.objNucleoActivo && this.coreSubCoreSelect?.id === 1) {
      this.objNucleoActivo.creditNumber = Number(this.formCore.controls['creditNumber'].value);
      this.objNucleoActivo.participation = Number(this.formCore.controls['participation'].value);
      this.objNucleoActivo.description = this.formCore.controls['description'].value;
      this.objNucleoActivo.raeg = this.formCore.controls['raeg'].value;
      if (this.objNucleoActivo) {
        const temp: CurriculumSaveJson = {
          ...this.objNucleoActivo,
          code: null,
          hourSelfWork: null,
          hoursInteractionTeacher: null,
        };
        if (
          this.objCoreAndSubnucleo.find(
            (obj) => obj.curriculumId === this.objNucleoActivo?.curriculumId,
          )
        ) {
          this.objCoreAndSubnucleo = this.objCoreAndSubnucleo.map((objeto) =>
            objeto.curriculumId === temp?.curriculumId ? temp : objeto,
          );
        } else {
          this.objCoreAndSubnucleo.push(temp);
        }
      }
    }
    if (this.objSubnucleoActivo && this.coreSubCoreSelect?.id === 2) {
      this.objSubnucleoActivo.code = this.formCreateComponent.controls['code'].toString();
      this.objSubnucleoActivo.creditNumber = Number(
        this.formCreateComponent.controls['creditNumber'].value,
      );
      this.objSubnucleoActivo.description = this.formCreateComponent.controls['description'].value;
      this.objSubnucleoActivo.hourSelfWork = Number(
        this.formCreateComponent.controls['hourSelfWork'].value,
      );
      this.objSubnucleoActivo.hoursInteractionTeacher = Number(
        this.formCreateComponent.controls['hoursInteractionTeacher'].value,
      );
      this.objSubnucleoActivo.participation = Number(
        this.formCreateComponent.controls['participation'].value,
      );
      if (this.objSubnucleoActivo) {
        const temp: CurriculumSaveJson = { ...this.objSubnucleoActivo, raeg: null };
        if (
          this.objCoreAndSubnucleo.find(
            (obj) => obj.curriculumId === this.objSubnucleoActivo?.curriculumId,
          )
        ) {
          this.objCoreAndSubnucleo = this.objCoreAndSubnucleo.map((objeto) =>
            objeto.curriculumId === temp?.curriculumId ? temp : objeto,
          );
        } else {
          this.objCoreAndSubnucleo.push(temp);
        }
      }
    }
    this.alertService.showInfoMessage({
      message: 'Objeto guardado temporalmente, para finalizar dar click al botón guardar amarillo',
    });
    this.updateObject.emit(this.objCoreAndSubnucleo);
  }
}
