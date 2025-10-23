import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number, format: string): number {
    switch (format) {
      case 'h':
        return Math.floor(minutes / 60);
      case 'm':
        return minutes % 60;
      default:
        return minutes;
    }
  }
}
