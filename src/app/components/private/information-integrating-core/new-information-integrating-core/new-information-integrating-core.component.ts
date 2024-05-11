/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { INifTypeEnum } from 'src/enums/catalogs-items.enums';
import { Role } from 'src/enums/role.enum';

@Component({
  selector: 'app-new-information-integrating-core',
  templateUrl: './new-information-integrating-core.component.html',
  styleUrls: ['./new-information-integrating-core.component.scss'],
})
export class NewInformationIntegratingCoreComponent implements OnInit {
  nifTypeEnum = INifTypeEnum;
  roleType = Role;
  role = 0;
  activeIndex = 0;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.role = this.loginService.getRole();
    if (this.role === this.roleType.VICERRECTOR) {
      this.activeIndex = -1;
    }
  }

  onChangeTabView($event: any) {
    this.activeIndex = $event.index;
  }
}
