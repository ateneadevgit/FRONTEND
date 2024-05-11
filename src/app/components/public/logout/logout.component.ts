import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesApp } from 'src/enums/routes.enum';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private router: Router) {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate([RoutesApp.LOGIN]);
  }
}
