import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { Role } from 'src/enums/role.enum';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { LoginResponse } from 'src/models/login.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  session?: LoginResponse;
  role = 0;
  RoleEnum = Role;
  constructor(
    private cryptsService: CryptsService,
    private loginService: LoginService,
  ) {
    this.session = this.cryptsService.decryptData(SessionStorageItems.SESSION) as LoginResponse;
    this.getRole();
  }

  getRole() {
    this.role = this.loginService.getRole();
  }
}
