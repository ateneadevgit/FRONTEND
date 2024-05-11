import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles/roles.service';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { LoginResponse } from 'src/models/login.interface';
import { Roleslist } from 'src/models/roles-list.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  session?: LoginResponse;
  roleName = '';
  rolesList: Roleslist[] = [];

  constructor(
    private cryptsService: CryptsService,
    private roleService: RolesService,
  ) {}

  ngOnInit() {
    this.session = this.cryptsService.decryptData(SessionStorageItems.SESSION) as LoginResponse;
    this.getRoleName();
  }

  getRoleName() {
    const roleId = this.session?.userData?.role || 0;
    this.roleService.getAllRoles().subscribe((response) => {
      this.rolesList = response.data;
      this.rolesList.forEach((role) => {
        if (role.roleId === roleId) {
          this.roleName = role.nameRole;
          return;
        }
      });
    });
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe((response) => {
      this.rolesList = response.data;
    });
  }
}
