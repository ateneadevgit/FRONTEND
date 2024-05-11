/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { UpgradeStatusProgram } from 'src/enums/catalogs-items.enums';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { RoutesApp } from 'src/enums/routes.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { PreviewDocument } from 'src/models/preview-document.interface';
import {
  ContentProgram,
  DataEditProgram,
  EvaluateModulesEdit,
  IModule,
  ProgramModule,
  UpgradeProgram,
} from 'src/models/program.interface';

@Component({
  selector: 'app-dialog-active-edit',
  templateUrl: './dialog-active-edit.component.html',
  styleUrls: ['./dialog-active-edit.component.scss'],
})
export class DialogActiveEditComponent implements OnInit {
  @Input() idProgram!: number;

  step = 2;
  fileName = '';
  documentBase64?: string;
  fileExtension = '';
  allowedExtension = '';
  allowedFileSize = 0;

  programModules: ProgramModule[] = [];

  selectedModules: ProgramModule[] = [];
  selectedModulesEvaluate: IModule[] = [];
  moduleForEdit: IModule[] = [];

  programActive: ContentProgram | null = null;
  dataEditProgram!: DataEditProgram;

  disabledSelect = false;
  formEdit = this.fb.group({
    checkVicerrector: new FormControl(false), // boolean
  });
  idStatus = 0;
  UpgradeStatusEnum = UpgradeStatusProgram;
  Role = Role;
  role = 0;
  editOnline = false; //Identifica si tiene una edicion en curso

