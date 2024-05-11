import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AlertService } from 'src/app/services/message/alert.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { INifTypeEnum } from 'src/enums/catalogs-items.enums';
import { INif } from 'src/models/nifs.interface';

@Component({
  selector: 'app-view-nifs',
  templateUrl: './view-nifs.component.html',
  styleUrls: ['./view-nifs.component.scss'],
})
export class ViewNifsComponent implements OnInit {
  @Input() typeNif?: number = INifTypeEnum.DEFINITION;
  nifTypeEnum = INifTypeEnum;
  nif?: INif;

  constructor(
    private alertService: AlertService,
    private workflowService: WorkflowService,
  ) {}

  async ngOnInit() {
    this.nif = (await lastValueFrom(this.workflowService.getNifByType(this.typeNif || 0))).data;
  }
}
