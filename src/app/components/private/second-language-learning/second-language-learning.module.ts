import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondLanguageLearningComponent } from './second-language-learning.component';
import { SecondLanguageLearningRoutingModule } from './second-language-learning-routing.module';
import { NewJustificationModule } from '../information-integrating-core/new-information-integrating-core/new-justification/new-justification.module';
import { AcademicProposalsModule } from './academic-proposals/academic-proposals.module';
import { ViewNifsModule } from '../information-integrating-core/new-information-integrating-core/view-nifs/view-nifs.module';
import { HomeSecondLanguageModule } from './home-second-language/home-second-language.module';
/**
 * 
Este módulo proporciona una interfaz para el aprendizaje de una segunda lengua y se adapta según el rol del usuario en el sistema. Aquí está el desglose:

Título y Descripción: El título y la descripción inicial cambian dependiendo del rol del usuario. Si el usuario es un vicerrector, se le invita a construir el módulo que llevará el conocimiento de otras lenguas a la comunidad sanmartiniana. Para otros roles, se ofrece acceso a recursos para mejorar las habilidades lingüísticas.

Pestañas de Contenido: Se presentan diferentes pestañas para acceder a diferentes tipos de información:

Definición: Permite al usuario, si es vicerrector, crear una nueva justificación para el módulo relacionada con la definición del programa de segunda lengua. Si no lo es, puede ver las justificaciones existentes.
Perfil de Ingreso: Similar a la pestaña de definición, pero se enfoca en el perfil de ingreso requerido para el programa de segunda lengua.
Propuestas Académicas: Muestra propuestas académicas relacionadas con el programa de segunda lengua.
Componente de Inicio: Si ninguna pestaña está activa, se muestra un componente de inicio específico para el aprendizaje de una segunda lengua.

Este diseño modular permite una experiencia personalizada según el rol del usuario, proporcionando acceso a información relevante y funcionalidades específicas para cada tipo de usuario.
 */
@NgModule({
  declarations: [SecondLanguageLearningComponent],
  imports: [
    CommonModule,
    SecondLanguageLearningRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    NewJustificationModule,
    AcademicProposalsModule,
    ViewNifsModule,
    HomeSecondLanguageModule,
  ],
})
export class SecondLanguageLearningModule {}
