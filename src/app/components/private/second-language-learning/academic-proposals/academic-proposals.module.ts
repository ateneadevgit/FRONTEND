import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageModule } from 'primeng/image';
import { AcademicProposalsComponent } from './academic-proposals.component';
import { AcademicProposalsRoutingModule } from './academic-proposals-routing.module';
import { CreateUpdateSecondLanguageModule } from '../create-update-second-language/create-update-second-language.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
/**
 * 
Este módulo proporciona una interfaz para visualizar los cursos disponibles en el Centro de Aprendizaje de una Segunda Lengua. Los estudiantes pueden ver una lista de cursos junto con su información relevante, como título, descripción, duración y modalidad. Además, el módulo permite a los estudiantes inscribirse en los cursos de su interés directamente desde la interfaz. Es una herramienta útil para explorar y participar en los cursos ofrecidos por el centro.
 */
@NgModule({
  declarations: [AcademicProposalsComponent],
  imports: [
    CommonModule,
    AcademicProposalsRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    FileUploadModule,
    NgxFileDropModule,
    ImageModule,
    CreateUpdateSecondLanguageModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  exports: [AcademicProposalsComponent],
  providers: [ConfirmationService],
})
export class AcademicProposalsModule {}
