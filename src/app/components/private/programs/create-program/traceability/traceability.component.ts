/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { ApproveTraza } from 'src/models/sumary.intefaces';
import { TrceabilityWorkflow } from 'src/models/traceability.interface';

@Component({
  selector: 'app-traceability',
  templateUrl: './traceability.component.html',
  styleUrls: ['./traceability.component.scss'],
})
export class TraceabilityComponent implements OnInit {
  @Input() idProgram?: string;
  campus: CatalogsByIdResponse[] = [];
  role = 0;
  newItem = true;
  formTraceability = this.fb.group({
    academicCouncilMinute: new FormControl('', []),
    academicCouncilMinuteDate: new FormControl('', []),
    campus: this.fb.array([]),
    menEndDate: new FormControl('', []), //ok
    nsacesDate: new FormControl('', []), //ok
    proposalAprovedDate: new FormControl('', []), //ok
    sinies: new FormControl('', []), //ok
    superiorCouncilMinute: new FormControl('', []),
    superiorCouncilMinuteDate: new FormControl('', []),
    viceAcademicMinute: new FormControl('', []), //ok
    viceAcademicMinuteDate: new FormControl('', []), //ok
  });
  edit = false;
  nameProgram = '';
  visible = false;
  documentBase64?: string;
  fileName = '';
  allowedExtension = '';
  allowedFileSize = 0;

