/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login/login.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';

@Component({
  selector: 'app-view-subcore',
  templateUrl: './view-subcore.component.html',
  styleUrls: ['./view-subcore.component.scss'],
})
export class ViewSubcoreComponent implements OnInit {
  @Output() closeComponent = new EventEmitter();
  @Input() subCoreId?: number;
  @Input() imageSubCore?: string;
  select = 0;
  subCoreData?: any;
  subCoreSyllabusData?: any;
  subCoreSubjectGuideData?: any;
  syllabusUrlPdf = '';
  sujectGuideUrlPdf = '';

  constructor(
    private workflowService: WorkflowService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    this.loadDataSubCore();
  }

  loadDataSubCore() {
    this.workflowService.getCurriculumDetail(this.subCoreId ?? 0).subscribe((response) => {
      const { data } = response;
      this.subCoreData = data;
    });

    const pyloadSubjectGuide = {
      createdBy: null,
      roleId: null,
      teacher: null,
    };

    this.workflowService.getSyllabusDataNifPdf(this.subCoreId ?? 0).subscribe((response) => {
      const { data } = response;
      this.syllabusUrlPdf = data;
    });

    this.workflowService
      .getSubjectGuideNifPdf(this.subCoreId || 0, pyloadSubjectGuide)
      .subscribe((response) => {
        const { data } = response;
        this.sujectGuideUrlPdf = data;
      });

    this.workflowService.getSyllabusData(this.subCoreId ?? 0).subscribe((response) => {
      const { data } = response;
      this.subCoreSyllabusData = data;
    });

    /*this.workflowService.getSyllabusDataNifPdf(this.subCoreId ?? 0).subscribe((response) => {
      const { data } = response;
      this.sujectGuideUrlPdf = data;
    });*/
  }

  getObjPdf(urlPdf: string) {
    const sanitizerUrl: any = this.sanitizer.bypassSecurityTrustResourceUrl(urlPdf);
    return sanitizerUrl.changingThisBreaksApplicationSecurity;
  }

  closeComponentEmit() {
    this.closeComponent.emit();
  }
}
