import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderModule } from 'src/models/header-module.interface';

@Component({
  selector: 'app-header-module',
  templateUrl: './header-module.component.html',
  styleUrls: ['./header-module.component.scss'],
})
export class HeaderModuleComponent {
  @Input() header?: HeaderModule;
  @Output() propagateEvent = new EventEmitter<boolean>();

  onProagate() {
    this.propagateEvent.emit(true);
  }
}
