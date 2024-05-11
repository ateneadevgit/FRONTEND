/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { PreviewDocument } from 'src/models/preview-document.interface';
import { Roleslist } from 'src/models/roles-list.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Input() IdProgram = 0;
  events?: any[];
  roles: Roleslist[] = [];
  statusPorpuse: CatalogsByIdResponse[] = [];
  previewDocument?: PreviewDocument;
  visible = false;
  constructor(
    private programsService: ProgramsService,
    private rolesService: RolesService,
    private catalogsService: CatalogsService,
    private utilService: UtilsService,
    private messageService: MessageService,
  ) {}

  async ngOnInit() {
    await this.getRoles();
    await this.loadStatusPorpouse();
    if (this.IdProgram <= 0) return;
    setTimeout(() => {
      this.getHistoryById();
    }, 1000);
  }

  getRoles() {
    this.rolesService.getAllRoles().subscribe({
      next: (response) => {
        const { data } = response;
        this.roles = data;
      },
    });
  }

  loadStatusPorpouse() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.STATUS_PORPOUSE).subscribe((response) => {
      const { data } = response;
      this.statusPorpuse = data;
    });
  }

  getHistoryById() {
    this.programsService.getHistoryById(this.IdProgram).subscribe({
      next: (response) => {
        const { data } = response;
        this.events = data;
        this.events?.forEach((element, index) => {
          if (index % 2) {
            element.color = '#16395f';
          } else {
            element.color = '#4b878d';
          }
          element.setRole = this.roles.find((item) => item.roleId === element?.rolId);
          element.setStatus = this.statusPorpuse.find(
            (item) => item.catalogItemId === element?.status,
          );
        });
      },
    });
  }

  viewDocument(item: string) {
    if (!item) {
      this.messageService.add({
        severity: 'warn',
        summary: '',
        detail: 'No hay documento adjunto',
      });
      return;
    }
    this.previewDocument = {
      url: item,
      type: this.utilService.getFileExtension(item),
    };
    this.visible = true;
  }

  closeModal($event: boolean) {
    this.visible = $event;
  }

  downloadDocument(url: string) {
    if (!url) {
      this.messageService.add({
        severity: 'warn',
        summary: '',
        detail: 'No hay documento adjunto',
      });
      return;
    }
    window.open(url, 'blank');
  }
}
