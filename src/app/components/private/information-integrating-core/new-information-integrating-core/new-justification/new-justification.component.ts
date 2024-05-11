/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { Component, Input, OnInit } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { INif } from 'src/models/nifs.interface';
import { INifTypeEnum } from 'src/enums/catalogs-items.enums';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from 'src/app/services/helpers/utils.service';

@Component({
  selector: 'app-new-justification',
  templateUrl: './new-justification.component.html',
  styleUrls: ['./new-justification.component.scss'],
})
export class NewJustificationComponent implements OnInit {
  @Input() typeNif?: number;
  descriptionHtml = '';
  imgPortada = '';
  files: File[] = [];

  defaultNif: INif = {
    nifsId: undefined,
    content: '',
    createdBy: '',
    image: '',
    image1: '',
    image2: '',
    sections: [],
    type: 0,
  };

  currentNif?: INif = { ...this.defaultNif };

  nifTypeEnum = INifTypeEnum;

  constructor(
    private catalogsService: CatalogsService,
    private programsService: ProgramsService,
    private alertService: AlertService,
    private loginService: LoginService,
    private workflowService: WorkflowService,
    private utilsService: UtilsService,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    await this.loadListSections();
  }

  async loadListSections() {
    this.currentNif = undefined;
    this.currentNif = (
      await lastValueFrom(this.workflowService.getNifByType(this.typeNif || 0))
    ).data;
    if (this.currentNif.nifsId) {
      this.currentNif.type = this.typeNif || 0;
      this.currentNif.image1 = this.currentNif.image?.toString() || '';
      this.currentNif.image2 = this.currentNif.image?.toString() || '';
      this.currentNif.sections?.forEach((item: INif) => {
        item.image1 = item.image?.toString() || '';
        item.image2 = item.image?.toString() || '';
      });
    } else {
      this.currentNif = { ...this.defaultNif };
      this.currentNif.type = this.typeNif || 0;
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

  addSection() {
    const section = { ...this.defaultNif };
    this.currentNif?.sections.push(section);
  }

  saveAddSection(index: number) {
    const alertMesagge = 'Por favor, valida que todos los campos este llenos';

    if (this.currentNif) {
      if (
        !this.currentNif.sections[index].content ||
        this.currentNif.sections[index].content.trim().length === 0
      ) {
        this.alertService.showErrorMessage({ message: alertMesagge });
        return;
      }

      if (
        !this.currentNif.sections[index].image1 ||
        this.currentNif.sections[index].image1?.toString().length == 0
      ) {
        this.alertService.showErrorMessage({ message: alertMesagge });
        return;
      }
      this.currentNif.sections[index].type = null;
      this.currentNif.sections[index].sections = [];
      this.currentNif.sections[index].image = this.getFileLoad(this.currentNif!.sections[index]);

      if (
        this.currentNif.sections[index].nifsId &&
        this.currentNif.sections[index].nifsId != null
      ) {
        this.updateNifs(
          this.currentNif.sections[index],
          'Sección actualización realizada con éxito',
        );
      } else {
        this.currentNif.sections[index].type = null;
        this.currentNif.sections[index].sections = [];
        const newNif = [this.currentNif.sections[index]];
        this.workflowService.addSecctionByNif(this.currentNif.nifsId ?? 0, newNif).subscribe({
          next: () => {
            this.alertService.showSuccessMessage({
              message: 'Sección agregada con éxito',
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

  deleteSection(index: number, item: INif) {
    if (item.nifsId != null && item.nifsId) {
      this.workflowService.deleteNIf(item.nifsId ?? 0).subscribe({
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
    } else {
      this.currentNif?.sections.splice(index, 1);
    }
  }

  dropped(files: NgxFileDropEntry[], item?: INif) {
    for (const droppedFile of files) {
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
    if (item.image1 === item.image2) {
      return null;
    }

    const imageNift = item.image1;
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

    if (!this.currentNif?.image1 || this.currentNif?.image1.toString().length == 0) {
      this.alertService.showErrorMessage({ message: alertMesagge });
      return;
    }

    this.currentNif.image = this.getFileLoad(this.currentNif);

    if (this.currentNif.nifsId && this.currentNif.nifsId != null) {
      this.currentNif.sections = [];
      this.updateNifs(this.currentNif);
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

  updateNifs(nif: INif, message?: string) {
    const pyload = {
      content: nif.content,
      image: nif.image,
    };

    this.workflowService.updateNIf(nif.nifsId ?? 0, pyload).subscribe({
      next: () => {
        this.alertService.showSuccessMessage({
          message: message ? message : 'Actualización realizada con éxito',
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