  previewDocument?: PreviewDocument;
  visiblePreviewDocument = false;
  constructor(
    private programsService: ProgramsService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private router: Router,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private configService: ConfigService,
  ) {
    this.getRole();
    this.loadProgram();
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  ngOnInit(): void {
    this.verifyStatus();
    this.programsService.getProgram(Number(this.idProgram)).subscribe((response) => {
      this.programActive = response.data;
      // carga catalogos
      this.loadConfigData();
      this.loadFaculties();
      this.loadCampus();
      this.loadLevelFormation();
      this.changeStep(2);
    });
  }

  verifyStatus() {
    this.programsService
      .getUpgradeProgramStatus(this.idProgram.toString())
      .subscribe((response) => {
        this.idStatus = response.data;
        if (
          this.idStatus === this.UpgradeStatusEnum.REQUEST_STATUS ||
          this.idStatus === this.UpgradeStatusEnum.UPDGRADE_STATUS
        ) {
          this.editOnline = true;
        }
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
      if (this.programActive) {
        const name = data.find(
          (obj) => this.programActive?.idFaculty === obj.catalogItemId,
        )?.catalogItemName;
        this.programActive.nameFaculty = name ? name : '';
      }
    });
  }
  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      if (this.programActive) {
        const campusList: number[] = this.programActive.campusList.split(',').map(Number);
        const filteredCampus = data.filter((campus) => campusList.includes(campus.catalogItemId));
        const campusNames = filteredCampus.map((campus) => campus.catalogItemName);
        const campusListStringResult = campusNames.join(', ');
        this.programActive.nameCampusList = campusListStringResult;
      }
    });
  }

  loadLevelFormation() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.LEVEL_FORMTATION).subscribe((response) => {
      const { data } = response;
      if (this.programActive) {
        const name = data.find(
          (obj) => this.programActive?.idLevelFormation === obj.catalogItemId,
        )?.catalogItemName;
        this.programActive.nameLevelFormation = name ? name : '';
      }
    });
  }

  loadProgram() {
    this.programsService.getProgramModuleEdit(false).subscribe((response) => {
      const { data } = response;

      if (data.length === 0) {
        this.alertService.showInfoMessage({ message: 'No se encontraron módulos' });
        return;
      }
      this.programModules = data;
    });
  }

  updateSelection(item: ProgramModule) {
    if (item.isSelected) {
      // Si se selecciona, agregar al arreglo
      this.selectedModules.push(item);
    } else {
      // Si se deselecciona, eliminar del arreglo
      const index = this.selectedModules.indexOf(item);
      if (index !== -1) {
        this.selectedModules.splice(index, 1);
      }
    }
  }

  updateSelectionEvaluate(item: IModule) {
    if (item.isSelected) {
      // Si se selecciona, agregar al arreglo
      this.selectedModulesEvaluate.push(item);
    } else {
      // Si se deselecciona, eliminar del arreglo
      const index = this.selectedModulesEvaluate.indexOf(item);
      if (index !== -1) {
        this.selectedModulesEvaluate.splice(index, 1);
      }
    }
  }

  updateSelectionEvaluateApproved(item: IModule, value: boolean) {
    const indiceObjeto = this.moduleForEdit.findIndex((obj) => obj.moduleId === item.moduleId);
    if (indiceObjeto !== -1) {
      if (item.approved && value) {
        this.moduleForEdit[indiceObjeto].declined = false;
      }
      if (item.declined && !value) {
        this.moduleForEdit[indiceObjeto].approved = false;
      }
    }
  }

  changeStep(step: number) {
    this.step = step;
    switch (step) {
      case 1:
        break;
      case 2:
        this.LoadDataProgram(false);
        break;
      case 3:
        break;
      case 4:
        this.LoadDataProgram(true);
        break;
    }
  }

  LoadDataProgram(reset: boolean) {
    this.programsService.getModuleEvaluate(this.idProgram).subscribe((response) => {
      this.moduleForEdit = response.data;
      if (this.moduleForEdit.length > 0 && this.editOnline) {
        if (!reset) {
          this.step = 3;
          this.programModules = this.actualizarSeleccion(this.programModules, this.moduleForEdit);
          this.programsService.getModuleEdition(this.idProgram).subscribe((response) => {
            const listaModulosAceptados = response.data.modules;
            if (listaModulosAceptados.length > 0) {
              this.moduleForEdit = this.actualizarModuleSeleccion(
                this.moduleForEdit,
                listaModulosAceptados,
              );
              this.disabledSelect = true;
            }
          });
        } else {
          this.step = 2;
        }
      }
    });
    this.programsService.getProposalRenovation(this.idProgram).subscribe((response) => {
      this.dataEditProgram = response.data;
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

  sendUpgradeProgram() {
    if (!this.documentBase64) {
      this.alertService.showWarnMessage({ message: 'Acta es obligatorio' });
      return;
    }
    if (this.selectedModules.length === 0) {
      this.alertService.showWarnMessage({ message: 'Debe seleccionar mínimo un modulo' });
      return;
    }

    const listModules: number[] = this.selectedModules.map((module) => module.moduleId);
    const payload: UpgradeProgram = {
      createdBy: null,
      hasApproval: this.formEdit.controls.checkVicerrector.value || false,
      minute: {
        fileContent: this.utilsService.getBase64File(this.documentBase64 ?? ''),
        fileExtension: this.fileExtension,
      },
      roleId: null,
      modulesId: listModules,
    };
    this.programsService.upgradeProgram(this.idProgram, payload).subscribe({
      next: (response) => {
        if (response.data === 'OK') {
          this.alertService.showSuccessMessage({ message: 'Solicitud realizada con éxito' });
          this.ngOnInit();
        }
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Error al actualizar el programa:', error);
      },
      complete: () => {
        // Manejar la lógica completa aquí si es necesario
        console.log('La operación ha sido completada.');
      },
    });
  }

  sendUpgradeEvaluateProgram(value: boolean) {
    if (!this.documentBase64) {
      this.alertService.showWarnMessage({ message: 'Acta es obligatorio' });
      return;
    }
    if (value) {
      if (this.moduleForEdit.filter((obj) => obj.approved).length === 0) {
        this.alertService.showWarnMessage({
          message: 'Debe seleccionar mínimo un modulo aprobado',
        });
        return;
      }
    }
    let listModules: number[] = [];
    if (value) {
      listModules = this.moduleForEdit
        .filter((module) => module.approved)
        .map((module) => module.moduleId);
    } else {
      listModules = this.moduleForEdit.map((module) => module.moduleId);
    }
    const payload: EvaluateModulesEdit = {
      createdBy: null,
      approvedModules: listModules,
      fileFeedback: {
        fileContent: this.utilsService.getBase64File(this.documentBase64 ?? ''),
        fileExtension: this.fileExtension,
      },
      roleId: null,
      evaluation: value ? 'approved' : 'declined',
    };
    this.programsService.sendModuleEvaluate(this.idProgram, payload).subscribe({
      next: (response) => {
        // Manejar la respuesta exitosa aquí
        this.alertService.showWarnMessage({ message: 'Acción realizada con exito' });
        this.changeStep(2);
        console.log('Respuesta exitosa:', response);
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Error al actualizar el programa:', error);
      },
      complete: () => {
        // Manejar la lógica completa aquí si es necesario
        console.log('La operación ha sido completada.');
      },
    });
  }

  actualizarSeleccion(programModules: ProgramModule[], modules: IModule[]): ProgramModule[] {
    return programModules.map((programModule) => {
      const correspondingModule = modules.find(
        (module) => module.moduleId === programModule.moduleId,
      );
      if (correspondingModule) {
        programModule.isSelected = true;
      }
      return programModule;
    });
  }
  actualizarModuleSeleccion(programModules: IModule[], modules: any[]): IModule[] {
    return programModules.map((programModule) => {
      const correspondingModule = modules.find(
        (module) => module.moduleId === programModule.moduleId,
      );
      programModule.isSelected = true;
      if (correspondingModule) {
        programModule.approved = true;
      } else {
        programModule.declined = true;
      }
      return programModule;
    });
  }

  redirectEditProgram() {
    this.router.navigate([`${RoutesApp.PROGRAMS}/${RoutesApp.EDIT_PROGRAM}/${this.idProgram}`]);
  }

  downloadDocument(url: string) {
    window.open(url, 'blank');
  }

  previewDocumentEvent(url: string) {
    this.previewDocument = {
      url: url,
      type: this.utilsService.getFileExtension(url),
    };
    this.visiblePreviewDocument = true;
  }
  closeModalPreviewDocument($event: boolean) {
    this.visiblePreviewDocument = $event;
  }
}
