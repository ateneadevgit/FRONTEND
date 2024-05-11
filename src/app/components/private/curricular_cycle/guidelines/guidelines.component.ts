/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { IAttachmentGuideline } from 'src/models/program.interface';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss'],
})
export class GuidelinesComponent implements OnInit {
  routerApp = RoutesApp;
  guidelineList: IAttachmentGuideline[] = [];

  constructor(
    private programsService: ProgramsService,
    private alertService: AlertService,
  ) {}

  async ngOnInit() {
    await this.getGuidelines();
  }

  getGuidelines() {
    this.programsService.getProgramAttachmentGuideline().subscribe((response) => {
      const { data } = response;
      this.guidelineList = data;
      if (this.guidelineList.length === 0) {
        this.alertService.showInfoMessage({ message: 'No se encontraron lineamientos' });
      }
    });
  }

  openAttachment(item: IAttachmentGuideline) {
    window.open(item.fileUrl, 'blank');
  }
}
