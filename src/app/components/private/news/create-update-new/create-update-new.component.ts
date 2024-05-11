/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { NewsService } from 'src/app/services/news/news.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { IDocumentManager, INew } from 'src/models/news.interface';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { RoutesApp } from 'src/enums/routes.enum';
import { SettingEnum } from 'src/enums/setting.enum';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-create-update-new',
  templateUrl: './create-update-new.component.html',
  styleUrls: ['./create-update-new.component.scss'],
})
export class CreateUpdateNewComponent implements OnInit {
  visible = false;
  typeProgram: string | null = null;

  campus: CatalogsByIdResponse[] = [];
  selectCampus?: any;
  isEdit = false;

  visiblePortadaModal = false;
  visibleAddImagesModal = false;

  allowedExtension = '';
  allowedFileSize = 0;

  documentBase64?: string;
  typeCommitte?: number;

  lengthContent = 20000;

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

  createNew = this.defaultNew;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private catalogsService: CatalogsService,
    private programsService: ProgramsService,
    private alertService: AlertService,
    private utilsService: UtilsService,
    private configService: ConfigService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((news) => {
      this.createNew.newId = news.get('id') ? Number(news.get('id')) : undefined;
    });

    await this.loadCampus();
    this.getAllowedExtension();

    if (this.createNew.newId) {
      this.isEdit = true;
      await this.loadNewUpdateById();
    }
  }

  loadCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      const { data } = response;
      this.campus = data;
    });
  }

  loadNewUpdateById() {
    this.newsService.getNewsByCampus([]).subscribe((response) => {
      const { data } = response;
      const newUpdate = data.find((item) => item.newId === this.createNew.newId);
      if (!newUpdate) {
        this.alertService.showErrorMessage({ message: 'La noticia a actualizar no existe' });
        return;
      }
      this.createNew = newUpdate;
      this.createNew.cover2 = this.createNew.cover;
      this.createNew.images2 = [...this.createNew.images];
      this.selectCampus = this.loadCampusList();
    });
  }

  loadCampusList() {
    const list: any[] = [];
    this.campus?.forEach((element: any) => {
      this.createNew.campus.forEach((item: number) => {
        if (element?.catalogItemId == item) {
          list.push(element);
        }
      });
    });
    return list;
  }

  filterByCampus($event: any) {
    this.programsService.filterByCampus.emit($event?.value);
  }

  imageUrlPortada($event: string) {
    if ($event !== '') {
      this.createNew.cover = $event;
    }
    this.visiblePortadaModal = false;
  }

  imageUrlAddImages($event: string) {
    if ($event !== '') {
      this.createNew.images.push($event);
    }
    this.visibleAddImagesModal = false;
  }

  deleteImage(index: number) {
    const deleteImg = this.createNew.images[index];
    if (deleteImg) {
      this.createNew.images = this.createNew.images.filter((item) => item != deleteImg);
    }
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  createHtml($event: string) {
    this.createNew.content = $event;
  }

  async getListImagenes(listImages: string[]) {
    const list: string[] = [];

    for (let i = 0; i < listImages.length; i++) {
      if (this.isEdit === true) {
        const repeatImg = this.createNew.images2?.find((item) => item === listImages[i]);
        if (!repeatImg) {
          const file: IDocumentManager = {
            documentBytes: this.utilsService.getBase64File(listImages[i]),
            documentExtension: this.utilsService.getBase64FileExtension(listImages[i]),
            documentVersion: '',
            idUser: '',
          };

          list.push(
            (await lastValueFrom(this.newsService.createDocumentManager(file)))?.data ?? '',
          );
        } else {
          list.push(repeatImg);
        }
      } else {
        const file: IDocumentManager = {
          documentBytes: this.utilsService.getBase64File(listImages[i]),
          documentExtension: this.utilsService.getBase64FileExtension(listImages[i]),
          documentVersion: '',
          idUser: '',
        };

        list.push((await lastValueFrom(this.newsService.createDocumentManager(file)))?.data ?? '');
      }
    }

    return list;
  }

  async getListImagenesCover(coverInput: string) {
    let coverImg = this.createNew.cover2;

    if (coverInput !== coverImg) {
      const file: IDocumentManager = {
        documentBytes: this.utilsService.getBase64File(coverInput),
        documentExtension: this.utilsService.getBase64FileExtension(coverInput),
        documentVersion: '',
        idUser: '',
      };

      coverImg = (await lastValueFrom(this.newsService.createDocumentManager(file)))?.data ?? '';
    }

    return coverImg;
  }

  getListCampues() {
    const list: number[] = [];
    this.selectCampus?.forEach((element: any) => {
      list.push(element?.catalogItemId);
    });
    return list;
  }

  async saveNew() {
    if (!this.selectCampus || this.selectCampus?.length === 0) {
      this.alertService.showErrorMessage({ message: 'Seleccióne un lugar de desarrollo' });
      return;
    }

    if (!this.createNew.tittle || this.createNew.tittle?.trim() == '') {
      this.alertService.showErrorMessage({ message: 'El nombre de la noticia es obligatorio' });
      return;
    }

    if (!this.createNew.cover) {
      this.alertService.showErrorMessage({ message: 'La portada es obligatoria' });
      return;
    }

    if (!this.createNew.content || this.createNew.content == '') {
      this.alertService.showErrorMessage({ message: 'La noticia es obligatoria' });
      return;
    }

    if (this.createNew.content.length > this.lengthContent) {
      this.alertService.showErrorMessage({
        message: `El texto límite de la noticia permitido es de ${this.lengthContent} caracteres`,
      });
      return;
    }

    this.createNew.campus = this.getListCampues();
    const cover = this.createNew.cover;
    const images = this.createNew.images;
    this.createNew.cover = await this.getListImagenesCover(this.createNew.cover);
    this.createNew.images = await this.getListImagenes(this.createNew.images);

    if (this.isEdit) {
      this.newsService.updateNewsById(this.createNew).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Noticia actualizada con éxito',
          });

          this.createNew = this.defaultNew;
          this.createNew.content = '';

          this.router.navigate([`${RoutesApp.NEWS}`]);
        },
        error: () => {
          this.createNew.cover = cover;
          this.createNew.images = images;
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    } else {
      this.newsService.createNews(this.createNew).subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Noticia creada con éxito',
          });

          this.router.navigate([`${RoutesApp.NEWS}`]);
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
