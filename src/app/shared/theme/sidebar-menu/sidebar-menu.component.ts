import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  items: MenuItem[] = [
    /* {
      label: 'Dashboard',
      icon: 'pi pi-microsoft',
      routerLink: '/dashboard',
      items: [],
    },
    {
      label: 'Facultades y programas',
      icon: 'pi pi-list',
      items: [
        {
          label: 'Programas académicos',
          routerLink: '/programs',
        },
      ],
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Catalogos',
          routerLink: '/settings/catalogs',
        },
      ],
    }, */
  ];

  constructor(private cryptsService: CryptsService) {}

  ngOnInit() {
    const menu = this.cryptsService.decryptData(SessionStorageItems.MENU) as MenuItem[];
    this.items = menu;

    // this.items.forEach((item) => {
    //   if (item?.routerLink == '/information_integrating_core') {
    //     item.icon = 'pi pi-nm-core-sm';
    //   }
    // });

    this.items.push({
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      routerLink: '/logout',
    });
  }
}
