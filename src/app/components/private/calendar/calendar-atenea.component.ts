/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth, format } from 'date-fns';
import { Observable, Subject, of } from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { IEventList, IFilterEvent, Program } from 'src/models/program.interface';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { CatalogsByIdResponse, ICatalogItem } from 'src/models/catalogs.interface';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { EventService } from 'src/app/services/event/event.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/message/alert.service';
import { IEventTypeEnum } from 'src/enums/catalogs-items.enums';
import { LoginService } from 'src/app/services/login/login.service';
import { map } from 'rxjs/operators';
import { Role } from 'src/enums/role.enum';
import { CustomDateCalendarAtenea } from './custom-date-calendar-atenea.provider';

registerLocaleData(localeEs);

@Component({
  selector: 'app-calendar-atenea',
  templateUrl: './calendar-atenea.component.html',
  styleUrls: ['./calendar-atenea.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateCalendarAtenea,
    },
  ],
})
export class CalendarAteneaComponent implements OnInit {
  programs: Program[] = [];
  programsAllList: Program[] = [];
  faculties: CatalogsByIdResponse[] = [];
  eventTypes: ICatalogItem[] = [];
  selectProgram?: any;
  selectFaculty?: any;
  role = 0;

  editEvent?: IEventList;
  eventTypeEnum = IEventTypeEnum;
  yearNow = new Date().getFullYear();

  filterEvent: IFilterEvent = {
    createdBy: null,
    endDate: '',
    facultyId: null,
    filter: {
      facultyId: null,
      programId: null,
      types: [],
    },
    programId: null,
    roleId: null,
    startDate: '',
  };

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  endDate: Date = new Date();
  viewDay: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  localLenguaje = localeEs[0];
  eventModal = [
    {
      id: 1,
      name: 'Evento',
    },
    {
      id: 2,
      name: 'Evento personal',
    },
  ];

  colors = {
    gris: {
      primary: '#98A094',
      secondary: '#216c5c',
      class: 'bg-institucional',
    },
    verde: {
      primary: '#469D1E',
      secondary: '#216c5c',
      class: 'bg-faculty',
    },
    red: {
      primary: '#ad2121',
      secondary: '#216c5c',
      class: 'bg-program',
    },
    blue: {
      primary: '#16395F',
      secondary: '#216c5c',
      class: 'bg-docent',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#216c5c',
      class: 'bg-personal',
    },
    redWine: {
      primary: '#09B0D0',
      secondary: '#216c5c',
      class: 'bg-moodle',
    },
    black: {
      primary: '#000000',
      secondary: '#216c5c',
      class: 'bg-default',
    },
  };

  selectModalOpt?: any;
  visibleModalEvento = false;
  visibleViewEvento = false;
  visibleEditEvent = false;

  modalData?: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  events$: Observable<CalendarEvent[]> = of([]);
  activeDayIsOpen = false;

  constructor(
    private catalogsService: CatalogsService,
    private programsService: ProgramsService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private loginService: LoginService,
  ) {}

  async ngOnInit() {
    this.getRole();
    await this.loadEventTypes();
    this.loadFaculties();
    this.loadPrograms();
    setTimeout(() => {
      this.loadGetEvents();
    }, 1000);
  }

  getRole() {
    this.role = this.loginService.getRole();
    if (this.role != Role.VICERRECTOR) {
      this.eventModal = this.eventModal.filter((item) => item.id != 1);
    }
  }

  toUpperCase(date: string) {
    return `${date.charAt(0).toUpperCase() + date.slice(1)}`;
  }

  getFormatHour(hour: string) {
    const fecha = new Date();
    const splitHour = hour.split(':');
    fecha.setHours(Number(splitHour[0]));
    fecha.setMinutes(Number(splitHour[1]));
    const hourFormat = format(fecha, 'h:mm a');
    return hourFormat;
  }

  loadEventType() {
    setTimeout(() => {
      this.loadGetEvents();
    }, 200);
  }