  constructor(
    private workflowService: WorkflowService,
    private catalogsService: CatalogsService,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private messageService: MessageService,
    private router: Router,
    private loginService: LoginService,
    private configService: ConfigService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.loadCampus();
    this.getProgramName();
    this.getAllowedExtension();
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  getProgramName() {
    this.workflowService.getProgramName(this.idProgram ?? '').subscribe({
      next: (response) => {
        const { data } = response;
        this.nameProgram = data?.name;
      },
    });
  }

  getTraceability() {
    this.workflowService.getTraceability(this.idProgram ?? '').subscribe({
      next: (response) => {
        const { data } = response;
        this.setValuesInform(data);
      },
    });
  }

  setValuesInform(data: TrceabilityWorkflow) {
    if (!data?.academicCouncilMinute?.minute) {
      this.getCampusByProgram();
      return;
    }

    this.formTraceability.controls['academicCouncilMinute'].setValue(
      data.academicCouncilMinute.minute,
    );
    this.formTraceability
      .get('academicCouncilMinuteDate')
      ?.setValue(
        this.utilsService.trasnformDateMonthDatYear(data.academicCouncilMinute.minuteDate),
      );
    this.formTraceability.controls['menEndDate'].setValue(
      this.utilsService.trasnformDateMonthDatYear(data.menEndDate),
    );
    this.formTraceability.controls['nsacesDate'].setValue(
      this.utilsService.trasnformDateMonthDatYear(data.nsacesDate),
    );
    this.formTraceability.controls['proposalAprovedDate'].setValue(
      this.utilsService.trasnformDateMonthDatYear(data.proposalAprovedDate),
    );
    this.formTraceability.controls['sinies'].setValue(data.sinies);
    this.formTraceability.controls['sinies'].setValue(data.sinies);

    this.formTraceability.controls['superiorCouncilMinute'].setValue(
      data.superiorCouncilMinute.minute,
    );
    this.formTraceability
      .get('superiorCouncilMinuteDate')
      ?.setValue(
        this.utilsService.trasnformDateMonthDatYear(data.superiorCouncilMinute.minuteDate),
      );

    this.formTraceability.controls['viceAcademicMinute'].setValue(data.viceAcademicMinute.minute);
    this.formTraceability
      .get('viceAcademicMinuteDate')
      ?.setValue(this.utilsService.trasnformDateMonthDatYear(data.viceAcademicMinute.minuteDate));

    data.campus.forEach((item) => {
      const campusData = this.campus.find((campus) => campus.catalogItemId === item.campusId);
      this.addItem(campusData, item);
    });
    this.edit = true;
  }

  get items() {
    return this.formTraceability.get('campus') as FormArray;
  }

  addItem(data: any, value: any = {}) {
    if (!this.newItem) return;
    const item = this.fb.group({
      label: data.catalogItemName,
      ckeck: [value?.resolution ? true : false],
      campusId: [data.catalogItemId],
      resolution: [value?.resolution ?? '', Validators.required],
      resolutionDate: [
        value?.resolutionDate
          ? this.utilsService.trasnformDateMonthDatYear(value?.resolutionDate)
          : '',
        Validators.required,
      ],
    });
    this.items.push(item);
  }

  getCampusByProgram() {
    if (!this.idProgram) return;
    this.workflowService.getCampus(this.idProgram).subscribe((response) => {
      const { data } = response;
      data.forEach((item) => {
        const campusData = this.campus.find((campus) => campus.catalogItemId === item);
        this.addItem(campusData);
      });
    });
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
      this.getTraceability();
      //this.getCampusByProgram();
    });
  }

  send() {
    if (!this.documentBase64) {
      this.messageService.add({
        severity: 'error',
        summary: 'Documento es obligatorio',
        detail: 'Inténtalo nuevamente',
      });
      return;
    }
    this.formTraceability.markAllAsTouched();
    if (!this.formTraceability.valid) return;

    const payload = this.payload();

    if (this.edit && payload) {
      this.workflowService.updateTraceability(payload, this.idProgram ?? '').subscribe({
        next: () => {
          this.getTraceability();
          this.newItem = false;
        },
      });
    } else {
      this.workflowService.traceability(payload, this.idProgram ?? '').subscribe({
        next: () => {
          this.getTraceability();
          this.newItem = false;
        },
      });
    }
  }

  payload() {
    const valuerForm = this.formTraceability.value;

    const campus: any[] = valuerForm.campus ?? [];
    const setCampus: any = [];
    campus?.forEach((item) => {
      if (item.ckeck) {
        const campusItem = {
          campusId: item.campusId,
          resolution: item.resolution,
          resolutionDate: this.edit
            ? this.utilsService.transformDateyyyymmddhh(item.resolutionDate ?? '')
            : item.resolutionDate,
        };
        setCampus.push(campusItem);
      }
    });

    const payload: TrceabilityWorkflow = {
      academicCouncilMinute: {
        minute: valuerForm.academicCouncilMinute ?? '',
        minuteDate: this.edit
          ? this.utilsService.transformDateyyyymmddhh(valuerForm.academicCouncilMinuteDate ?? '')
          : valuerForm.academicCouncilMinuteDate ?? '',
      },
      campus: setCampus,
      createdBy: '',
      menEndDate: this.edit
        ? this.utilsService.transformDateyyyymmddhh(valuerForm.menEndDate ?? '')
        : valuerForm.menEndDate ?? '',
      nsacesDate: this.edit
        ? this.utilsService.transformDateyyyymmddhh(valuerForm.nsacesDate ?? '')
        : valuerForm.nsacesDate ?? '',
      proposalAprovedDate: this.edit
        ? this.utilsService.transformDateyyyymmddhh(valuerForm.proposalAprovedDate ?? '')
        : valuerForm.proposalAprovedDate ?? '',
      roleId: null,
      sinies: valuerForm.sinies ?? '',
      superiorCouncilMinute: {
        minute: valuerForm.superiorCouncilMinute ?? '',
        minuteDate: this.edit
          ? this.utilsService.transformDateyyyymmddhh(valuerForm.superiorCouncilMinuteDate ?? '')
          : valuerForm.superiorCouncilMinuteDate ?? '',
      },
      viceAcademicMinute: {
        minute: valuerForm.viceAcademicMinute ?? '',
        minuteDate: this.edit
          ? this.utilsService.transformDateyyyymmddhh(valuerForm.viceAcademicMinuteDate ?? '')
          : valuerForm.viceAcademicMinuteDate ?? '',
      },
      approvedMinute: {
        fileContent: this.documentBase64 ? this.documentBase64 : '',
        fileExtension: this.utilsService.getBase64FileExtension(this.documentBase64 ?? ''),
      },
    };

    return payload;
  }

  loadFile(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (!this.allowedExtension.includes(fileExtension)) {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: `La extensión del archivo no está permitida. Actualmente solo se permiten archivos con las siguientes extensiones: ${this.allowedExtension}`,
        });
      } else {
        const fileSize = file.size;
        this.fileName = file.name;
        const maxSize = this.allowedFileSize * 1024 * 1024;
        if (fileSize > maxSize) {
          this.messageService.add({
            severity: 'error',
            summary: `Archivo supera el limite de ${this.allowedFileSize}MB`,
            detail: 'Inténtalo nuevamente',
          });
          event.target.value = '';
        } else {
          this.convertToBase64(file);
        }
      }
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      const base64String = (<FileReader>event.target).result;
      if (base64String) {
        this.documentBase64 = String(base64String);
      }
    };
    reader.readAsDataURL(file);
  }

  approve(status: string) {
    /*  if (!this.documentBase64) {
      this.messageService.add({
        severity: 'error',
        summary: 'Debe adjuntar el acta',
        detail: 'Inténtalo nuevamente',
      });
      return;
    }
*/
    const payload: ApproveTraza = {
      createdBy: null,
      feedbackStatus: status,
      fileFeedback: null,
      roleId: null,
    };
    this.workflowService.approveTraza(payload, this.idProgram ?? '').subscribe({
      next: () => {
        this.router.navigate([RoutesApp.PROGRAMS]);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hubo un error',
          detail: 'Inténtalo nuevamente',
        });
      },
    });
  }
}
