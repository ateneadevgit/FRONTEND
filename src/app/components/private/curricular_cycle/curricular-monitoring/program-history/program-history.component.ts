/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramModuleTypes } from 'src/enums/module-type';
import { PreviewDocument } from 'src/models/preview-document.interface';
import { ProgramHistorical, ProgramModule } from 'src/models/program.interface';

@Component({
  selector: 'app-program-history',
  templateUrl: './program-history.component.html',
  styleUrls: ['./program-history.component.scss'],
})
export class ProgramHistoryComponent {
  @Input() programHistorical?: ProgramHistorical[] = [];
  @Input() selectedModule?: ProgramModule;
  @Input() selectCoreSubCore?: number;

  @Output() emitInfo = new EventEmitter<string>();

  radius = 120;
  visibleHistoryModal = false;
  programHistoricalSelect: ProgramHistorical | null = null;
  selectValue?: any;
  ModuleTypes = ProgramModuleTypes;
  documentUrl?: string = '';

  visible = false;
  previewDocument?: PreviewDocument;

  constructor(
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
    private utilService: UtilsService,
  ) {}

  openHistoryDetail(history: ProgramHistorical) {
    if (this.selectedModule?.type === ProgramModuleTypes.STUDY_PLAN) {
      this.emitInfo.emit(history.value);
    } else {
      this.visibleHistoryModal = true;
      this.programHistoricalSelect = history;
      try {
        this.selectValue = history.value ? JSON.parse(history.value) : {};
      } catch (error) {
        this.selectValue = history.value;
      }
      const sanitizerUrl: any = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.programHistoricalSelect?.url}`,
      );
      this.documentUrl = sanitizerUrl.changingThisBreaksApplicationSecurity;
    }
  }

  closeHistoryDetail() {
    this.visibleHistoryModal = false;
    this.programHistoricalSelect = null;
    this.selectValue = undefined;
  }

  viewDocument(history: ProgramHistorical) {
    let urlFile = history.minute;
    if (this.selectedModule?.type === this.ModuleTypes.SYLLABUS) {
      urlFile = history.value;
    }

    if (this.selectedModule?.type === this.ModuleTypes.UPDATE_AUTHORIZATIONS) {
      const jsonValue = this.getJSON(history.value);
      urlFile = jsonValue?.minuteResponse;
    }

    if (!urlFile || urlFile == '') {
      this.alertService.showWarnMessage({ message: 'No hay documento adjunto' });
      return;
    }

    this.previewDocument = {
      url: urlFile,
      type: this.utilService.getFileExtension(urlFile),
    };
    this.visible = true;
  }

  closeModal($event: boolean) {
    this.visible = $event;
  }

  downloadDocument(history: ProgramHistorical) {
    let urlFile = history.minute;
    if (this.selectedModule?.type === this.ModuleTypes.SYLLABUS) {
      urlFile = history.value;
    }

    if (this.selectedModule?.type === this.ModuleTypes.UPDATE_AUTHORIZATIONS) {
      const jsonValue = this.getJSON(history.value);
      urlFile = jsonValue?.minuteResponse;
    }

    if (!urlFile || urlFile == '') {
      this.alertService.showWarnMessage({ message: 'No hay documento adjunto' });
      return;
    }

    window.open(urlFile, 'blank');
  }

  getJSON(value: string) {
    let data: any = {};
    try {
      data = value ? JSON.parse(value) : {};
    } catch (error) {
      data = {};
      data.urlFile = value;
    }
    return data;
  }
}
