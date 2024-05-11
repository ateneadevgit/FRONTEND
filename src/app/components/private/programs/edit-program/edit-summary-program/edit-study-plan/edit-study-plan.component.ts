/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-study-plan',
  templateUrl: './edit-study-plan.component.html',
  styleUrls: ['./edit-study-plan.component.scss'],
})
export class EditStudyPlanComponent {
  @Input() objStudyPlan: any[] = [];
  @Output() updateObject = new EventEmitter<any>();

  setUpdateObject(data: any) {
    this.updateObject.emit(data);
  }
}
