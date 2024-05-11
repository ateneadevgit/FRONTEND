import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageModule } from 'primeng/image';
import { HomeSecondLanguageRoutingModule } from './home-second-language-routing.module';
import { HomeSecondLanguageComponent } from './home-second-language.component';
/**
 * 
Este módulo, titulado "Centro para el aprendizaje de una segunda lengua", ofrece una plataforma para acceder a recursos destinados al aprendizaje de un segundo idioma. Aquí está la descripción combinada:

Centro para el aprendizaje de una segunda lengua
Este módulo proporciona una interfaz para visualizar contenido informativo sobre el aprendizaje de una segunda lengua, acompañado de una imagen ilustrativa.

Texto Informativo: Presenta un extenso texto con información relevante sobre el aprendizaje de una segunda lengua. El contenido puede incluir descripciones detalladas, explicaciones, análisis o cualquier otra información pertinente relacionada con el proceso de aprendizaje de idiomas.

Imagen Ilustrativa: Acompañando al texto, se muestra una imagen ilustrativa que representa el aprendizaje de un segundo idioma. Esta imagen ayuda a captar la atención del usuario y proporciona una representación visual del contenido del texto.

En conjunto, este módulo ofrece una presentación atractiva y eficaz de información detallada sobre el aprendizaje de una segunda lengua, combinando texto e imágenes para proporcionar una experiencia de usuario enriquecedora.
 */
@NgModule({
  declarations: [HomeSecondLanguageComponent],
  imports: [CommonModule, HomeSecondLanguageRoutingModule, SharedModule, ImageModule],
  exports: [HomeSecondLanguageComponent],
})
export class HomeSecondLanguageModule {}
