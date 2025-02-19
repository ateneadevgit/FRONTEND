import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSpinnerVisible = false;
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    this.spinner?.spinnerObservable.subscribe((response) => {
      this.isSpinnerVisible = response?.show;
    });
  }
}
