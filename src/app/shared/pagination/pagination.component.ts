/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  first = 0;
  rows = 2;
  totalRecords = 10;
  @Input() pagination: any;

  ngOnInit() {
    console.clear();
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
