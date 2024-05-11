/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DocumentService } from 'src/app/services/admin/document/document.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { GuidelineTypeDoc } from 'src/enums/doc-guideline-type.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { IDocGuideline, IDocGuidelineRequest } from 'src/models/admin/guideline-doc.interface';
import { FileContent } from 'src/models/porpouse.interface';

@Component({
  selector: 'app-doc-instruments',
  templateUrl: './doc-instruments.component.html',
  styleUrls: ['./doc-instruments.component.scss'],
})
export class DocInstrumentsComponent implements OnInit {
  guidelineList: IDocGuideline[] = [];
  createGuideKey = false;
  fileName = '';
  allowedExtension = '';
  allowedFileSize = 0;
  fileSize = 0;
  fileExtension = '';
  documentBase64: string | null = null;
  search = '';
  hasSearch = false;
  documentId = 0;
  hasUpdateFile = false;

  constructor(
    private documentService: DocumentService,
    private fb: FormBuilder,
    private configService: ConfigService,
    private messageService: MessageService,
    private alertService: AlertService,
    private utilsService: UtilsService,
  ) {}

  formDocument = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    order: new FormControl(0, [Validators.required, Validators.maxLength(255)]),
  });

  get formControls() {
    return this.formDocument.controls;
  }

  ngOnInit(): void {
    this.getGuidelines();
  }

  getGuidelines() {
    this.documentService.getDocuments(GuidelineTypeDoc.INSTRUMENT).subscribe((response) => {
      this.guidelineList = response.data;
    });
  }

  openCreate(item: IDocGuideline) {
    this.getAllowedExtension();
    this.formDocument.controls.name.setValue(item.name);
    this.documentId = item.programAttachmentId;
    this.createGuideKey = true;
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
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
        this.hasUpdateFile = true;
        const fileSize = file.size;
        const maxSize = this.allowedFileSize * 1024 * 1024;
        this.fileName = file.name;

        const fileSizeMB = fileSize / (1024 * 1024);
        this.fileSize = fileSizeMB;
        this.fileExtension = fileExtension;
        if (fileSizeMB > maxSize) {
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

  createGuideline() {
    if (
      this.formDocument.get('fileName')?.invalid ||
      (!this.documentBase64 && this.hasUpdateFile)
    ) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const fileModel: FileContent = {
        fileContent: this.utilsService.getBase64File(this.documentBase64 ?? '') ?? '',
        fileExtension: this.fileExtension,
      };

      const newDocument: IDocGuidelineRequest = {
        file: fileModel,
        fatherId: null,
        fileName: this.formControls['name'].value || '',
        fileOrder: Number(this.formControls['order'].value) || null,
        fileType: GuidelineTypeDoc.INSTRUMENT,
      };

      this.documentService.updateDocumento(this.documentId, newDocument).subscribe({
        next: () => {
          this.cleanForm();
          this.alertService.showSuccessMessage({
            message: 'Acción realizada con éxito',
          });
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }

  cleanForm() {
    this.formDocument.controls.name.setValue('');
    this.formDocument.controls.order.setValue(0);
    this.createGuideKey = false;
    this.fileName = '';
    this.allowedExtension = '';
    this.fileSize = 0;
    this.fileExtension = '';
    this.documentBase64 = null;
    this.documentId = 0;
    this.hasUpdateFile = false;
    this.getGuidelines();
  }

  deleteGuideline(item: IDocGuideline) {
    this.documentService.deleteGuideline(item.programAttachmentId).subscribe({
      next: () => {
        this.getGuidelines();
        this.alertService.showSuccessMessage({
          message: 'Acción realizada con éxito',
        });
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  disableEnableDocument(item: IDocGuideline) {
    const enabled = !item.enabled ? false : true;
    this.documentService.disableEnableGuideline(item.programAttachmentId, enabled).subscribe({});
  }

  downloadDocument(urlFile: string) {
    window.open(urlFile, '#blanck');
  }

  filterTable() {
    this.hasSearch = true;
    this.guidelineList = this.guidelineList.filter((guide) =>
      guide.name
        .replace(/[^\w\s]/gi, '')
        .toLowerCase()
        .includes(this.search.replace(/[^\w\s]/gi, '').toLowerCase()),
    );
  }

  cleanSearch() {
    this.hasSearch = false;
    this.search = '';
    this.getGuidelines();
  }
}
