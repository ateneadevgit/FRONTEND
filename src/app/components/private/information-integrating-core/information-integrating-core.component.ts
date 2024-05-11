/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { RoutesApp } from 'src/enums/routes.enum';

@Component({
  selector: 'app-information-integrating-core',
  templateUrl: './information-integrating-core.component.html',
  styleUrls: ['./information-integrating-core.component.scss'],
})
export class InformationIntegratingCoreComponent implements OnInit {
  role = 0;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadRouteByRole();
  }

  loadRouteByRole() {
    this.role = this.loginService.getRole();
    this.router.navigate([
      `${RoutesApp.INFORMATION_INTEGRATING_CORE}/${RoutesApp.NEW_INFORMATION_INTEGRATING_CORE}`,
    ]);
  }
}
