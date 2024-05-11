import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateCalendarDashboard extends CalendarDateFormatter {
  public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    const formattedDate = formatDate(date, 'EEE', locale ?? 'es');
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  public override weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    const formattedDate = formatDate(date, 'EEE', locale ?? 'es');
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
}
