import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { lastValueFrom } from 'rxjs';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { SecondLanguageService } from 'src/app/services/second-language/second-language.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { SecondLanguage, SecondLanguageRQ } from 'src/models/program.interface';

@Component({
  selector: 'app-create-update-second-language',
  templateUrl: './create-update-second-language.component.html',
  styleUrls: ['./create-update-second-language.component.scss'],
})
export class CreateUpdateSecondLanguageComponent implements OnInit {
  @Output() closeComponent = new EventEmitter();
  @Input() secondLanguageIdEdit?: number;
  objEdit?: SecondLanguage;

  modalities: CatalogsByIdResponse[] = [];
  groupSecondLenguage: CatalogsByIdResponse[] = [];

  croppedImageLogo = '';
  visibleLogoModal = false;

  principalImage = '';

  formSecondLanguage: FormGroup = new FormGroup({
    tittle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    startLevel: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    endLevel: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    duration: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    hours: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    groupId: new FormControl('', [Validators.required]),
    modalityId: new FormControl('', [Validators.required]),
  });

  constructor(
    private secondLanguageService: SecondLanguageService,
    private catalogsService: CatalogsService,
    private utilService: UtilsService,
    private alertService: AlertService,
  ) {}

  async ngOnInit() {
    await this.loadDataCatalogs();
    if (this.secondLanguageIdEdit) {
      this.loadSecondLanguageDateEdit();
    }
  }

  get formControlsSecondLanguage() {
    return this.formSecondLanguage.controls;
  }

  async loadDataCatalogs() {
    this.modalities =
      (await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY)))?.data ??
      [];
    this.groupSecondLenguage =
      (
        await lastValueFrom(
          this.catalogsService.getAllCatalogsByid(CatalogsEnum.GROUP_SECOND_LANGUAGE),
        )
      )?.data ?? [];
  }

  loadSecondLanguageDateEdit() {
    this.secondLanguageService
      .getSecondLanguageById(this.secondLanguageIdEdit || 0)
      .subscribe((response) => {
        const { data } = response;
        this.objEdit = data;

        //Set data FormSecondLanguage
        this.formControlsSecondLanguage['tittle'].setValue(data.tittle);
        this.formControlsSecondLanguage['startLevel'].setValue(data.startLevel);
        this.formControlsSecondLanguage['endLevel'].setValue(data.endLevel);
        this.formControlsSecondLanguage['description'].setValue(data.description);
        this.formControlsSecondLanguage['duration'].setValue(data.duration);
        this.formControlsSecondLanguage['hours'].setValue(data.hours);

        const groupIdObj = this.groupSecondLenguage.find(
          (item) => item.catalogItemId == data.groupId,
        );
        this.formControlsSecondLanguage['groupId'].setValue(groupIdObj);

        const modalityIdObj = this.modalities.find((item) => item.catalogItemId == data.modalityId);
        this.formControlsSecondLanguage['modalityId'].setValue(modalityIdObj);

        this.principalImage = data.cover;
        this.croppedImageLogo = data.icon;
      });
  }

  imageUrlLogo($event: string) {
    this.visibleLogoModal = false;
    this.croppedImageLogo = $event;
  }

  dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const urlFile = URL.createObjectURL(file);
          fetch(urlFile)
            .then((response) => response.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                this.principalImage = reader.result as string;
              };
              reader.readAsDataURL(blob);
            })
            .catch((error) => {
              this.principalImage = '';
              console.error('Error al convertir el blob a Base64: ', error);
            });
        });
      } else {
        this.principalImage = '';
        //   const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        //  console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  getSecondLenguageRQ(): SecondLanguageRQ {
    let cover = null;
    let icon = null;

    if (this.objEdit?.cover === this.principalImage) {
      cover = null;
    } else {
      cover = {
        fileContent: this.utilService.getBase64File(this.principalImage),
        fileExtension: this.utilService.getBase64FileExtension(this.principalImage),
      };
    }

    if (this.objEdit?.icon === this.croppedImageLogo) {
      icon = null;
    } else {
      icon = {
        fileContent: this.utilService.getBase64File(this.croppedImageLogo),
        fileExtension: this.utilService.getBase64FileExtension(this.croppedImageLogo),
      };
    }

    return {
      cover: cover,
      createdBy: '',
      description: this.formControlsSecondLanguage['description']?.value?.toString(),
      duration: Number(this.formControlsSecondLanguage['duration']?.value?.toString()),
      endLevel: this.formControlsSecondLanguage['endLevel']?.value?.toString(),
      groupId: Number(this.formControlsSecondLanguage['groupId']?.value?.catalogItemId),
      hours: Number(this.formControlsSecondLanguage['hours']?.value?.toString()),
      icon: icon,
      inscriptionLink: this.objEdit ? this.objEdit.inscriptionLink : '',
      modalityId: Number(this.formControlsSecondLanguage['modalityId']?.value?.catalogItemId),
      startLevel: this.formControlsSecondLanguage['startLevel']?.value?.toString(),
      tittle: this.formControlsSecondLanguage['tittle']?.value?.toString(),
    };
  }

  createUpdate() {
    if (this.principalImage.length < 1) {
      this.alertService.showErrorMessage({
        message: 'La Imagen principal es obligatoria',
      });
      return;
    }

    if (this.formSecondLanguage.invalid) {
      this.alertService.showErrorMessage({
        message: 'Formulario inválido, asegurese de llenar todos los campos',
      });
      return;
    }

    if (this.croppedImageLogo.length < 1) {
      this.alertService.showErrorMessage({
        message: 'El Logo de nivel es obligatorio',
      });
      return;
    }

    const pyload = this.getSecondLenguageRQ();

    if (this.secondLanguageIdEdit) {
      this.secondLanguageService
        .updateSecondLanguage(this.secondLanguageIdEdit || 0, pyload)
        .subscribe({
          next: () => {
            this.alertService.showSuccessMessage({
              message: 'Actualización realizada con éxito',
            });
            this.closeComponent.emit();
          },
          error: () => {
            this.alertService.showErrorMessage({
              title: 'Error',
              message: 'Inténtalo nuevamente',
            });
          },
        });
    } else {
      this.secondLanguageService.createSecondLanguage(pyload).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Nivel creado con éxito',
          });
          this.closeComponent.emit();
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
