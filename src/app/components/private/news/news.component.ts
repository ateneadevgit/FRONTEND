/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { RoutesApp } from '../../../../enums/routes.enum';
import { NewsService } from 'src/app/services/news/news.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { INew } from 'src/models/news.interface';
import { ConfirmationService } from 'primeng/api';
import { LoginService } from 'src/app/services/login/login.service';
import { Role } from 'src/enums/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  visible = false;
  typeProgram: string | null = null;

  campus: CatalogsByIdResponse[] = [];
  selectCampus?: any;
  role = 0;
  roleType = Role;
  routesApp = RoutesApp;
  listNew: INew[] = [];

  permisionsRole = [this.roleType.VICERRECTOR];

  constructor(
    private newsService: NewsService,
    private catalogsService: CatalogsService,
    private programsService: ProgramsService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCampus();
    this.loadNewUpdateById();
    this.getRole();
  }

  getRole() {
    this.role = this.loginService.getRole();
  }
  getColor(index: number): string {
    // Define tus colores aquí
    const colors = ['#4b878d', '#c19c00', '#16395f', '#871414'];

    // Elige el color en función del índice
    return colors[index % colors.length];
  }

  loadNewUpdateById() {
    this.newsService.getNewsByCampus(this.getListCampus()).subscribe((response) => {
      const { data } = response;
      this.listNew = data;
    });
  }

  getListCampus() {
    const list: number[] = [];
    this.selectCampus?.forEach((element: any) => {
      list.push(element?.catalogItemId);
    });
    return list;
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
  }

  filterByCampus($event: any) {
    this.programsService.filterByCampus.emit($event?.value);
  }

  deleteNew(item: INew) {
    this.confirmationService.confirm({
      key: 'confirm-dialog',
      message: '¿Esta seguro de eliminar la noticia?',
      header: 'Eliminar noticia',
      icon: 'pi pi-trash',
      accept: () => {
        this.newsService.deleteNewsById(item.newId ?? 0).subscribe({
          next: () => {
            this.alertService.showSuccessMessage({
              message: 'Noticia eliminada con éxito',
            });
            this.loadNewUpdateById();
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

  navigateToNewsView(newId: number): void {
    const url = this.constructNewsViewUrl(newId);
    this.router.navigateByUrl(url);
  }
  constructNewsViewUrl(newId: number): string {
    return `${this.routesApp.NEWS}/${this.routesApp.NEWS}/${this.routesApp.VIEW_NEW}/${newId}`;
  }
}
