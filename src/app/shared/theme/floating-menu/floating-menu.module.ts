import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingMenuComponent } from './floating-menu.component';
import { DialogModule } from 'primeng/dialog';
import { ChatbotModule } from '../../chatbot/chatbot.module';
/**
 * Este módulo implementa un menú flotante que ofrece diferentes opciones según el usuario que esté logueado en el sistema. El menú flotante es una herramienta de navegación accesible que proporciona funcionalidades específicas para cada tipo de usuario. Esta funcionalidad dinámica permite una experiencia de usuario personalizada y adaptada a las necesidades y permisos de cada usuario, mejorando así la usabilidad y eficiencia del sistema.
 */
@NgModule({
  declarations: [FloatingMenuComponent],
  imports: [CommonModule, DialogModule, ChatbotModule],
  exports: [FloatingMenuComponent],
})
export class FloatingMenuModule {}
