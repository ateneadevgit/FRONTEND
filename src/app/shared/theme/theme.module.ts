import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SidebarMenuModule } from './sidebar-menu/sidebar-menu.module';
import { HeaderModule } from './header/header.module';
import { FloatingMenuModule } from './floating-menu/floating-menu.module';
/**
 * Este módulo es el núcleo central de la aplicación, ya que integra varios componentes clave para la interfaz de usuario. Incluye el menú lateral proporcionado por el módulo SidebarMenuModule, así como un encabezado general proporcionado por HeaderModule. Además, implementa el módulo de menú flotante FloatingMenuModule. Este módulo sirve como base para que otros módulos puedan mostrar su información en una sección de contenido específica, proporcionando una estructura coherente y unificada en toda la aplicación.
 */
@NgModule({
  declarations: [ThemeComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    SidebarModule,
    ButtonModule,
    SidebarMenuModule,
    HeaderModule,
    FloatingMenuModule,
  ],
})
export class ThemeModule {}
