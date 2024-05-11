import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FloatingMenuService } from 'src/app/services/floating-menu/floating-menu.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Role } from 'src/enums/role.enum';
import { MenuItemsFloating } from 'src/models/menu-items-floating';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss'],
})
export class FloatingMenuComponent implements OnInit {
  isMenuOpen = false;
  isDescriptionVisible = true;
  currentDescription = '';

  role = 0;

  Role = Role;

  menuItems: MenuItemsFloating[] = [];

  chatItem: MenuItemsFloating = {
    label: 'Chat',
    icon: 'pi pi-comment',
    routerLink: '/chat',
    items: [],
    order: 14,
    color: '#16395f',
    enable: false,
    enableData: false,
    redirect: '',
  };

  displayChat = false;

  constructor(
    private router: Router,
    private floatingMenuService: FloatingMenuService,
    private loginService: LoginService,
  ) {
    this.getRole();
  }

  getRole() {
    this.role = this.loginService.getRole();
    if (this.role === this.Role.ESTUDIANTE || this.role === this.Role.ESTUDIANTE_NO_FORMAL) {
      this.chatItem.enable = true;
    }
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  enableData(data: MenuItemsFloating) {
    data.enableData = true;
  }
  disabledData(data: MenuItemsFloating) {
    data.enableData = false;
  }

  redirectUrl(data: MenuItemsFloating) {
    this.router.navigate([data.routerLink]);
  }

  loadMenuItems() {
    const roleId: number = this.loginService.getRole();
    this.floatingMenuService.getFloatingMenu(roleId).subscribe((response) => {
      this.menuItems = response.data;
    });
  }

  openChat() {
    this.displayChat = true;
  }
}
