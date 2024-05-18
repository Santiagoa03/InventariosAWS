import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absNoSign'
})
export class AbsNoSignPipe implements PipeTransform {

  transform(value: number): number {
    return value < 0 ? -value : value;
  }

}
