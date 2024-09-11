import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'assetsImage'
})
export class AssetsImagePipe implements PipeTransform {
  transform(value: string): string {
    return './assets/' + value;
  }
}
