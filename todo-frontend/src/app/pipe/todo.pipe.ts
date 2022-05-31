import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoStatusPipe'
})
export class todoStatusPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\_/g, " ");
  }

}