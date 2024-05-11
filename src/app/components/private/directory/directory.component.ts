/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DirectoryService } from 'src/app/services/directory/directory.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { IDirectory, IDirectorySearch } from 'src/models/directory.interface';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {
  directoryList: IDirectory[] = [];
  facultyList: CatalogsByIdResponse[] = [];
  selectedFacultiesList: CatalogsByIdResponse[] = [];
  campusList: CatalogsByIdResponse[] = [];
  selectedCampusList: CatalogsByIdResponse[] = [];
  keyWord = null;

  defaultSearch: IDirectorySearch = {
    name: null,
    campusId: [],
    facultyId: [],
  };

  searchValues = this.defaultSearch;

  ngOnInit(): void {
    this.loadDataFaculty();
    this.loadDataCampus();
    this.loadDataDirectory();

    this.formSearch.get('campus')?.valueChanges.subscribe((newValue) => {
      this.onCampusSelectionChange(newValue);
    });

    this.formSearch.get('faculty')?.valueChanges.subscribe((newValue) => {
      this.onFacultySelectionChange(newValue);
    });
  }

  formSearch: FormGroup = new FormGroup({
    faculty: new FormControl(''),
    name: new FormControl(''),
    campus: new FormControl(''),
  });

  constructor(
    private catalogsService: CatalogsService,
    private directoryService: DirectoryService,
  ) {}

  get formControls() {
    return this.formSearch.controls;
  }

  loadDataFaculty() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      this.facultyList = response.data;
    });
  }

  loadDataCampus() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.CAMPUS).subscribe((response) => {
      this.campusList = response.data;
    });
  }

  loadDataDirectory() {
    this.directoryService.getDirectory(this.searchValues).subscribe((response) => {
      this.directoryList = response.data;
      this.directoryList = this.nameFaculty();
      this.directoryList = this.nameCampus();
    });
  }

  nameFaculty() {
    return this.directoryList.map((directory) => {
      const matchingCatalogItem = this.facultyList.find(
        (catalogItem) => catalogItem.catalogItemId === directory.faculty,
      );

      if (matchingCatalogItem) {
        return {
          ...directory,
          facultyName: matchingCatalogItem.catalogItemName,
        };
      }

      return directory;
    });
  }

  nameCampus() {
    return this.directoryList.map((directory) => {
      const campusNames = directory.campus.map((campus) => {
        const matchingCatalogItem = this.campusList.find(
          (catalogItem) => catalogItem.catalogItemId === campus,
        );
        return matchingCatalogItem ? matchingCatalogItem.catalogItemName : null;
      });
      return {
        ...directory,
        campusName: campusNames.filter((name) => name !== null),
      };
    });
  }

  onCampusSelectionChange(event: any): void {
    const campus: number[] = [];
    if (event == null) event = [];
    event.forEach((element: any) => {
      campus.push(element.catalogItemId);
    });
    this.searchValues.campusId = campus;
    this.loadDataDirectory();
  }

  onFacultySelectionChange(event: any): void {
    const faculty: number[] = [];
    if (event == null) event = [];
    event.forEach((element: any) => {
      faculty.push(element.catalogItemId);
    });
    this.searchValues.facultyId = faculty;
    this.loadDataDirectory();
  }

  onSearchChange(): void {
    const valorInput = this.formSearch.get('name')?.value;
    this.keyWord = valorInput;
    this.searchValues.name = valorInput;
    this.loadDataDirectory();
  }

  cleanSearch(): void {
    this.formSearch.get('name')?.setValue('');
    this.keyWord = null;
    this.searchValues.name = null;
    this.loadDataDirectory();
  }
}
