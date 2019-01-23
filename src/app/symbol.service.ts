import { Injectable } from '@angular/core';
import {Symbol} from './Symbol.enum';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {
  symbolGlobal: string;
  symbolList: string[] = [];

  constructor() {
    this.symbolGlobal = Symbol.XBTUSD.valueOf();
    this.symbolList.push(Symbol.XBTUSD.valueOf());
    this.symbolList.push(Symbol.ETHUSD.valueOf());
    this.symbolList.push(Symbol.ADAXXX.valueOf());
    this.symbolList.push(Symbol.BCHXXX.valueOf());
    this.symbolList.push(Symbol.EOSXXX.valueOf());
    this.symbolList.push(Symbol.ETHXXX.valueOf());
    this.symbolList.push(Symbol.LTCXXX.valueOf());
    this.symbolList.push(Symbol.TRXXXX.valueOf());
    this.symbolList.push(Symbol.XRPXXX.valueOf());
  }
}
