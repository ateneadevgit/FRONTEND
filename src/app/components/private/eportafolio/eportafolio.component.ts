/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContextMenu } from 'primeng/contextmenu';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { EportafolioService } from 'src/app/services/eportafolio/eportafolio.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { SinuService } from 'src/app/services/sinu/sinu.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import {
  IConsumedSpace,
  IEportafolioMenu,
  IFileRequest,
  IFolder,
  IFolderRequest,
  ISearchEportafolio,
  ISharedEportafolio,
} from 'src/models/eportafolio.interface';
import { DirectorsRole, IUserRoleSearch } from 'src/models/sinu.interface';
import { IUserAssigned } from 'src/models/workflow.interface';
import { MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { FileContent } from 'src/models/porpouse.interface';
import { ConfigService } from 'src/app/services/config/config.service';
import { SettingEnum } from 'src/enums/setting.enum';

@Component({
  selector: 'app-eportafolio',
  templateUrl: './eportafolio.component.html',
  styleUrls: ['./eportafolio.component.scss'],
})
export class EportafolioComponent implements OnInit {
  @ViewChild('cm') contextMenu!: ContextMenu;
  @ViewChild('targetElement') targetElement: any;

  select = 0;
  folderList: IFolder[] = [];
  createFolderKey = false;
  createFileKey = false;
  editFolder = false;
  currentFolder: IFolder | null = null;
  eportafolioIcons = [
    { key: 'item-1', value: '../../../../assets/eportafolio-icons/icon-1.svg' },
    { key: 'item-2', value: '../../../../assets/eportafolio-icons/icon-2.svg' },
    { key: 'item-3', value: '../../../../assets/eportafolio-icons/icon-3.svg' },
    { key: 'item-4', value: '../../../../assets/eportafolio-icons/icon-4.svg' },
    { key: 'item-5', value: '../../../../assets/eportafolio-icons/icon-5.svg' },
    { key: 'item-6', value: '../../../../assets/eportafolio-icons/icon-6.svg' },
    { key: 'item-7', value: '../../../../assets/eportafolio-icons/icon-7.svg' },
    { key: 'item-8', value: '../../../../assets/eportafolio-icons/icon-8.svg' },
    { key: 'item-9', value: '../../../../assets/eportafolio-icons/icon-9.svg' },
    { key: 'item-10', value: '../../../../assets/eportafolio-icons/icon-10.svg' },
  ];
  items: IEportafolioMenu[];
  folderPopUp = 'Crear carpeta';
  filePopUp = 'Cargar archivo';
  sharedFilesList: ISharedEportafolio[] = [];
  formatTypeList: CatalogsByIdResponse[] = [];
  filePrivacityList: CatalogsByIdResponse[] = [];
  fileType = 0;
  privacityType = 0;
  listUser: DirectorsRole[] = [];
  filteredListUser: DirectorsRole[] = [];
  searchUser = '';
  listAssignedUser: IUserAssigned[] = [];
  sharedUsers: string[] = [];
  selectedUsers = '';
  documentBase64: string | null = null;
  fileName = '';
  fileSize = 0;
  fileExtension = '';
  folderFileCreate = 0;
  allowedExtension = '';
  allowedFileSize = 0;
  consumed: IConsumedSpace | null = null;
  currentFile: ISharedEportafolio | null = null;
  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;
  searchTable = false;
  deleteFileKey = false;
  currentFileToDelete: ISharedEportafolio | null = null;

  constructor(
    private eportafolioService: EportafolioService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private catalogsService: CatalogsService,
    private sinuService: SinuService,
    private logInService: LoginService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private configService: ConfigService,
  ) {
    this.items = [
      { label: 'Editar', icon: '' },
      { label: 'Eliminar', icon: '' },
    ];
  }
  ngOnInit(): void {
    this.getConsumedSpace();
  }

  defaultSearch: ISearchEportafolio = {
    name: null,
    keyWord: null,
    formatType: null,
    endDate: null,
    startDate: null,
  };

  searchValues = this.defaultSearch;
  defaultCatalogItem: CatalogsByIdResponse | null = null;
  defaultFolder: IFolder | null = null;

  formFolder = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    color: new FormControl('#fece04', [Validators.required, Validators.maxLength(50)]),
    icon: new FormControl(this.eportafolioIcons[0].value, [
      Validators.required,
      Validators.maxLength(200),
    ]),
    fileName: new FormControl('', [Validators.required]),
    keyWord: new FormControl('', [Validators.required]),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    formatType: new FormControl(this.defaultCatalogItem, [Validators.required]),
    folderId: new FormControl(this.defaultFolder, [Validators.required]),
    privacity: new FormControl(this.defaultCatalogItem, [Validators.required]),
    searchUser: new FormControl(''),
    link: new FormControl('', [Validators.required]),
    searchName: new FormControl(''),
    searchStartDate: new FormControl(''),
    searchEndDate: new FormControl(''),
    searchKeyWord: new FormControl(''),
  });

  get formControls() {
    return this.formFolder.controls;
  }

  loadFolders(changeOprion: boolean) {
    this.eportafolioService.getFolders().subscribe((response) => {
      this.folderList = response.data;
      if (changeOprion) this.select = 1;
    });
  }

  createFolder() {
    if (this.formFolder.get('name')?.invalid) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newFolder: IFolderRequest = {
        name: this.formControls['name'].value || '',
        color: this.formControls['color'].value || '#fece04',
        icon: this.formControls['icon'].value || this.eportafolioIcons[0].value,
      };
      if (this.editFolder) {
        this.eportafolioService
          .updateFolder(newFolder, this.currentFolder?.folderId || 0)
          .subscribe({
            next: () => {
              this.resetValues();
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
      } else {
        this.eportafolioService.createFolder(newFolder).subscribe({
          next: () => {
            this.resetValues();
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
  }

  openCreateFolder() {
    this.createFolderKey = true;
  }

  openCreateFile() {
    this.loadFolders(false);
    this.loadFormatTypeData();
    this.loadFilePrivacityData();
    this.createFileKey = true;
  }

  showMenu(event: MouseEvent, item: IFolder) {
    this.currentFolder = item;
    this.contextMenu.show(event);
    event.preventDefault();
  }

  handleItemClick(event: any) {
    if (event.srcElement.innerText === 'Editar') {
      this.updateFolder();
    } else if (event.srcElement.innerText === 'Eliminar') {
      this.deleteFolder();
    }
  }

  updateFolder() {
    this.formControls.color.setValue(this.currentFolder?.color || '#fece04');
    this.formControls.name.setValue(this.currentFolder?.name || '');
    this.formControls.icon.setValue(this.currentFolder?.icon || this.eportafolioIcons[0].value);
    this.folderPopUp = 'Actualizar carpeta';
    this.editFolder = true;
    this.createFolderKey = true;
  }

  deleteFolder() {
    this.eportafolioService.deleteFolder(this.currentFolder?.folderId || 0).subscribe({
      next: () => {
        this.resetValues();
        this.getConsumedSpace();
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

  resetValues() {
    this.loadFolders(true);
    this.formControls.color.setValue('#fece04');
    this.formControls.name.setValue('');
    this.formControls.icon.setValue(this.eportafolioIcons[0].value);
    this.currentFolder = null;
    this.folderPopUp = 'Crear carpeta';
    this.createFolderKey = false;
    this.editFolder = false;
  }

  loadFilesByFolder(item: IFolder | null) {
    this.currentFolder = item;
    this.eportafolioService
      .getFilesByFolder(item?.folderId || 0, this.searchValues, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.totalRecords = response.data.totalNumberItems;
        this.sharedFilesList = response.data.content;
        this.select = 4;
      });
  }

  loadFilesByFolderPage() {
    this.eportafolioService
      .getFilesByFolder(
        this.currentFolder?.folderId || 0,
        this.searchValues,
        this.pageNumber,
        this.pageSize,
      )
      .subscribe((response) => {
        this.totalRecords = response.data.totalNumberItems;
        this.sharedFilesList = response.data.content;
        this.select = 4;
      });
  }

  loadFormatTypeData() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FORMAT_TYPE).subscribe((response) => {
      this.formatTypeList = response.data;
    });
  }

  loadFilePrivacityData() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FILE_PRIVACITY).subscribe((response) => {
      this.filePrivacityList = response.data;
      this.filePrivacityList.forEach((item, index) => {
        const roleId = this.logInService.getRole();
        if (
          item.catalogItemId === 148 &&
          (roleId === Role.ESTUDIANTE || roleId === Role.ESTUDIANTE_NO_FORMAL)
        ) {
          this.filePrivacityList.splice(index, 1);
        } else if (
          item.catalogItemId === 147 &&
          (roleId === Role.DOCENTE_BASICO || roleId === Role.DOCENTE_COORDINADOR)
        ) {
          this.filePrivacityList.splice(index, 1);
        }
      });
    });
  }

  changeFileType(event: any) {
    this.fileType = event.value.catalogItemId;
    if (this.fileType === 144) {
      this.configService.getSettingById(SettingEnum.IMAGE_EXTENSION).subscribe((response) => {
        this.allowedExtension = response.data;
      });
    } else if (this.fileType === 142) {
      this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
        this.allowedExtension = response.data;
      });
    }
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  changePrivacity(event: any) {
    const roleId: number = this.logInService.getRole();
    let rolesId: number[] = [];
    if (roleId === Role.DOCENTE_BASICO || roleId === Role.DOCENTE_COORDINADOR) {
      rolesId = [Role.ESTUDIANTE, Role.ESTUDIANTE_NO_FORMAL];
    } else if (roleId === Role.ESTUDIANTE || roleId === Role.ESTUDIANTE_NO_FORMAL) {
      rolesId = [Role.DOCENTE_BASICO, Role.DOCENTE_COORDINADOR];
    }
    const roles: IUserRoleSearch = {
      roles: rolesId,
    };
    this.getUsers(roles);
    this.privacityType = event.value.catalogItemId;
  }

  changeFolder(event: any) {
    this.folderFileCreate = event.value.folderId;
  }

  filterTable() {
    this.searchUser = this.formControls['searchUser'].value || '';
    if (this.searchUser === '') {
      this.filteredListUser = [];
    } else {
      this.listUser.forEach((user) => {
        if (this.sharedUsers.includes(user.userEmail)) {
          user.selected = true;
        }
      });

      this.filteredListUser = this.listUser
        .filter((director: any) =>
          director.userEmail.toLowerCase().includes(this.searchUser.toLowerCase()),
        )
        .slice(0, 2);
    }
  }

  getUsers(roleId: IUserRoleSearch) {
    this.sinuService.getUsersByRoles(roleId).subscribe({
      next: (response) => {
        this.listUser = response.data.map((user: any) => ({ ...user, selected: false }));
      },
    });
  }

  onSelectuser(userItem: DirectorsRole) {
    this.selectedUsers = '';
    if (this.sharedUsers.includes(userItem.userEmail)) {
      this.sharedUsers = this.sharedUsers.filter((user) => !user.includes(userItem.userEmail));
    } else {
      this.sharedUsers.push(userItem.userEmail);
    }
    this.selectedToString();
    this.filterTable();
  }

  selectedToString() {
    this.sharedUsers.forEach((user) => {
      this.selectedUsers += user + ', ';
    });
    this.selectedUsers = this.selectedUsers.slice(0, -2);
  }

  createFile() {
    let canCreate = false;

    if (this.fileType === 143) {
      if (
        this.formFolder.get('fileName')?.invalid ||
        this.formFolder.get('link')?.invalid ||
        this.formFolder.get('privacity')?.invalid ||
        this.formFolder.get('formatType')?.invalid ||
        this.formFolder.get('folderId')?.invalid
      ) {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Los campos no estan diligenciados correctamente',
        });
      } else {
        canCreate = true;
      }
    } else {
      if (
        this.formFolder.get('fileName')?.invalid ||
        this.formFolder.get('keyWord')?.invalid ||
        (!this.documentBase64 && !this.editFolder) ||
        this.formFolder.get('privacity')?.invalid ||
        this.formFolder.get('formatType')?.invalid ||
        this.formFolder.get('folderId')?.invalid
      ) {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Los campos no estan diligenciados correctamente',
        });
      } else {
        canCreate = true;
      }
    }

    if (canCreate) {
      if (this.validateCanCreateFile()) {
        this.privacityType = 0;
        this.fileType = 0;
        this.fileExtension = '';
        this.fileSize = 0;
        this.sharedUsers = [];
        this.resetFileForm();
        this.createFileKey = false;
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'No puedes subir este archivo porque no tienes espacio suficiente',
        });
      } else {
        this.saveFile(this.getFilePayload());
      }
    }
  }

  getFilePayload(): IFileRequest {
    const fileModel: FileContent = {
      fileContent: this.utilsService.getBase64File(this.documentBase64 ?? '') ?? '',
      fileExtension: this.fileExtension,
    };

    const newFile: IFileRequest = {
      file: this.fileType !== 143 ? fileModel : null,
      fileSize: this.fileType !== 143 ? this.fileSize : 0,
      folderId: this.folderFileCreate,
      keyWord: this.formControls['keyWord'].value || null,
      name: this.formControls['fileName'].value || '',
      privacity: this.privacityType,
      sharedWith: this.sharedUsers,
      type: this.fileType,
      url: this.formControls['link'].value || null,
    };

    return newFile;
  }

  saveFile(payload: IFileRequest) {
    if (this.editFolder) {
      this.eportafolioService.updateFile(payload, this.currentFile?.fileId || 0).subscribe({
        next: () => {
          this.resetFileForm();
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
    } else {
      this.eportafolioService.createFile(payload).subscribe({
        next: () => {
          this.resetFileForm();
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

  resetFileForm() {
    this.formFolder.controls.formatType.setValue(null);
    this.formFolder.controls.name.setValue('');
    this.formFolder.controls.fileName.setValue('');
    this.formFolder.controls.link.setValue('');
    this.formFolder.controls.keyWord.setValue('');
    this.formFolder.controls.privacity.setValue(null);
    this.formFolder.controls.folderId.setValue(null);
    this.formFolder.controls.searchUser.setValue('');
    if (this.select === 4) {
      this.loadFilesByFolder(this.currentFolder);
    }
    this.getConsumedSpace();
    this.formFolder.controls.formatType.enable();
    this.formFolder.controls.link.enable();
    this.createFileKey = false;
    this.filePopUp = 'Crear archivo';
    this.currentFile = null;
    this.createFileKey = false;
    this.fileName = '';
    this.selectedUsers = '';
    this.filteredListUser = [];
    this.formFolder.reset();
    this.editFolder = false;
  }

  downloadDocument(urlFile: string) {
    window.open(urlFile, '#blanck');
  }

  deleteFile() {
    this.eportafolioService.deleteFile(this.currentFileToDelete?.fileId || 0).subscribe({
      next: () => {
        this.closeDeleteFile();
        this.getConsumedSpace();
        this.loadFilesByFolder(this.currentFolder || null);
        this.alertService.showSuccessMessage({
          message: 'Acción realizada con éxito',
        });
      },
    });
  }

  getConsumedSpace() {
    this.eportafolioService.getConsumedSpace().subscribe((response) => {
      this.consumed = response.data;
    });
  }

  validateCanCreateFile(): boolean {
    const consumed = this.fileSize + (this.consumed?.consumed || 0);
    const posiblyConsumed = (consumed * 100) / (this.consumed?.avaliable || 1);
    return posiblyConsumed > 100;
  }

  openUpdateDocument(file: ISharedEportafolio) {
    this.filePopUp = 'Actualizar archivo';
    this.editFolder = true;
    this.currentFile = file;
    this.filterTable();
    this.loadFileValues();
  }

  loadFileValues() {
    this.loadFolders(false);
    this.loadFormatTypeData();
    this.loadFilePrivacityData();
    this.eportafolioService.getFileById(this.currentFile?.fileId || 0).subscribe((response) => {
      const { data } = response;
      const type = this.formatTypeList.find((item) => item.catalogItemId === data.type) || null;
      const privacity =
        this.filePrivacityList.find((item) => item.catalogItemId === data.privacity) || null;
      const folder = this.folderList.find((item) => item.folderId === data.folderId) || null;
      this.fileType = data.type;
      this.privacityType = data.privacity;
      this.folderFileCreate = data.folderId;
      this.formFolder.controls.formatType.setValue(type);
      this.formFolder.controls.formatType.disable();
      this.formFolder.controls.fileName.setValue(data.name);
      this.formFolder.controls.link.setValue(data.url);
      this.formFolder.controls.link.disable();
      this.formFolder.controls.keyWord.setValue(data.keyWord);
      this.formFolder.controls.privacity.setValue(privacity);
      this.formFolder.controls.folderId.setValue(folder);
      this.sharedUsers = data.sharedWith;
      const roleId = this.logInService.getRole();
      let rolesId: number[] = [];
      if (roleId === Role.DOCENTE_BASICO || roleId === Role.DOCENTE_COORDINADOR) {
        rolesId = [Role.ESTUDIANTE, Role.ESTUDIANTE_NO_FORMAL];
      } else if (roleId === Role.ESTUDIANTE || roleId === Role.ESTUDIANTE_NO_FORMAL) {
        rolesId = [Role.DOCENTE_BASICO, Role.DOCENTE_COORDINADOR];
      }
      const roles: IUserRoleSearch = {
        roles: rolesId,
      };
      this.getUsers(roles);
      this.selectedToString();
      this.createFileKey = true;
    });
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }

  searchFile() {
    if (this.validateSearch()) {
      this.searchValues.name =
        this.formFolder.get('searchKeyWord')?.value === ''
          ? null
          : this.formFolder.get('searchKeyWord')?.value || null;
      const searchStartDate = this.formFolder.get('searchStartDate')?.value;
      this.searchValues.startDate = searchStartDate
        ? this.formatDateToString(searchStartDate, false)
        : null;
      const searchEndDate = this.formFolder.get('searchEndDate')?.value;
      this.searchValues.endDate = searchEndDate
        ? this.formatDateToString(searchEndDate, true)
        : null;
      this.searchTable = true;
      this.loadFilesByFolderPage();
    }
  }

  cleanSearch() {
    this.formFolder.get('searchKeyWord')?.setValue('');
    this.formFolder.get('searchStartDate')?.setValue('');
    this.formFolder.get('searchEndDate')?.setValue('');
    this.searchValues.name = null;
    this.searchValues.startDate = null;
    this.searchValues.endDate = null;
    this.searchTable = false;
    this.loadFilesByFolderPage();
  }

  validateSearch(): boolean {
    let canContinue = false;
    const word = this.formFolder.get('searchKeyWord')?.value || '';
    const init = this.formFolder.get('searchStartDate')?.value || '';
    const end = this.formFolder.get('searchEndDate')?.value || '';
    if (init === '' && end === '' && word === '') {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Debes ingresar por lo menos un valor para iniciar la búsqueda',
      });
    } else if (word !== '') {
      canContinue = true;
    } else if ((init !== '' && end === '') || (init === '' && end !== '')) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Debes ingresar las dos fechas para iniciar la búsqueda.',
      });
    } else if (!this.greaterThanDate(init, end)) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'La fecha final debe ser mayor a la fecha inicial.',
      });
    } else {
      canContinue = true;
    }
    return canContinue;
  }

  formatDateToString(dateSearch: string, isEnd: boolean) {
    const date = new Date(dateSearch);
    const day = this.addZero(date.getDate());
    const month = this.addZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const time: number = isEnd ? Number(day) + 1 : Number(day);
    let realDay = time.toString();
    if (time < 10) realDay = `0${time}`;
    return `${year}-${month}-${realDay}`;
  }

  private addZero(numero: number): string {
    return numero < 10 ? '0' + numero : numero.toString();
  }

  greaterThanDate(startDate: string, endDate: string): boolean {
    const init: Date = new Date(startDate);
    const end: Date = new Date(endDate);
    return end > init;
  }

  openDeleteFile(item: ISharedEportafolio) {
    this.currentFileToDelete = item;
    this.deleteFileKey = true;
  }

  closeDeleteFile() {
    this.currentFileToDelete = null;
    this.deleteFileKey = false;
  }
}
