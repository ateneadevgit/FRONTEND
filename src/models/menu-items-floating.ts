export interface MenuItemsFloating {
  label: string;
  enable: boolean;
  enableData: boolean;
  redirect: string;
  icon: string;
  color: string;
  routerLink: string;
  items: MenuItemsFloating[];
  order: number;
}
