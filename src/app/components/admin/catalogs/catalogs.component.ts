import { Component, OnInit } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { CatalogsByIdResponse, CatalogsResponse } from 'src/models/catalogs.interface';
import { HeaderModule } from 'src/models/header-module.interface';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss'],
})
export class CatalogsComponent implements OnInit {
  visible = false;
  createVisble = true;
  currentCatalog: CatalogsResponse | null = null;
  catalogsItemList: CatalogsByIdResponse[] = [];
  routerApp = RoutesApp;

  header: HeaderModule = {
    title: {
      title: 'Catálogos',
      icon: 'pi pi-list',
    },
    hasAction: true,
    button: {
      title: this.currentCatalog?.name || '',
      icon: 'pi pi-plus',
    },
  };

  catalogs: CatalogsResponse[] = [];

  constructor(private catalogsService: CatalogsService) {}

  ngOnInit(): void {
    this.catalogsService.getAllCatalogs().subscribe({
      next: (catalogs) => {
        const { data } = catalogs;
        this.catalogs = data;
      },
    });
  }

  outputEvent($event: boolean) {
    this.visible = $event;
  }

  viewCatalog(catalog: CatalogsResponse) {
    this.currentCatalog = catalog;
    this.loadCatalogItems();
  }

  loadCatalogItems() {
    this.catalogsService
      .getCatalogItemsByCatalog(this.currentCatalog?.idCatalog || 0)
      .subscribe((response) => {
        this.catalogsItemList = response.data;
        this.visible = true;
      });
  }
}
