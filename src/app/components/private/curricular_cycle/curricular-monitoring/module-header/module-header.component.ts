/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ProgramModule } from 'src/models/program.interface';

@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.scss'],
})
export class ModuleHeaderComponent implements OnInit {
  @Input() module?: ProgramModule;
  @Input() programId?: number;
  routerApp = RoutesApp;

  urlAttachment = '';

  homogolacion = [
    { moduleId: 1, attachmentName: 'Perfiles proceso curricular', programAttachmentId: 70 },
    { moduleId: 2, attachmentName: 'RAE (Globales y específicos)', programAttachmentId: 74 },
    { moduleId: 3, attachmentName: 'Objetivos de formación', programAttachmentId: 78 },
    { moduleId: 4, attachmentName: 'Competencias', programAttachmentId: 82 },
    { moduleId: 5, attachmentName: 'Componentes curriculares', programAttachmentId: 85 },
    { moduleId: 6, attachmentName: 'Organizacion del plan de estudios', programAttachmentId: 71 },
    { moduleId: 7, attachmentName: 'Sílabos', programAttachmentId: 75 },
    { moduleId: 8, attachmentName: 'Salidas curriculares', programAttachmentId: 79 },
    { moduleId: 9, attachmentName: 'Créditos académicos', programAttachmentId: 83 },
    { moduleId: 10, attachmentName: 'Formación en inglés', programAttachmentId: 86 },
    { moduleId: 11, attachmentName: 'Nucleos y subnucleos', programAttachmentId: 72 },
    { moduleId: 12, attachmentName: 'Banco de problemas', programAttachmentId: 76 },
    { moduleId: 13, attachmentName: 'Investigación formativa', programAttachmentId: 80 },
    { moduleId: 14, attachmentName: 'Extensión o proyección social', programAttachmentId: 84 },
    { moduleId: 15, attachmentName: 'Internacionalizacion', programAttachmentId: 86 },
    { moduleId: 16, attachmentName: 'Programas academicos de campo', programAttachmentId: 73 },
    { moduleId: 17, attachmentName: 'Programas técnicos y tecnológicos', programAttachmentId: 77 },
    { moduleId: 18, attachmentName: 'Autorizaciones de actualización', programAttachmentId: 81 },
  ];

  constructor(
    private http: HttpClient,
    private ProgramsService: ProgramsService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadUrl();
    }, 1000);
  }

  loadUrl() {
    let id = 0;
    id =
      this.homogolacion.find((obj) => obj.moduleId === this.module?.moduleId)
        ?.programAttachmentId || 0;
    if (id !== 0) {
      this.ProgramsService.getGuidelineAttachmentById(id).subscribe((response) => {
        this.urlAttachment = response.data;
      });
    }
  }

  downloadDocument() {
    window.open(this.urlAttachment, '_blank');
  }
}
