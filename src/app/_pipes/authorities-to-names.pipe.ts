import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authoritiesToNames'
})
export class AuthoritiesToNamesPipe implements PipeTransform {

  transform(authorities: string[]): any {
    if (authorities && authorities.length > 0) {
      console.log('inside pipe');
      return authorities.reduce((accumulator, currentValue) => accumulator + ', ' + currentValue);
    } else {
      return null;
    }

  }

}
