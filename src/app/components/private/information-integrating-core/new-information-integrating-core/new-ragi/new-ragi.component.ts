/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { INifTypeEnum } from 'src/enums/catalogs-items.enums';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { lastValueFrom } from 'rxjs';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { INif } from 'src/models/nifs.interface';
import { AlertService } from 'src/app/services/message/alert.service';

@Component({
  selector: 'app-new-ragi',
  templateUrl: './new-ragi.component.html',
  styleUrls: ['./new-ragi.component.scss'],
})
export class NewRagiComponent implements OnInit {
  descriptionHtml = '';
  imgPortada = '';
  files: File[] = [];

  defaultNif: INif = {
    content: '',
    createdBy: '',
    image: '',
    image1: '',
    image2: '',
    sections: [],
    type: 0,
  };

  currentNif?: INif = { ...this.defaultNif };
  isEdit = false;

  nifTypeEnum = INifTypeEnum;
  visiblePortadaModal = false;

  constructor(
    private alertService: AlertService,
    private workflowService: WorkflowService,
    private utilsService: UtilsService,
  ) {}

  async ngOnInit() {
    this.currentNif = { ...this.defaultNif };
    await this.loadListSections();
  }

  async loadListSections() {
    this.currentNif = undefined;
    this.currentNif = (
      await lastValueFrom(this.workflowService.getNifByType(this.nifTypeEnum.RAGI))
    ).data;
    if (this.currentNif.nifsId) {
      this.isEdit = true;
      this.currentNif.type = this.nifTypeEnum.RAGI;
      this.currentNif.image1 = this.currentNif.image?.toString() || '';
      this.currentNif.image2 = this.currentNif.image?.toString() || '';
      this.currentNif.sections?.forEach((item: INif) => {
        item.image1 = item.image?.toString() || '';
        item.image2 = item.image?.toString() || '';
      });
    } else {
      this.currentNif = { ...this.defaultNif };
      this.currentNif.type = this.nifTypeEnum.RAGI;
    }
  }

  createHtml($event: string) {
    this.currentNif!.content = $event;
  }

  createHtmlElement($event: any) {
    this.currentNif!.sections[$event.element].content = $event.html;
  }

  getFuntion(item?: INif) {
    return ($event: string) => {
      item!.content = $event;
    };
  }

  getString(text: any) {
    if (typeof text === 'string') {
      if ((text || '').length > 0) {
        return true;
      }
    }
    return false;
  }

  imageUrlPortada($event: string) {
    this.visiblePortadaModal = false;
    this.imgPortada = $event;
  }

  dropped(files: NgxFileDropEntry[], item?: INif) {
    let fileOne: NgxFileDropEntry[] = [];
    if (files.length > 0) {
      fileOne = [files[0]];
    }
    for (const droppedFile of fileOne) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const urlFile = URL.createObjectURL(file);
          fetch(urlFile)
            .then((response) => response.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                item!.image1 = reader.result as string;
              };
              reader.readAsDataURL(blob);
            })
            .catch((error) => {
              item!.image1 = '';
              console.error('Error al convertir el blob a Base64: ', error);
            });
        });
      } else {
        item!.image1 = '';
        // const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  getFileLoad(item: INif) {
    const imageNift = item.image1?.toString();

    if (imageNift === item.image2?.toString()) {
      return null;
    }

    return {
      fileContent: this.utilsService.getBase64File(imageNift),
      fileExtension: this.utilsService.getBase64FileExtension(imageNift),
    };
  }

  async createUpdateNif() {
    const alertMesagge = 'Por favor, Valida que todos los campos este llenos';
    if (!this.currentNif?.content || this.currentNif?.content.trim().length === 0) {
      this.alertService.showErrorMessage({ message: alertMesagge });
      return;
    }

    if (!this.currentNif?.image1 || this.currentNif?.image1?.toString().length == 0) {
      this.alertService.showErrorMessage({ message: alertMesagge });
      return;
    }

    this.currentNif.image = this.getFileLoad(this.currentNif);

    if (this.currentNif.nifsId && this.currentNif.nifsId != null) {
      const pyload = {
        content: this.currentNif.content,
        image: this.currentNif.image,
      };

      this.workflowService.updateNIf(this.currentNif.nifsId ?? 0, pyload).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Actualización realizada con éxito',
          });

          this.loadListSections();
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    } else {
      this.workflowService.createNif(this.currentNif).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Acción realizada con éxito',
          });

          this.loadListSections();
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
}
