import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarMenuRoutingModule } from './sidebar-menu-routing.module';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
/**
 * 
Este módulo se encarga de cargar la información del menú desde el almacenamiento de sesión y renderiza todas las opciones a las que tiene acceso el usuario logueado. Es responsable de presentar dinámicamente las opciones de menú disponibles para el usuario, basándose en los permisos y roles asignados. Esto proporciona una interfaz de usuario personalizada y adaptada a las capacidades y autorizaciones específicas de cada usuario.
 */
@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [CommonModule, SidebarMenuRoutingModule, PanelMenuModule],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}
