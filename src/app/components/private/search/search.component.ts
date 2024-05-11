/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EportafolioService } from 'src/app/services/eportafolio/eportafolio.service';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import {
  IAddFavorite,
  ISearchEportafolio,
  ISharedEportafolio,
} from 'src/models/eportafolio.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  sharedFilesList: ISharedEportafolio[] = [];
  formatTypeList: CatalogsByIdResponse[] = [];
  search = false;
  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;

  ngOnInit(): void {
    this.loadFormatTypeData();
    this.loadSharedFiles();
  }

  constructor(
    private catalogsService: CatalogsService,
    private logInService: LoginService,
    private eportafolioService: EportafolioService,
  ) {}

  formSearch: FormGroup = new FormGroup({
    keyWord: new FormControl(''),
    name: new FormControl(''),
    formatType: new FormControl(''),
  });

  defaultSearch: ISearchEportafolio = {
    name: null,
    keyWord: null,
    formatType: null,
    endDate: null,
    startDate: null,
  };

  favoriteItem: IAddFavorite = {
    isFavorite: false,
  };

  searchValues = this.defaultSearch;
  addFileToFavorite = this.favoriteItem;

  get formControls() {
    return this.formSearch.controls;
  }

  loadFormatTypeData() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FORMAT_TYPE).subscribe((response) => {
      this.formatTypeList = response.data;
    });
  }

  loadSharedFiles() {
    this.eportafolioService
      .getSharedFiles(this.searchValues, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.totalRecords = response.data.totalNumberItems;
        this.sharedFilesList = response.data.content;
      });
  }

  searchFile() {
    this.searchValues.name =
      this.formSearch.get('name')?.value === '' ? null : this.formSearch.get('name')?.value;
    this.searchValues.keyWord =
      this.formSearch.get('keyWord')?.value === '' ? null : this.formSearch.get('keyWord')?.value;
    this.search = true;
    this.loadSharedFiles();
  }

  downloadDocument(urlFile: string) {
    window.open(urlFile, '#blanck');
  }

  onFormatTypeChange(event: any): void {
    this.searchValues.formatType = event.value.catalogItemId;
  }

  addFavorite(fileId: number, isFavorite: boolean) {
    this.addFileToFavorite.isFavorite = !isFavorite;
    this.eportafolioService.addFileToFavorite(this.addFileToFavorite, fileId).subscribe(() => {
      this.loadSharedFiles();
    });
  }

  cleanSearch() {
    this.formSearch.get('name')?.setValue('');
    this.formSearch.get('keyWord')?.setValue('');
    this.formSearch.get('formatType')?.setValue('');
    this.searchValues.name = null;
    this.searchValues.keyWord = null;
    this.searchValues.formatType = null;
    this.search = false;
    this.loadSharedFiles();
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }
}
