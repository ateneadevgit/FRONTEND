import { Component, OnInit } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse, ICatalogFilter } from 'src/models/catalogs.interface';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
})
export class FacultyComponent implements OnInit {
  facultyList: CatalogsByIdResponse[] = [];
  keyWord = null;

  defaultSearch: ICatalogFilter = {
    keyWord: null,
  };

  searchValues = this.defaultSearch;

  ngOnInit(): void {
    this.loadDataFaculties();
  }

  formSearch: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private catalogsService: CatalogsService) {}

  get formControls() {
    return this.formSearch.controls;
  }

  loadDataFaculties() {
    this.searchValues.keyWord = this.keyWord;
    this.catalogsService
      .getAllCatalogsByidFilter(this.searchValues, CatalogsEnum.FACULTIES)
      .subscribe((response) => {
        this.facultyList = response.data;
      });
  }

  onSearch(): void {
    const valorInput = this.formSearch.get('name')?.value;
    this.keyWord = valorInput;
    this.loadDataFaculties();
  }

  onCleanSearch(): void {
    this.formSearch.get('name')?.setValue('');
    this.keyWord = null;
    this.loadDataFaculties();
  }
}
