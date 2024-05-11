/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SyllabusData } from 'src/models/syllabus.interface';

@Component({
  selector: 'app-edit-syllabus',
  templateUrl: './edit-syllabus.component.html',
  styleUrls: ['./edit-syllabus.component.scss'],
})
export class EditSyllabusComponent {
  @Output() updateObject = new EventEmitter<any>();
  @Input() objSyllabus: SyllabusData[] = [];
  @Input() activeButton = false;

  saveDataTemp(obj: SyllabusData) {
    this.updateObject.emit(obj);
  }
}
