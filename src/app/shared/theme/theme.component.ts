import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  display = false;
  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
