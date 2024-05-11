import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { RoutesApp } from 'src/enums/routes.enum';
import {
  CatalogsByIdResponse,
  CatalogsResponse,
  CreateCatalog,
  ICreateCatalogItem,
} from 'src/models/catalogs.interface';

@Component({
  selector: 'app-create-catalog',
  templateUrl: './create-catalog.component.html',
  styleUrls: ['./create-catalog.component.scss'],
})
export class CreateCatalogComponent implements OnInit {
  catalogId = 0;
  currentCatalog: CatalogsResponse | null = null;
  catalogsItemList: CatalogsByIdResponse[] = [];
  itemVisible = false;
  popUpItem = 'Creación de item';
  editItem = false;
  itemId = 0;
  breadcrumbItems: MenuItem[] = [];

  constructor(
    private catalogsService: CatalogsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {}

  defaultOrder: number | null = null;

  formCatalog = this.fb.group({
    catalogName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    orderItem: new FormControl(this.defaultOrder, [
      Validators.pattern('^[0-9]*$'),
      this.greaterThanZero,
    ]),
    itemName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    itemDescription: new FormControl('', [Validators.maxLength(255)]),
  });

  get formControls() {
    return this.formCatalog.controls;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((news) => {
      this.catalogId = news.get('id') ? Number(news.get('id')) : 0;
      this.loadCurrentCatalog();
      this.loadCatalogItems();
    });
  }

  loadCatalogItems() {
    this.catalogsService.getCatalogItemsByCatalog(this.catalogId || 0).subscribe((response) => {
      this.catalogsItemList = response.data;
      this.catalogsItemList.sort((a, b) => b.catalogItemId - a.catalogItemId);
    });
  }

  loadCurrentCatalog() {
    this.catalogsService.getCatalogById(this.catalogId).subscribe((response) => {
      this.currentCatalog = response.data;
      this.formCatalog.controls.catalogName.setValue(this.currentCatalog.name);
      this.formCatalog.controls.description.setValue(this.currentCatalog.description);
      this.breadcrumbItems = [
        { label: 'Catálogos', routerLink: '/' + RoutesApp.CATALGOS },
        { label: this.currentCatalog?.name },
      ];
    });
  }

  updateCatalog() {
    if (
      this.formCatalog.get('catalogName')?.invalid ||
      this.formCatalog.get('description')?.invalid
    ) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const updateCatalog: CreateCatalog = {
        catalogType: null,
        description: this.formControls['description'].value || '',
        name: this.formControls['catalogName'].value || '',
      };
      this.catalogsService.updateCatalog(updateCatalog, this.catalogId).subscribe({
        next: () => {
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

  disableEnableCatalogItem(item: CatalogsByIdResponse) {
    const enabled = !item.enabled ? false : true;
    this.catalogsService.enableDisableItem(item.catalogItemId, enabled).subscribe({});
  }

  createCatalogItem() {
    if (this.formCatalog.get('itemName')?.invalid) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newItem: ICreateCatalogItem = {
        catalogId: this.catalogId,
        description: this.formControls['itemDescription'].value || null,
        name: this.formControls['itemName'].value || '',
        order: Number(this.formControls['orderItem'].value) || null,
      };
      if (this.editItem) {
        this.updateCatalogItem(newItem);
      } else {
        this.saveCatalogItem(newItem);
      }
    }
  }

  openCreateItem() {
    this.itemVisible = true;
  }

  loadItemData(itemId: number) {
    this.popUpItem = 'Actualización de item';
    this.catalogsService.getCatalogItemByIs(itemId).subscribe((response) => {
      const { data } = response;
      this.itemId = itemId;
      this.formCatalog.controls.itemName.setValue(data.catalogItemName);
      this.formCatalog.controls.itemDescription.setValue(data.catalogItemDescription);
      this.formCatalog.controls.orderItem.setValue(data.order || null);
      this.editItem = true;
      this.itemVisible = true;
    });
  }

  saveCatalogItem(newItem: ICreateCatalogItem) {
    this.catalogsService.createCatalogItem(newItem).subscribe({
      next: () => {
        this.cleanForm();
        this.loadCatalogItems();
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

  updateCatalogItem(newItem: ICreateCatalogItem) {
    this.catalogsService.updateCatalogItem(newItem, this.itemId).subscribe({
      next: () => {
        this.loadCatalogItems();
        this.cleanForm();
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

  greaterThanZero(control: AbstractControl): ValidationErrors | null {
    const valor = parseFloat(control.value);
    if (Number(valor) < 0) {
      return { mayorQueCero: true };
    }
    return null;
  }

  cleanForm() {
    this.formCatalog.controls.itemName.setValue('');
    this.formCatalog.controls.itemDescription.setValue('');
    this.formCatalog.controls.orderItem.setValue(null);
    this.itemVisible = false;
    this.editItem = false;
    this.popUpItem = 'Creación de item';
    this.itemId = 0;
  }
}
