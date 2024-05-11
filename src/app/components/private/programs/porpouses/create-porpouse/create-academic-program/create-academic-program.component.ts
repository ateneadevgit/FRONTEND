/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { Createporpouse } from 'src/models/porpouse.interface';

@Component({
  selector: 'app-create-academic-program',
  templateUrl: './create-academic-program.component.html',
  styleUrls: ['./create-academic-program.component.scss'],
})
export class CreateAcademicProgramComponent implements OnInit {
  @Output() succesCreate = new EventEmitter<boolean>();
  croppedImageLogo = '';
  visibleLogoModal = false;

  croppedImagePortada = '';
  visiblePortadaModal = false;

  faculties: CatalogsByIdResponse[] = [];
  typeFormation: CatalogsByIdResponse[] = [];
  levelFormation: CatalogsByIdResponse[] = [];
  levelFormationBack: CatalogsByIdResponse[] = [];
  typeRegister: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  send = false;
  fileName = '';

  multiple = false;

  documentBase64?: string;
  fileExtension = '';
  allowedExtension = '';
  allowedFileSize = 0;

  formCreateProgram: FormGroup = new FormGroup({
    programName: new FormControl('', [Validators.required]),
    facultyId: new FormControl('', [Validators.required]),
    formationTypeId: new FormControl('', [Validators.required]),
    campus: new FormControl({ value: '', disabled: true }, [Validators.required]),
    formationLevel: new FormControl('', [Validators.required]),
    modality: new FormControl({ value: '', disabled: true }, [Validators.required]),
    developmentDate: new FormControl('', [Validators.required]),
    registryTypeId: new FormControl('', [Validators.required]),
    file: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private catalogsService: CatalogsService,
    private utilsService: UtilsService,
    private programsService: ProgramsService,
    private cryptsService: CryptsService,
    private configService: ConfigService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.loadConfigData();
    this.loadFaculties();
    this.loadTypeFormation();
    this.loadLevelFormation();
    this.loadTypeRegister();
    this.loadCampus();
    this.loadModality();
  }

  activarImagen() {
    this.visibleLogoModal = true;
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  get formControls() {
    return this.formCreateProgram.controls;
  }

  loadConfigData() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
      this.getFacultyId();
    });
  }

  getFacultyId() {
    const facultyId = this.cryptsService.decryptData(SessionStorageItems.SESSION)?.userData
      ?.faculty;
    const findFaculty = this.faculties.find((item) => item.catalogItemId === facultyId);
    if (!findFaculty) return;
    this.formCreateProgram.controls['facultyId'].setValue(findFaculty);
  }

  loadTypeFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TYPE_FORMATION).subscribe((response) => {
      const { data } = response;
      this.typeFormation = data;
    });
  }

  loadLevelFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVEL_FORMTATION).subscribe((response) => {
      const { data } = response;
      this.levelFormationBack = data;
      //this.levelFormation = data;
    });
  }

  loadTypeRegister() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TYPE_REGISTER).subscribe((response) => {
      const { data } = response;
      this.typeRegister = data;
    });
  }
  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
  }

  loadModality() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY).subscribe((response) => {
      const { data } = response;
      this.modality = data;
    });
  }
  imageUrlLogo($event: string) {
    if ($event != '') {
      this.croppedImageLogo = $event;
    }
    this.visibleLogoModal = false;
  }

  imageUrlPortada($event: string) {
    this.visiblePortadaModal = false;
    if ($event != '') {
      this.croppedImagePortada = $event;
    }
  }

  createProgram() {
    if (!this.documentBase64) {
      this.showToast('error', '', 'Acta es obligatorio');
      return;
    }
    this.utilsService.getBase64FileExtension(this.documentBase64 ?? '');
    if (!this.formCreateProgram.valid) return;
    if (!this.croppedImageLogo || !this.croppedImagePortada) {
      this.showToast('error', '', 'Logo y/o portada son obligatorios');
      return;
    }
    this.send = true;
    const payload: Createporpouse = this.mappingPayload();
    this.programsService.createPorpouse(payload).subscribe({
      next: (response) => {
        if (response.message === 'OK') {
          this.croppedImageLogo = '';
          this.croppedImagePortada = '';
          this.fileName = '';
          this.formCreateProgram.reset();
          this.succesCreate.emit(true);
        }
        this.send = false;
      },
      error: () => {
        this.send = false;
      },
    });
  }

  mappingPayload() {
    const formValue = this.formCreateProgram.value;
    return {
      logo: {
        fileContent: this.utilsService.getBase64File(this.croppedImageLogo),
        fileExtension: this.utilsService.getBase64FileExtension(this.croppedImageLogo ?? ''),
      },
      cover: {
        fileContent: this.utilsService.getBase64File(this.croppedImagePortada),
        fileExtension: this.utilsService.getBase64FileExtension(this.croppedImagePortada ?? ''),
      },
      programName: formValue.programName,
      facultyId: formValue.facultyId.catalogItemId,
      formationTypeId: formValue.formationTypeId.catalogItemId,
      campus: this.mappingCatalogIds(formValue.campus),
      formationLevel: formValue.formationLevel.catalogItemId,
      modality: this.mappingCatalogIds(formValue.modality),
      developmentDate: this.utilsService.transformDateToDevelopmentProgram(
        formValue.developmentDate,
      ),
      fileProposal: {
        fileContent: this.utilsService.getBase64File(this.documentBase64 ?? '') ?? '',
        fileExtension: this.fileExtension,
      },
      isEnlarge: false,
      registryTypeId: formValue.registryTypeId.catalogItemId,
    };
  }

  mappingCatalogIds(item: CatalogsByIdResponse[] | CatalogsByIdResponse) {
    if (!item) {
      return [];
    }

    if (!Array.isArray(item)) {
      item = [item];
    }

    if (item?.length === 0) return [];

    const idCampusSelecteable: number[] = [];
    item.forEach((element) => {
      idCampusSelecteable.push(element.catalogItemId);
    });
    return idCampusSelecteable;
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
          this.alertService.showErrorMessage({
            title: `Archivo supera el limite de ${this.allowedFileSize}MB`,
            message: 'Inténtalo nuevamente',
          });
        } else {
          this.fileName = file.name;
          this.fileExtension = fileExtension;
          this.convertToBase64(file);
        }
      }
    }
  }

  selectFormacion() {
    const formValue = this.formCreateProgram.value;
    if (formValue.registryTypeId != null) {
      this.formCreateProgram.controls['formationLevel'].enable();
    } else {
      this.formCreateProgram.controls['formationLevel'].setValue(null);
      this.formCreateProgram.controls['formationLevel'].disable();
    }
    if (formValue.formationTypeId.catalogItemId === 15) {
      this.levelFormation = this.levelFormationBack.filter((obj) => obj.catalogItemId === 61);
    } else {
      this.levelFormation = this.levelFormationBack.filter((obj) => obj.catalogItemId != 61);
    }
  }

  selectRegistry() {
    const formValue = this.formCreateProgram.value;
    if (formValue.registryTypeId != null) {
      if (formValue.registryTypeId.catalogItemId == 27) {
        this.multiple = true;
      } else {
        this.multiple = false;
      }

      this.formCreateProgram.controls['campus'].enable();
      this.formCreateProgram.controls['modality'].enable();
    } else {
      this.formCreateProgram.controls['campus'].setValue(null);
      this.formCreateProgram.controls['modality'].setValue(null);
      this.formCreateProgram.controls['campus'].disable();
      this.formCreateProgram.controls['modality'].disable();
    }
  }

  downloadDocument() {
    const documentUrl = 'assets/files/FUSM VA Ampliación de programas académicos.xlsx';

    this.http.get(documentUrl, { responseType: 'arraybuffer' }).subscribe((data) => {
      this.saveToFileSystem(
        data,
        'FUSM VA Ampliación de programas académicos.xlsx',
        'application/xlsx',
      );
    });
  }

  private saveToFileSystem(response: any, filename: string, contentType: string): void {
    const blob = new Blob([response], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
