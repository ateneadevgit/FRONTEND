/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { EventService } from 'src/app/services/event/event.service';
import { UtilsService } from 'src/app/services/helpers/utils.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { IDocentTypeEnum, IEventTypeEnum } from 'src/enums/catalogs-items.enums';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
import { IEvenGeneral, IEventList, Program } from 'src/models/program.interface';
import { lastValueFrom } from 'rxjs';
import { FormMessage } from 'src/enums/form-menssage.enums';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  @Output() succesCreate = new EventEmitter();
  @Input() editEvent?: IEventList;

  eventTypes: CatalogsByIdResponse[] = [];
  docentEvents: CatalogsByIdResponse[] = [];
  repetTypes: CatalogsByIdResponse[] = [];
  faculties: CatalogsByIdResponse[] = [];
  programs: Program[] = [];

  eventTypeEnum = IEventTypeEnum;
  docentTypeEnum = IDocentTypeEnum;

  formCreateEvent: FormGroup = new FormGroup({
    eventType: new FormControl('', [Validators.required]),
    facultyId: new FormControl(''),
    program: new FormControl(''),
    docentOpt: new FormControl(''),
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
    private utilsService: UtilsService,
    private eventService: EventService,
  ) {}

  get formControls() {
    return this.formCreateEvent.controls;
  }

  async ngOnInit() {
    await this.loadEvents();
    await this.loadRepets();
    await this.loadFaculties();
    await this.loadTeachingEvent();

    if (this.editEvent) {
      this.eventTypes = (
        await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.EVENT_TYPE))
      ).data;

      if (
        this.editEvent?.meta?.eventType !== this.eventTypeEnum.PERSONAL &&
        this.editEvent?.meta?.eventType != this.eventTypeEnum.MOODLE
      ) {
        this.eventTypes = this.eventTypes.filter(
          (item) =>
            item.catalogItemId !== this.eventTypeEnum.PERSONAL &&
            item.catalogItemId !== this.eventTypeEnum.MOODLE,
        );
      }

      if (this.editEvent?.meta.facultyId) {
        this.programs = (
          await lastValueFrom(
            this.programsService.getProgramsByFacultyId(this.editEvent?.meta.facultyId),
          )
        ).data;
      }
      this.loadEdit();
    }
  }

  loadEdit() {
    if (this.editEvent?.meta?.eventType === this.eventTypeEnum.PERSONAL) {
      this.formControls['eventType']?.clearValidators();
      this.formControls['eventType']?.setValidators([]);
    }

    this.formControls['eventType'].setValue(
      this.eventTypes.find((item) => item.catalogItemId === this.editEvent?.meta?.eventType),
    );

    this.formControls['tittle'].setValue(this.editEvent?.tittle);

    const startDateObj = this.editEvent?.start ? new Date(Date.parse(this.editEvent?.start)) : null;
    this.formControls['startDate'].setValue(startDateObj);

    const endDateObj = this.editEvent?.end ? new Date(Date.parse(this.editEvent?.end)) : null;
    this.formControls['endDate'].setValue(endDateObj);

    this.formControls['repetition'].setValue(
      this.repetTypes.find((item) => item.catalogItemId === this.editEvent?.meta?.repetition),
    );

    const startHour = this.formatHours(this.editEvent?.meta?.startHour);
    const endHour = this.formatHours(this.editEvent?.meta?.endHour);

    this.formControls['startHour'].setValue(startHour);
    this.formControls['endHour'].setValue(endHour);

    this.formControls['feedback'].setValue(this.editEvent?.meta?.feedback);
    this.formControls['eventUrl'].setValue(this.editEvent?.meta?.eventUrl);

    if (this.editEvent?.meta?.programId) {
      const faculty = this.faculties.find(
        (item) => item.catalogItemId === this.editEvent?.meta?.facultyId,
      );
      this.formControls['facultyId'].setValue(faculty);
      this.formControls['facultyId']?.setValidators([Validators.required]);

      const program = this.programs.find(
        (item) => item.idProgram === this.editEvent?.meta?.programId,
      );
      this.formControls['program'].setValue(program);
      this.formControls['program']?.setValidators([Validators.required]);
    }

    if (this.editEvent?.meta?.facultyId) {
      const faculty = this.faculties.find(
        (item) => item.catalogItemId === this.editEvent?.meta?.facultyId,
      );
      this.formControls['facultyId'].setValue(faculty);
      this.formControls['facultyId']?.setValidators([Validators.required]);
    }

    this.formCreateEvent.updateValueAndValidity();
    this.formControls['eventType']?.updateValueAndValidity();
    this.formControls['program']?.updateValueAndValidity();
    this.formControls['facultyId']?.updateValueAndValidity();
  }

  loadEvents() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.EVENT_TYPE).subscribe((response) => {
      const { data } = response;
      this.eventTypes = data.filter(
        (item) =>
          item.catalogItemId !== this.eventTypeEnum.PERSONAL &&
          item.catalogItemId !== this.eventTypeEnum.MOODLE,
      );
    });
  }

  loadEventsEdit() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.EVENT_TYPE).subscribe((response) => {
      const { data } = response;
      this.eventTypes = data.filter(
        (item) =>
          item.catalogItemId !== this.eventTypeEnum.PERSONAL &&
          item.catalogItemId !== this.eventTypeEnum.MOODLE,
      );
    });
  }

  async loadRepets() {
    this.repetTypes = (
      await lastValueFrom(this.catalogsService.getAllCatalogsByid(CatalogsEnum.REPET_TYPE))
    ).data;
  }

  getNameEventType(evenTypeId?: number) {
    const eventType = this.eventTypes.find((item) => item.catalogItemId === evenTypeId);
    if (!eventType) return '--';
    return eventType.catalogItemName;
  }

  loadTeachingEvent() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.TEACHING_EVENT).subscribe((response) => {
      const { data } = response;
      this.docentEvents = data;
    });
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
    });
  }

  loadProgramByFaculty() {
    if (this.isRequiredField('program')) {
      const facultyId = this.formControls['facultyId'].value;
      if (facultyId) {
        this.programsService
          .getProgramsByFacultyId(facultyId?.catalogItemId ?? 0)
          .subscribe((response) => {
            const { data } = response;
            this.programs = data;
          });
      }
    }
  }

  changeEventType() {
    this.formControls['program'].setValue(null);
    this.formControls['facultyId'].setValue(null);
    this.formControls['docentOpt'].setValue(null);
    this.formControls['program'].clearValidators();
    this.formControls['facultyId'].clearValidators();
    this.formControls['docentOpt'].clearValidators();
    this.formControls['program']?.setValidators([]);
    this.formControls['facultyId']?.setValidators([]);
    this.formControls['docentOpt']?.setValidators([]);

    const eventType = this.formControls['eventType'].value;

    if (eventType?.catalogItemId === this.eventTypeEnum.FACULTY) {
      this.formControls['facultyId']?.setValidators([Validators.required]);
    }

    if (eventType?.catalogItemId === this.eventTypeEnum.PROGRAM) {
      this.programs = [];
      this.formControls['facultyId']?.setValidators([Validators.required]);
      this.formControls['program']?.setValidators([Validators.required]);
    }

    if (eventType?.catalogItemId === this.eventTypeEnum.DOCENT) {
      this.formControls['docentOpt']?.setValidators([Validators.required]);
    }

    this.formCreateEvent.updateValueAndValidity();
    this.formCreateEvent.updateValueAndValidity();
    this.formControls['eventType']?.updateValueAndValidity();
    this.formControls['program']?.updateValueAndValidity();
    this.formControls['facultyId']?.updateValueAndValidity();
    this.formControls['docentOpt']?.updateValueAndValidity();
  }

  changeDocentOpt() {
    this.formControls['program'].setValue(null);
    this.formControls['facultyId'].setValue(null);
    this.formControls['program'].clearValidators();
    this.formControls['facultyId'].clearValidators();

    const eventType = this.formControls['docentOpt'].value;

    if (eventType?.catalogItemId === this.docentTypeEnum.BY_PROGRAM) {
      this.programs = [];
      this.formControls['facultyId']?.setValidators([Validators.required]);
      this.formControls['program']?.setValidators([Validators.required]);
    }

    if (eventType?.catalogItemId === this.docentTypeEnum.BY_FACULTY) {
      this.programs = [];
      this.formControls['facultyId']?.setValidators([Validators.required]);
    }

    this.formCreateEvent.updateValueAndValidity();
    this.formControls['eventType']?.updateValueAndValidity();
    this.formControls['program']?.updateValueAndValidity();
    this.formControls['facultyId']?.updateValueAndValidity();
  }

  isRequiredField(field: string) {
    const form_field = this.formControls[field];
    if (!form_field.validator) {
      return false;
    }

    const validator = form_field.validator({} as AbstractControl);
    return validator && validator['required'];
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
      eventType: this.formControls['eventType'].value?.catalogItemId,
      eventUrl: this.formControls['eventUrl'].value,
      facultyId: this.isRequiredField('facultyId')
        ? this.formControls['facultyId'].value?.catalogItemId
        : null,
      feedback: this.formControls['feedback'].value,
      isAllDay: false,
      programId: this.isRequiredField('program')
        ? this.formControls['program'].value?.idProgram
        : null,
      repetition: this.formControls['repetition'].value?.catalogItemId,
      roleId: null,
      startDate: startDate,
      startHour: this.getHours(startHour),
      tittle: this.formControls['tittle'].value,
      userId: null,
    };

    this.eventService.createEventGeneral(newEvent).subscribe({
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

  updateEvent() {
    if (this.formCreateEvent.invalid) {
      this.formCreateEvent.markAllAsTouched();
      this.alertService.showErrorMessage({
        title: FormMessage.TITTLE,
        message: FormMessage.MESSAGE,
      });
      return;
    }

    const isPerson =
      this.formControls['eventType'].value?.catalogItemId === this.eventTypeEnum.PERSONAL
        ? true
        : false;

    const startDate = this.transformDateyyyymmddhh(this.formControls['startDate'].value ?? '');
    const endDate = this.transformDateyyyymmddhh(this.formControls['endDate'].value ?? '');

    const endHour = this.formControls['endHour'].value as Date;
    const startHour = this.formControls['startHour'].value as Date;
    const newEvent: IEvenGeneral = {
      createdBy: null,
      endDate: endDate,
      endHour: this.getHours(endHour),
      eventType: this.formControls['eventType'].value?.catalogItemId,
      eventUrl: this.formControls['eventUrl'].value,
      facultyId: this.isRequiredField('facultyId')
        ? this.formControls['facultyId'].value?.catalogItemId
        : null,
      feedback: this.formControls['feedback'].value,
      isAllDay: this.editEvent?.allDay || false,
      programId: this.isRequiredField('program')
        ? this.formControls['program'].value?.idProgram
        : null,
      repetition: this.formControls['repetition'].value?.catalogItemId,
      roleId: null,
      startDate: startDate,
      startHour: this.getHours(startHour),
      tittle: this.formControls['tittle'].value,
      userId: null,
    };

    this.eventService
      .updateEvent(this.editEvent?.meta?.eventId ?? 0, newEvent, isPerson)
      .subscribe({
        next: () => {
          this.alertService.showSuccessMessage({
            message: 'Acción realiza con éxito',
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

  formatHours(hours?: string) {
    try {
      hours = hours || '00:00:00';
      const date = new Date();
      date.setHours(Number(hours.split(':')[0]));
      date.setMinutes(Number(hours.split(':')[1]));
      date.setSeconds(Number(hours.split(':')[2]));
      return date;
    } catch (error) {
      return undefined;
    }
  }

  formatDateddMMYYYY(fecha?: string) {
    try {
      if (!fecha) {
        return undefined;
      }
      const date = fecha.split('-');
      const year = date[0];
      const month = date[1];
      const day = date[2];
      return `${day}-${month}-${year}`;
    } catch (error) {
      return undefined;
    }
  }

  transformDateyyyymmddhh(date: string) {
    const fechaDesdeHTML = new Date(date);
    const year = fechaDesdeHTML.getFullYear();
    const month = ('0' + (fechaDesdeHTML.getMonth() + 1)).slice(-2);
    const day = ('0' + fechaDesdeHTML.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getHours(date: Date) {
    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hour}:${minutes}:${seconds}.000`;
  }
}
