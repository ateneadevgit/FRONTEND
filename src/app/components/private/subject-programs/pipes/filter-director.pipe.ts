/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDirector',
})
export class FilterDirectorPipe2 implements PipeTransform {
  transform(value: any, args: string): any {
    return value
      ? value.filter((item: any) => item?.userEmail.toLowerCase().includes(args.toLowerCase()))
      : value;
  }
}
