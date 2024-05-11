/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { SettingEnum } from 'src/enums/setting.enum';
import { LoadDocumentsModal } from 'src/models/load-documents-modal.interface';

@Component({
  selector: 'app-load-document-with-comment',
  templateUrl: './load-document-with-comment.component.html',
  styleUrls: ['./load-document-with-comment.component.scss'],
})
export class LoadDocumentWithCommentComponent implements OnInit {
  @Input() visible = false;
  @Input() config?: LoadDocumentsModal;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() returnData = new EventEmitter<LoadDocumentsModal>();
  documentBase64?: string;
  fileName = '';
  html = '';
  allowedExtension = '';
  allowedFileSize = 0;

  constructor(
    private messageService: MessageService,
    private utilsService: UtilsService,
    private configService: ConfigService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.visible = this.config?.visible ?? false;
    this.getAllowedExtension();
  }
  close() {
    this.closeModal.emit(false);
  }

  createHtml($event: string) {
    this.html = $event;
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  reponseData() {
    if (!this.config) return;
    const data: LoadDocumentsModal = this.config;
    data.html = this.html;
    data.fileName = this.fileName;
    data.file = {
      fileContent: this.utilsService.getBase64File(this.documentBase64 ?? ''),
      fileExtension: this.utilsService.getBase64FileExtension(this.documentBase64 ?? ''),
    };
    this.returnData.emit(data);
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
        const maxSize = this.allowedFileSize * 1024 * 1024;
        if (fileSize > maxSize) {
          this.messageService.add({
            severity: 'error',
            summary: `Archivo supera el limite de ${this.allowedFileSize}MB`,
            detail: 'Inténtalo nuevamente',
          });
          event.target.value = '';
        } else {
          this.fileName = file.name;
          this.convertToBase64(file);
        }
      }
    }
  }
}
