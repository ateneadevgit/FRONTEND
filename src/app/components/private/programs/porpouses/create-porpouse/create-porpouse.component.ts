import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-create-porpouse',
  templateUrl: './create-porpouse.component.html',
  styleUrls: ['./create-porpouse.component.scss'],
  providers: [MessageService],
})
export class CreatePorpouseComponent {
  @Output() succesCreateProgram = new EventEmitter<boolean>();
  @Output() typeProgramEmit = new EventEmitter<string>();
  typeProgram?: string = '';
  croppedImageLogo: unknown = '';
  visibleLogoModal = false;

  croppedImagePortada: unknown = '';
  visiblePortadaModal = false;

  groupedCities!: SelectItemGroup[];
  selectedCity: string | undefined;

  constructor(private messageService: MessageService) {}

  imageUrlLogo($event: unknown) {
    this.visibleLogoModal = false;
    this.croppedImageLogo = $event;
  }

  imageUrlPortada($event: unknown) {
    this.visiblePortadaModal = false;
    this.croppedImagePortada = $event;
  }

  succesCreate() {
    this.succesCreateProgram.emit(false);
  }

  typesProgramEmit(type: string) {
    this.typeProgramEmit.emit(type);
  }
}
