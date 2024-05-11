/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { AttachmentType } from 'src/enums/attachment-type.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { PreviewDocument } from 'src/models/preview-document.interface';
import { IAttachmentCreate, IAttachmentMinutes } from 'src/models/program.interface';
import { Column } from 'src/models/tables.interface';

@Component({
  selector: 'app-committes',
  templateUrl: './committes.component.html',
  styleUrls: ['./committes.component.scss'],
})
export class CommittesComponent implements OnInit {
  attachmentTypes = AttachmentType;
  fileName = '';
  documentBase64?: string;
  typeCommitte?: number;

  allowedExtension = '';
  allowedFileSize = 0;

  visibleLoadCommite = false;
  visibleViewCommite = false;
  previewDocument?: PreviewDocument;

  selectCommite?: any;
  committeList: any[] = [];

  fileNameFilter: string | null = null;
  fileDateFilter: string | null = null;

  files!: TreeNode[];
  cols!: Column[];

  constructor(
    private programsService: ProgramsService,
    private alertService: AlertService,
    private utilsService: UtilsService,
    private configService: ConfigService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.loadMinutes();
    this.getAllowedExtension();
  }

  getCols() {
    return [
      { field: 'name', header: 'Acta' },
      { field: 'createdAt', header: 'Fecha' },
    ];
  }

  loadMinutes() {
    const pyload: IAttachmentMinutes = {
      fileDate: this.fileDateFilter != null ? new Date(this.fileDateFilter) : null,
      fileName: this.fileNameFilter,
    };

    this.programsService.getAttachmentminute(pyload).subscribe({
      next: (response) => {
        this.committeList = response.filter(
          (item) => item.fileType === this.attachmentTypes.MINUTES,
        );
        this.cols = this.getCols();
        this.files = this.getFileSystemNodesData();
        if (this.committeList.length == 0) {
          this.alertService.showInfoMessage({ message: 'No se encontraron actas de comite' });
        }
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Error al obtener actas de comite:', error);
      },
    });
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
        const fileSize = file.size;
        this.fileName = file.name;
        const maxSize = this.allowedFileSize * 1024 * 1024;
        if (fileSize > maxSize) {
          this.alertService.showErrorMessage({
            message: `Archivo supera el limite de ${this.allowedFileSize}MB`,
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

  sendUploadMinutes() {
    if (!this.documentBase64) {
      this.alertService.showWarnMessage({ message: 'Acta es obligatorio' });
      return;
    }
    const payload: IAttachmentCreate = {
      createdBy: null,
      fatherId: this.selectCommite?.programAttachmentId,
      file: {
        fileContent: this.utilsService.getBase64File(this.documentBase64 ?? ''),
        fileExtension: this.utilsService.getBase64FileExtension(this.documentBase64 ?? ''),
      },
      fileName: this.fileName,
      fileOrder: null,
      fileType: this.typeCommitte ?? 0,
    };
    this.programsService.createAttachmentminute(payload).subscribe({
      next: () => {
        // Manejar la respuesta exitosa aquí
        this.alertService.showInfoMessage({ message: 'Acción realizada con exito' });
        this.closeLoadCommite();
        this.loadMinutes();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Error al cargar acta:', error);
      },
      complete: () => {
        // Manejar la lógica completa aquí si es necesario
        console.log('La operación ha sido completada.');
      },
    });
  }

  closeLoadCommite() {
    this.visibleLoadCommite = false;
    this.selectCommite = undefined;
    this.typeCommitte = undefined;
    this.fileName = '';
    this.documentBase64 = undefined;
  }

  openLoadCommite(type?: number, item?: any) {
    this.typeCommitte = type;
    this.selectCommite = item;
    this.visibleLoadCommite = true;
  }

  viewDocument(document: any) {
    this.previewDocument = {
      url: document?.fileUrl,
      type: this.utilsService.getFileExtension(document?.fileUrl),
    };
    this.visibleViewCommite = true;
  }

  downloadDocument(document: any) {
    this.visibleViewCommite = true;
    window.open(document.fileUrl, '#blanck');
  }

  closeModal($event: boolean) {
    this.visibleViewCommite = $event;
    this.previewDocument = undefined;
  }

  onTabChange(event: any) {
    const index = event.index;
    switch (index) {
      case 0:
        this.openLoadCommite(this.attachmentTypes.PRESENTATION, this.selectCommite);
        break;
      case 1:
        this.openLoadCommite(this.attachmentTypes.EXHIBIT, this.selectCommite);
        break;
    }
  }

  getFileSystemNodesData() {
    const currentStep = this.committeList;
    const column: TreeNode[] = [];
    currentStep?.forEach((element) => {
      const fecha = new Date(element.createdAt);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Nota: los meses comienzan desde 0
      const año = fecha.getFullYear();

      const fechaFormateada = `${dia}-${mes}-${año}`;
      element.createdAt = fechaFormateada;

      const attach: any = {
        name: 'Anexos',
        createdAt: '',
        fileType: 0,
      };

      const presentation: any = {
        name: 'Presentaciones',
        createdAt: '',
        fileType: 0,
      };

      const childrenAttach: TreeNode[] = [];
      const childrenPresentation: TreeNode[] = [];

      if (element.attachChilds.length > 0) {
        element.attachChilds.forEach((item: any) => {
          const fechaChild = new Date(item.createdAt);
          const dia = fechaChild.getDate().toString().padStart(2, '0');
          const mes = (fechaChild.getMonth() + 1).toString().padStart(2, '0'); // Nota: los meses comienzan desde 0
          const año = fechaChild.getFullYear();

          const fechaFormateada = `${dia}-${mes}-${año}`;
          item.createdAt = fechaFormateada;

          const child = {
            data: item,
          };
          childrenAttach.push(child);
        });
      }
      if (element.presentationChilds.length > 0) {
        element.presentationChilds.forEach((item: any) => {
          const fechaChild = new Date(item.createdAt);
          const dia = fechaChild.getDate().toString().padStart(2, '0');
          const mes = (fechaChild.getMonth() + 1).toString().padStart(2, '0'); // Nota: los meses comienzan desde 0
          const año = fechaChild.getFullYear();

          const fechaFormateada = `${dia}-${mes}-${año}`;
          item.createdAt = fechaFormateada;
          const child = {
            data: item,
          };
          childrenPresentation.push(child);
        });
      }

      const nodePresentation: TreeNode = {
        data: presentation,
        children: childrenPresentation,
      };

      const nodeAttach: TreeNode = {
        data: attach,
        children: childrenAttach,
      };

      const node: TreeNode = {
        data: element,
        children: [nodePresentation, nodeAttach],
      };
      column.push(node);
    });
    return column;
  }

  filterTable() {
    if (this.fileNameFilter == '') {
      this.fileNameFilter = null;
    }

    if (this.fileDateFilter == '') {
      this.fileDateFilter = null;
    }

    this.loadMinutes();
  }
}
