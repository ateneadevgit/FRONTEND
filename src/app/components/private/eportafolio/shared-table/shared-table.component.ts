/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { EportafolioService } from 'src/app/services/eportafolio/eportafolio.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ISearchEportafolio, ISharedEportafolio } from 'src/models/eportafolio.interface';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
})
export class SharedTableComponent implements OnInit {
  sharedFilesList: ISharedEportafolio[] = [];
  defaultSearch: ISearchEportafolio = {
    name: null,
    keyWord: null,
    formatType: null,
    endDate: null,
    startDate: null,
  };
  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;
  searchTable = false;

  searchValues = this.defaultSearch;

  ngOnInit(): void {
    this.loadFilesShared();
  }

  constructor(
    private alertService: AlertService,
    private eportafolioService: EportafolioService,
    private fb: FormBuilder,
  ) {}

  formFolder = this.fb.group({
    searchStartDate: new FormControl(''),
    searchEndDate: new FormControl(''),
    searchKeyWord: new FormControl(''),
  });

  searchFile() {
    if (this.validateSearch()) {
      this.searchValues.name =
        this.formFolder.get('searchKeyWord')?.value === ''
          ? null
          : this.formFolder.get('searchKeyWord')?.value || null;
      const searchStartDate = this.formFolder.get('searchStartDate')?.value;
      this.searchValues.startDate = searchStartDate
        ? this.formatDateToString(searchStartDate, false)
        : null;
      const searchEndDate = this.formFolder.get('searchEndDate')?.value;
      this.searchValues.endDate = searchEndDate
        ? this.formatDateToString(searchEndDate, true)
        : null;
      this.loadFilesShared();
      this.searchTable = true;
    }
  }

  cleanSearch() {
    this.formFolder.get('searchKeyWord')?.setValue('');
    this.formFolder.get('searchStartDate')?.setValue('');
    this.formFolder.get('searchEndDate')?.setValue('');
    this.searchValues.name = null;
    this.searchValues.startDate = null;
    this.searchValues.endDate = null;
    this.loadFilesShared();
    this.searchTable = false;
  }

  validateSearch(): boolean {
    let canContinue = false;
    const word = this.formFolder.get('searchKeyWord')?.value || '';
    const init = this.formFolder.get('searchStartDate')?.value || '';
    const end = this.formFolder.get('searchEndDate')?.value || '';
    if (init === '' && end === '' && word === '') {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Debes ingresar por lo menos un valor para iniciar la búsqueda',
      });
    } else if (word !== '') {
      canContinue = true;
    } else if ((init !== '' && end === '') || (init === '' && end !== '')) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Debes ingresar las dos fechas para iniciar la búsqueda.',
      });
    } else if (!this.greaterThanDate(init, end)) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'La fecha final debe ser mayor a la fecha inicial.',
      });
    } else {
      canContinue = true;
    }
    return canContinue;
  }

  formatDateToString(dateSearch: string, isEnd: boolean) {
    const date = new Date(dateSearch);
    const day = this.addZero(date.getDate());
    const month = this.addZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const time: number = isEnd ? Number(day) + 1 : Number(day);
    let realDay = time.toString();
    if (time < 10) realDay = `0${time}`;
    return `${year}-${month}-${realDay}`;
  }

  private addZero(numero: number): string {
    return numero < 10 ? '0' + numero : numero.toString();
  }

  greaterThanDate(startDate: string, endDate: string): boolean {
    const init: Date = new Date(startDate);
    const end: Date = new Date(endDate);
    return end > init;
  }

  downloadDocument(urlFile: string) {
    window.open(urlFile, '#blanck');
  }

  onPageChange(event: any) {
    const page: number = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = page;
  }

  loadFilesShared() {
    this.eportafolioService
      .getSharedFiles(this.searchValues, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.sharedFilesList = response.data.content;
        this.totalRecords = response.data.totalNumberItems;
      });
  }
}
