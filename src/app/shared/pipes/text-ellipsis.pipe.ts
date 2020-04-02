import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textEllipsis'
})
export class TextEllipsisPipe implements PipeTransform {

  transform(value: string, length: number): string {
    return value.length > length ? `${value.slice(0, length)}...` : value;
  }

}