  getfirstDate(fecha: Date) {
    const date = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getLastDate(fecha: Date) {
    const date = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getColorByEventTypeId(evenType: number) {
    if (evenType == this.eventTypeEnum.INSTITUCIONAL) {
      return { ...this.colors.gris };
    }

    if (evenType == this.eventTypeEnum.FACULTY) {
      return { ...this.colors.verde };
    }

    if (evenType == this.eventTypeEnum.PROGRAM) {
      return { ...this.colors.red };
    }

    if (evenType == this.eventTypeEnum.DOCENT) {
      return { ...this.colors.blue };
    }

    if (evenType == this.eventTypeEnum.PERSONAL) {
      return { ...this.colors.redWine };
    }

    if (evenType == this.eventTypeEnum.MOODLE) {
      return { ...this.colors.yellow };
    }

    return { ...this.colors.black };
  }

  loadGetEvents() {
    this.filterEvent.startDate = this.getfirstDate(this.viewDate);
    this.filterEvent.endDate = this.getLastDate(this.viewDate);
    this.filterEvent.filter.facultyId = this.selectFaculty
      ? this.selectFaculty?.catalogItemId
      : null;

    this.filterEvent.filter.programId = this.selectProgram ? this.selectProgram?.idProgram : null;

    this.filterEvent.filter.types = this.eventTypes
      .filter((item) => item.value === true)
      .map((item) => {
        return item.catalogItemId;
      });

    this.activeDayIsOpen = false;

    this.events$ = this.eventService.getEvents(this.filterEvent).pipe(
      map(({ data }: { data: IEventList[] }) => {
        return data.map((iEvent: IEventList) => {
          iEvent.meta.eventType = iEvent.meta.isPersonal
            ? this.eventTypeEnum.PERSONAL
            : iEvent.meta.eventType;

          const startDate = this.getTimezoneOffsetString2(
            iEvent.meta.startDate,
            iEvent.meta.startHour,
            this.viewDate,
          );
          const endDate = this.getTimezoneOffsetString2(
            iEvent.meta.endDate,
            iEvent.meta.endHour,
            this.viewDate,
          );

          const calendar: CalendarEvent = {
            start: new Date(Date.parse(startDate)),
            end: new Date(Date.parse(endDate)),
            title: iEvent.tittle,
            color: this.getColorByEventTypeId(iEvent.meta.eventType ?? 0),
            allDay: iEvent.allDay,
            meta: iEvent.meta,
          };
          return calendar;
        });
      }),
    );
  }

  getTimezoneOffsetString2(dateEvent: string, hourEvent: string, cuerrentDate: Date): string {
    const timezoneOffset = cuerrentDate.getTimezoneOffset();
    const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';

    return `${dateEvent}T${hourEvent}${direction}${hoursOffset}:${minutesOffset}`;
  }

  getTimezoneOffsetString(dateText: string) {
    const splitDate = dateText.split('-');
    const splitHour = dateText.split(':');
    const dateR = new Date();
    //const date = new Date();

    dateR.setFullYear(Number(splitDate[0].toString()));
    dateR.setUTCMonth(Number(splitDate[1].toString()));
    dateR.setDate(Number(splitDate[2].split('T')[0].toString()));

    dateR.setUTCHours(Number(splitHour[1].toString()));
    dateR.setMinutes(Number(splitHour[2].split('.')[0].toString()));
    dateR.setSeconds(Number(splitHour[2].split('.')[0].split('T')[0].toString()));

    //return dateR;
    //const timezoneOffset = date.getTimezoneOffset();
    //const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
    //const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    //const direction = timezoneOffset > 0 ? '-' : '+';
    // const stringDate = `${dateR.getUTCFullYear()}-${dateR.getMonth()}-${dateR.getDate()}T${dateR.getHours()}:${dateR.getMinutes()}:00.732Z`;
    return new Date();
  }

  loadFaculties() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.FACULTIES).subscribe((response) => {
      const { data } = response;
      this.faculties = data;
    });
  }

  loadEventTypes() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.EVENT_TYPE).subscribe((response) => {
      const { data } = response;
      this.eventTypes = data.map((item) => {
        return {
          ...item,
          value: true,
        };
      });
    });
  }

  getNameEventType(evenTypeId?: number) {
    const eventType = this.eventTypes.find((item) => item.catalogItemId === evenTypeId);
    if (!eventType) return '--';
    return eventType.catalogItemName;
  }

  getNameFaculty(facultyId?: number) {
    const faculty = this.faculties.find((item) => item.catalogItemId === facultyId);
    if (!faculty) return '--';
    return faculty.catalogItemName;
  }

  loadPrograms() {
    this.programsService.getPrograms().subscribe((response) => {
      const { data } = response;
      this.programsAllList = data;
    });
  }

  getNameProgramById(idProgram?: number) {
    const program = this.programsAllList.find((item) => item.idProgram === idProgram);
    if (!program) return '--';
    return program.name;
  }

  loadProgramByFaculty() {
    this.programs = [];
    this.selectProgram = undefined;
    if (this.selectFaculty) {
      this.programsService
        .getProgramsByFacultyId(this.selectFaculty?.catalogItemId ?? 0)
        .subscribe((response) => {
          const { data } = response;
          this.programs = data;
        });
    }
    this.loadGetEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.visibleViewEvento = true;
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openModalEvent() {
    this.visibleModalEvento = true;
  }

  closeModalEvent() {
    this.selectModalOpt = undefined;
    this.visibleModalEvento = false;
  }

  closeModalEventCreate() {
    this.selectModalOpt = undefined;
    this.visibleModalEvento = false;
    this.loadGetEvents();
  }

  closeViewEvent() {
    this.visibleViewEvento = false;
  }

  resetEventTypes() {
    this.eventTypes = this.eventTypes.map((item) => {
      return {
        ...item,
        value: true,
      };
    });
    this.loadGetEvents();
  }

  deleteEventItem(item: any) {
    this.confirmationService.confirm({
      key: 'confirm-dialog',
      message: '¿Esta seguro de eliminar el evento?',
      header: 'Eliminar evento',
      accept: () => {
        this.eventService.deleteEvent(item?.meta?.eventId ?? 0, item?.meta?.isPersonal).subscribe({
          next: () => {
            this.alertService.showSuccessMessage({
              message: 'Evento eliminado con éxito',
            });
            this.closeViewEvent();
            this.loadGetEvents();
          },
          error: () => {
            this.alertService.showErrorMessage({
              title: 'Error',
              message: 'Inténtalo nuevamente',
            });
          },
        });
      },
    });
  }

  updateEventItem(item: any) {
    this.visibleViewEvento = false;
    this.editEvent = { ...item };
    this.visibleEditEvent = true;
    if (this.editEvent) {
      this.editEvent.tittle = item.title;
    }
  }

  closeUpdateEvent() {
    this.visibleEditEvent = false;
    this.editEvent = undefined;
  }

  closeSuccessUpdateEvent() {
    this.visibleEditEvent = false;
    this.editEvent = undefined;
    this.loadGetEvents();
  }

  getDateName(dateStr?: string) {
    const date = dateStr ? new Date(dateStr) : new Date();
    const opciones: Intl.DateTimeFormatOptions = { month: 'long' };
    const formatoFecha: string = date.toLocaleDateString('es-ES', opciones);
    return `${formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1)} ${
      date.getDate() + 1
    } de ${date.getFullYear()}`;
  }

  openLink(urlLink: string) {
    window.open(urlLink, '_blank');
  }
}
