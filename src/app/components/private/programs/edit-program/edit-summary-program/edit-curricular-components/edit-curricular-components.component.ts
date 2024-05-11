/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponenteCurricularType } from 'src/enums/component-curricular-type.enum';
import { IObjCurricularComponentRequest } from 'src/models/program.interface';

@Component({
  selector: 'app-edit-curricular-components',
  templateUrl: './edit-curricular-components.component.html',
  styleUrls: ['./edit-curricular-components.component.scss'],
})
export class EditCurricularComponentsComponent implements OnInit {
  componenteCurricularType = ComponenteCurricularType;
  @Input() objCurricularComponents: IObjCurricularComponentRequest[] = [];
  @Output() updateObject = new EventEmitter<any>();

  activeView = false;

  html: string[] = new Array(5).fill('');

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.objCurricularComponents);

      this.html[0] =
        this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.EPISTEMOLOGICO,
        )?.componentCurricular || '';
      console.log(
        this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.EPISTEMOLOGICO,
        )?.componentCurricular || '',
      );
      this.html[1] =
        this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.PEDAGOGICO,
        )?.componentCurricular || '';
      this.html[2] =
        this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.FORMATIVO,
        )?.componentCurricular || '';
      this.html[3] =
        this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.INTERACCION,
        )?.componentCurricular || '';
      this.html[4] =
        this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.EVALUACION,
        )?.componentCurricular || '';
      this.activeView = true;
    }, 1000);
  }

  createHtml($event: string, index: number) {
    this.html[index] = $event;
    let componente;
    switch (index) {
      case 0:
        componente = this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.EPISTEMOLOGICO,
        );
        break;
      case 1:
        componente = this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.PEDAGOGICO,
        );
        break;
      case 2:
        componente = this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.FORMATIVO,
        );
        break;
      case 3:
        componente = this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.INTERACCION,
        );
        break;
      case 4:
        componente = this.objCurricularComponents.find(
          (obj) => obj.componentType === this.componenteCurricularType.EVALUACION,
        );
        break;
    }

    if (componente) {
      componente.componentCurricular = $event;
    }
    this.updateObject.emit(this.objCurricularComponents);
  }
}
