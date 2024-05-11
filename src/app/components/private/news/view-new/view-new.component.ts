/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { NewsService } from 'src/app/services/news/news.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { INew } from 'src/models/news.interface';

@Component({
  selector: 'app-view-new',
  templateUrl: './view-new.component.html',
  styleUrls: ['./view-new.component.scss'],
})
export class ViewNewComponent implements OnInit {
  @Input() newObject?: INew;

  isView = false;
  newId?: number;
  campus: CatalogsByIdResponse[] = [];
  selectCampus?: any;

  defaultNew: INew = {
    newId: undefined,
    tittle: undefined,
    cover: undefined,
    content: undefined,
    images: [],
    campus: [],
    createdAt: undefined,
    createdBy: undefined,
  };

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private catalogsService: CatalogsService,
    private programsService: ProgramsService,
    private alertService: AlertService,
    private utilsService: UtilsService,
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((news) => {
      if (news.get('id')) {
        this.isView = true;
        this.newId = Number(news.get('id'));
      }
      if (this.isView) {
        this.newObject = this.defaultNew;
        this.newObject.newId = this.newId;
        this.loadNewUpdateById();
      }
    });
  }

  get dateName() {
    let date = new Date();

    if (this.newObject?.createdAt) {
      try {
        const fechaString = this.newObject?.createdAt;
        const partesFecha = fechaString?.split('-');
        const año = parseInt(partesFecha[0]);
        const mes = parseInt(partesFecha[1]) - 1;
        const dia = parseInt(partesFecha[2]);
        date = new Date(año, mes, dia);
      } catch (ex) {
        date = new Date();
      }
    }

    const opciones: Intl.DateTimeFormatOptions = { month: 'long' };
    const formatoFecha: string = date.toLocaleDateString('es-ES', opciones);
    return `${
      formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1)
    } ${date.getDate()} de ${date.getFullYear()}`;
  }

  loadNewUpdateById() {
    this.newsService.getNewsByCampus([]).subscribe((response) => {
      const { data } = response;
      const newUpdate = data.find((item) => item.newId === this.newObject?.newId);
      if (!newUpdate) {
        this.alertService.showErrorMessage({ message: 'La noticia no existe' });
        return;
      }
      this.newObject = newUpdate;
    });
  }

  loadCampusList() {
    const list: any[] = [];
    this.campus?.forEach((element: any) => {
      this.newObject?.campus.forEach((item: number) => {
        if (element?.catalogItemId == item) {
          list.push(element);
        }
      });
    });
    return list;
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
  }
}
