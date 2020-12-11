import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as OldDatePipe } from '@angular/common';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

@Pipe({
  name: 'date'
})
export class DatePipe extends OldDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(args && args === 'time') {
      return dayjs(new Date(`1970-01-01T${value}`)).format('HH:mm');
    }

    if(args && args === 'fromNow') {
      return dayjs(new Date(value)).fromNow();
    }

    if(args && args === 'fromNowOnly') {
      return dayjs(new Date(value)).fromNow(true);
    }

    return super.transform(value, args);
  }

}
