import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | string, firstForm: string, secondForm: string, thirdForm: string): string {
    const count: number = Number(value);
    const lastNumber: number = count % 10;
    const lastTwoNumbers: number = count % 100;

    if (lastTwoNumbers >= 11 && lastTwoNumbers <= 14) {
      return `${ count } ${ thirdForm }`;
    } else if (lastNumber >= 2 && lastNumber <= 4) {
      return `${ count } ${ secondForm }`;
    } else if (lastNumber === 1) {
      return `${ count } ${ firstForm }`;
    }

    return `${ count } ${ thirdForm }`;
  }

}
