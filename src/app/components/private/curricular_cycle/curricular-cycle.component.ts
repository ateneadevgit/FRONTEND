import { Component } from '@angular/core';
import { RoutesApp } from 'src/enums/routes.enum';

@Component({
  selector: 'app-curricular-cycle',
  templateUrl: './curricular-cycle.component.html',
  styleUrls: ['./curricular-cycle.component.scss'],
})
export class CurricularCycleComponent {
  routerApp = RoutesApp;
}
