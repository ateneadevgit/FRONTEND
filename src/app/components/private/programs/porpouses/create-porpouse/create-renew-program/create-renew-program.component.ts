import { ConfigService } from 'src/app/services/config/config.service';
import { AlertService } from './../../../../../../services/message/alert.service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { Createporpouse } from 'src/models/porpouse.interface';
import { ContentProgram, Program } from 'src/models/program.interface';

@Component({
  selector: 'app-create-renew-program',
  templateUrl: './create-renew-program.component.html',
  styleUrls: ['./create-renew-program.component.scss'],
})
export class CreateRenewProgramComponent implements OnInit {
  @Output() succesCreate = new EventEmitter<boolean>();
  croppedImageLogo = '';
  visibleLogoModal = false;

  croppedImagePortada = '';
  visiblePortadaModal = false;

  faculties: CatalogsByIdResponse[] = [];
  typeFormation: CatalogsByIdResponse[] = [];
  levelFormation: CatalogsByIdResponse[] = [];
  typeRegister: CatalogsByIdResponse[] = [];
  campus: CatalogsByIdResponse[] = [];
  modality: CatalogsByIdResponse[] = [];
  programs: Program[] = [];
  progaramSelected: ContentProgram | null = null;
  send = false;

  fileName = '';
  documentBase64?: string;
  fileExtension = '';
  allowedExtension = '';
  allowedFileSize = 0;

  formRenovationProgram: FormGroup = new FormGroup({
    programOpt: new FormControl('', [Validators.required]),
    programName: new FormControl({ value: '', disabled: true }),
    facultyId: new FormControl({ value: '', disabled: true }),
    formationTypeId: new FormControl({ value: '', disabled: true }),
    formationLevel: new FormControl({ value: '', disabled: true }),
    campus: new FormControl('', [Validators.required]),
    modality: new FormControl('', [Validators.required]),
    registryTypeId: new FormControl('', [Validators.required]),
    file: new FormControl(''),
  });

  constructor(
    private messageService: MessageService,
    private catalogsService: CatalogsService,
    private utilsService: UtilsService,
    private programsService: ProgramsService,
    private cryptsService: CryptsService,
    private configService: ConfigService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.getPrograms();
    this.loadConfigData();
    this.loadFaculties();
    this.loadTypeFormation();
    this.loadLevelFormation();
    this.loadTypeRegister();
    this.loadCampus();
    this.loadModality();
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  get formControls() {
    return this.formRenovationProgram.controls;
  }

  getPrograms() {
    this.programsService.getPrograms().subscribe((response) => {
      const { data } = response;
      this.programs = data;
    });
  }

  loadProgram() {
    this.progaramSelected = null;
    this.programsService
      .getProgram(this.formRenovationProgram.controls['programOpt'].value?.idProgram)
      .subscribe((response) => {
        const { data } = response;
        if (response.status != 200) {
          return;
        }

        const programOption = this.formRenovationProgram.controls['programOpt'].value;
        this.formRenovationProgram.reset();
        this.formRenovationProgram.controls['programOpt'].setValue(programOption);
        this.progaramSelected = data;
        this.formRenovationProgram.controls['programName'].setValue(this.progaramSelected?.name);
        this.setFacultyId(this.progaramSelected?.idFaculty ?? 0);
        this.setFormationTypeId(this.progaramSelected?.idTypeFormation ?? 0);
        this.setLevelFormation(this.progaramSelected?.idLevelFormation ?? 0);

        this.imageUrlPortada(this.progaramSelected?.cover ?? '');
        this.imageUrlLogo(this.progaramSelected?.logo ?? '');
      });
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
    });
  }

  setFacultyId(facultyId: number) {
    //const facultyId = this.cryptsService.decryptData(SessionStorageItems.SESSION)?.userData?.faculty;
    const findFaculty = this.faculties.find((item) => item.catalogItemId === facultyId);
    if (!findFaculty) return;
    this.formRenovationProgram.controls['facultyId'].setValue(findFaculty);
  }

  setFormationTypeId(idTypeFormation: number) {
    const typeFormation = this.typeFormation.find((item) => item.catalogItemId === idTypeFormation);
    if (!typeFormation) return;
    this.formRenovationProgram.controls['formationTypeId'].setValue(typeFormation);
  }

  setLevelFormation(idLevelFormation: number) {
    const typeFormation = this.levelFormation.find(
      (item) => item.catalogItemId === idLevelFormation,
    );
    if (!typeFormation) return;
    this.formRenovationProgram.controls['formationLevel'].setValue(typeFormation);
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
      this.levelFormation = data;
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
    this.visibleLogoModal = false;
    this.croppedImageLogo = $event;
  }

  imageUrlPortada($event: string) {
    this.visiblePortadaModal = false;
    this.croppedImagePortada = $event;
  }

  createProgram() {
    if (!this.documentBase64) {
      this.showToast('error', '', 'Acta es obligatorio');
      return;
    }
    this.utilsService.getBase64FileExtension(this.documentBase64 ?? '');
    if (!this.formRenovationProgram.valid) return;

    this.send = true;
    const payload: Createporpouse = this.mappingPayload();
    this.programsService.createPorpouse(payload).subscribe({
      next: (response) => {
        if (response.message === 'OK') {
          this.croppedImageLogo = '';
          this.croppedImagePortada = '';
          this.formRenovationProgram.reset();
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
    const formValue = this.formRenovationProgram.value;
    return {
      logo: null,
      cover: null,
      programFather: this.progaramSelected?.idProgram,
      programName: this.progaramSelected?.name ?? '',
      facultyId: this.progaramSelected?.idFaculty ?? 0,
      formationTypeId: this.progaramSelected?.idTypeFormation ?? 0,
      formationLevel: this.progaramSelected?.idLevelFormation ?? 0,
      programId: this.progaramSelected?.idProgram ?? 0,
      campus: this.mappingCatalogIds(formValue.campus),
      modality: this.mappingCatalogIds(formValue.modality),
      developmentDate: this.progaramSelected?.developmentDate ?? '',
      fileProposal: {
        fileContent: this.utilsService.getBase64File(this.documentBase64 ?? '') ?? '',
        fileExtension: this.fileExtension,
      },
      isEnlarge: true,
      registryTypeId: this.progaramSelected?.idRegistryType ?? 0,
    };
  }

  mappingCatalogIds(item: CatalogsByIdResponse[]) {
    if (item?.length === 0) return [];
    const idCampusSelecteable: number[] = [];
    item.forEach((element) => {
      idCampusSelecteable.push(element.catalogItemId);
    });
    return idCampusSelecteable;
  }

  convertToBase64(file: File) {
    this.fileName = file.name;
    this.fileExtension = file.name.split('.')?.pop() || '';

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
}
