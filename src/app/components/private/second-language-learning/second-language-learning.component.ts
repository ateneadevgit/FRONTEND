/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { INifTypeEnum } from 'src/enums/catalogs-items.enums';
import { Role } from 'src/enums/role.enum';

@Component({
  selector: 'app-second-language-learning',
  templateUrl: './second-language-learning.component.html',
  styleUrls: ['./second-language-learning.component.scss'],
})
export class SecondLanguageLearningComponent implements OnInit {
  nifTypeEnum = INifTypeEnum;
  roleType = Role;
  role = 0;
  activeIndex = 0;
  RoleEnum = Role;

  constructor(private loginService: LoginService) {}

  async ngOnInit() {
    this.role = this.loginService.getRole();
    if (this.role === this.roleType.VICERRECTOR) {
      this.activeIndex = -1;
    }
  }

  onChangeTabView($event: any) {
    this.activeIndex = $event.index;
  }
}
