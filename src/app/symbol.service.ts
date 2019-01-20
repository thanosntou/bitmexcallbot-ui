import { Injectable } from '@angular/core';
import {Symbol} from './Symbol.enum';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {
  symbolGlobal: string;

  constructor() {
    this.symbolGlobal = Symbol.XBTUSD.valueOf();
  }
}
