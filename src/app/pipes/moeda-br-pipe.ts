import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaBr'
})
export class MoedaBrPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
