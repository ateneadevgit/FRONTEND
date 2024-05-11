/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { EventService } from 'src/app/services/event/event.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { IEventTypeEnum } from 'src/enums/catalogs-items.enums';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { FormMessage } from 'src/enums/form-menssage.enums';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { IEvenGeneral } from 'src/models/program.interface';

@Component({
  selector: 'app-create-event-person',
  templateUrl: './create-event-person.component.html',
  styleUrls: ['./create-event-person.component.scss'],
})
export class CreateEventPersonComponent implements OnInit {
  @Output() succesCreate = new EventEmitter();
  repetTypes: CatalogsByIdResponse[] = [];

  eventTypeEnum = IEventTypeEnum;

  formCreateEvent: FormGroup = new FormGroup({
    tittle: new FormControl('', [Validators.required]),
    repetition: new FormControl('', [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    startHour: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    endHour: new FormControl(null, [Validators.required]),
    eventUrl: new FormControl(null, [Validators.required]),
    feedback: new FormControl(null, [Validators.required]),
  });

  constructor(
    private catalogsService: CatalogsService,
    private programsService: ProgramsService,
    private alertService: AlertService,
    private eventService: EventService,
    private utilsService: UtilsService,
  ) {}

  get formControls() {
    return this.formCreateEvent.controls;
  }

  async ngOnInit() {
    await this.loadRepets();
  }

  loadRepets() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.REPET_TYPE).subscribe((response) => {
      const { data } = response;
      this.repetTypes = data;
    });
  }

  sendEvent() {
    if (this.formCreateEvent.invalid) {
      this.formCreateEvent.markAllAsTouched();
      this.alertService.showErrorMessage({
        title: FormMessage.TITTLE,
        message: FormMessage.MESSAGE,
      });
      return;
    }

    const startDate = this.utilsService.transformDateyyyymmddhh(
      this.formControls['startDate'].value ?? '',
    );
    const endDate = this.utilsService.transformDateyyyymmddhh(
      this.formControls['endDate'].value ?? '',
    );

    const endHour = this.formControls['endHour'].value as Date;
    const startHour = this.formControls['startHour'].value as Date;

    const newEvent: IEvenGeneral = {
      createdBy: null,
      endDate: endDate,
      endHour: this.getHours(endHour),
      eventType: this.eventTypeEnum.PERSONAL, //Tipo de evento personal
      eventUrl: this.formControls['eventUrl'].value,
      facultyId: null,
      feedback: this.formControls['feedback'].value,
      isAllDay: false,
      programId: null,
      repetition: this.formControls['repetition'].value?.catalogItemId,
      roleId: null,
      startDate: startDate,
      startHour: this.getHours(startHour),
      tittle: this.formControls['tittle'].value,
      userId: null,
    };

    this.eventService.createEventPersonal(newEvent).subscribe({
      next: () => {
        this.alertService.showSuccessMessage({
          message: 'Acción realizada con éxito',
        });
        this.succesCreate.emit();
      },
      error: () => {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: 'Inténtalo nuevamente',
        });
      },
    });
  }

  formatDate(fecha: string) {
    try {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    } catch (error) {
      return undefined;
    }
  }

  getHours(date: Date) {
    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hour}:${minutes}:${seconds}.000`;
  }
}
