import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/admin/template/template.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { ITemplate } from 'src/models/admin/template.interface';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  templateList: ITemplate[] = [];
  viewTemplate = false;
  currentTemplate: ITemplate | null = null;
  routerApp = RoutesApp;

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this.templateService.getTempaltes().subscribe((response) => {
      this.templateList = response.data;
    });
  }

  openViewTemplate(item: ITemplate) {
    this.currentTemplate = item;
    this.viewTemplate = true;
  }
}
