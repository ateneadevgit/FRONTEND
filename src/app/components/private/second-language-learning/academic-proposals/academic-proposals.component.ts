/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { SecondLanguageService } from 'src/app/services/second-language/second-language.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { SecondLanguage, SecondLanguageGroup } from 'src/models/program.interface';

@Component({
  selector: 'app-academic-proposals',
  templateUrl: './academic-proposals.component.html',
  styleUrls: ['./academic-proposals.component.scss'],
})
export class AcademicProposalsComponent implements OnInit {
  groupSecondLenguage: CatalogsByIdResponse[] = [];
  modalities: CatalogsByIdResponse[] = [];
  secondLanguageGroup: SecondLanguageGroup[] = [];

  secondLanguageIdEdit?: number;
  secondLanguageView?: any;
  visibleViewSecLanguage = false;

  role = 0;
  roleType = Role;
  optView = 0;

  constructor(
    private secondLanguageService: SecondLanguageService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
    private confirmationService: ConfirmationService,
    private utilService: UtilsService,
    private alertService: AlertService,
  ) {}

  async ngOnInit() {
    this.role = this.loginService.getRole();
    await this.loadDataCatalogs();
    this.loadSecondLanguageList();
  }

  getSecondLanguageByGroup(groupId: number) {
    return this.secondLanguageGroup.find((item) => item.groupId === groupId);
  }

  async loadDataCatalogs() {
    this.groupSecondLenguage =
      (
        await lastValueFrom(
          this.catalogsService.getAllCatalogsByid(CatalogsEnum.GROUP_SECOND_LANGUAGE),
        )
      )?.data ?? [];

    this.modalities =
      (await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.MODALITY)))?.data ??
      [];
  }

  loadSecondLanguageList() {
    this.secondLanguageService.getSecondLanguageByGroup().subscribe((response) => {
      const { data } = response;
      this.secondLanguageGroup = data;
    });
  }

  openCreateEdit(itemId?: number) {
    this.secondLanguageIdEdit = itemId;
    this.optView = 1;
  }

  openSecondLanguageView(secondLanguage: SecondLanguage) {
    this.secondLanguageView = secondLanguage;
    this.secondLanguageView.modalityName =
      this.modalities.find((item) => item.catalogItemId === this.secondLanguageView.modalityId)
        ?.catalogItemName ?? '--';
    this.visibleViewSecLanguage = true;
  }

  closeSecondLanguageView() {
    this.visibleViewSecLanguage = false;
    this.secondLanguageView = undefined;
  }

  closeComponent() {
    this.optView = 0;
    this.secondLanguageIdEdit = undefined;
    this.secondLanguageGroup = [];
    this.loadSecondLanguageList();
  }

  deleteSecondLanguage(SecondLanguageId: number) {
    this.confirmationService.confirm({
      key: 'confirm-dialog',
      message: '¿Esta seguro de eliminar el nivel?',
      header: 'Eliminar nivel',
      accept: () => {
        this.secondLanguageService.deleteSecondLanguage(SecondLanguageId).subscribe({
          next: () => {
            this.alertService.showSuccessMessage({
              message: 'Eliminacíon realizada con éxito',
            });
            this.secondLanguageGroup = [];
            this.loadSecondLanguageList();
          },
          error: () => {
            this.alertService.showErrorMessage({
              title: 'Error',
              message: 'Inténtalo nuevamente',
            });
          },
        });
      },
    });
  }
}
