/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TemplateService } from 'src/app/services/admin/template/template.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ITemplate, ITemplateRequest } from 'src/models/admin/template.interface';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
})
export class CreateTemplateComponent implements OnInit {
  templateId = 0;
  breadcrumbItems: MenuItem[] = [];
  currentTemplate: ITemplate | null = null;
  content = '';
  contentSize = 0;

  constructor(
    private fb: FormBuilder,
    private templateService: TemplateService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private routeService: Router,
  ) {}

  formTemplate = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.maxLength(300)]),
    subject: new FormControl('', [Validators.maxLength(400)]),
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((news) => {
      this.templateId = news.get('id') ? Number(news.get('id')) : 0;
      this.preloadTemplate();
    });
  }

  get formControls() {
    return this.formTemplate.controls;
  }

  createHtml(event: any) {
    this.content = event;
    this.contentSize = event.length;
  }

  preloadTemplate() {
    this.templateService.getTemplateById(this.templateId).subscribe((response) => {
      const { data } = response;

      this.currentTemplate = data;
      this.formTemplate.controls.name.setValue(data.templateName);
      this.formTemplate.controls.subject.setValue(data.subject);
      this.formTemplate.controls.description.setValue(data.description);
      this.contentSize = data.emailBody.length;
      this.content = data.emailBody;

      this.breadcrumbItems = [
        { label: 'Notificaciones', routerLink: '/' + RoutesApp.TEMPLATE },
        { label: data.templateName },
      ];
    });
  }

  updateTemplate() {
    if (
      this.formTemplate.get('name')?.invalid ||
      this.formTemplate.get('subject')?.invalid ||
      this.formTemplate.get('description')?.invalid ||
      this.content === '' ||
      this.contentSize > 5000
    ) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const templateRq: ITemplateRequest = {
        content: this.content,
        description: this.formControls['description'].value || null,
        name: this.formControls['name'].value || '',
        subject: this.formControls['subject'].value || null,
      };

      this.templateService.updateTemplate(templateRq, this.templateId || 0).subscribe({
        next: () => {
          this.routeService.navigate([`${RoutesApp.TEMPLATE}`]);
          this.alertService.showSuccessMessage({
            message: 'Acción realizada con éxito',
          });
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }
}
