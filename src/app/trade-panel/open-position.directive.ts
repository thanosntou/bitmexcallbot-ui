import {Directive, ElementRef, Renderer2, OnInit, HostBinding, Input} from '@angular/core';
import {SymbolService} from '../symbol.service';

@Directive({
  selector: '[appOpenPosition]'
})
export class OpenPositionDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  @Input() symbol: string;
  webSocket: WebSocket;
  markPrice: number;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private symbolService: SymbolService) {

    // const symbol = '';
    // const exampleSocket = new WebSocket('wss://testnet.bitmex.com/realtime');
    // exampleSocket.onopen = function (symbol) {
    //   exampleSocket.send(
    //     '{"op": "authKeyExpires", "args": ["obt_f-85F7m2Olfi9IIUUlTG", ' +
    //     '1600883067, ' +
    //     '"71c2f5ff56dc905bb9ada3b6f20b950b19b7c30716e9af2160a3e27c78d1b2ee"]}');
    //   // exampleSocket.send('{"op": "subscribe", "args": ["position"]}');
    //   exampleSocket.send('{"op": "subscribe", "args": ["position:' + symbol + '"]}');
    //   exampleSocket.send('{"op": "subscribe", "args": ["position:ADAH19"]}');
    // };
    // this.webSocket = exampleSocket;
    // this.webSocket.onmessage = event => {
    //   const msg = JSON.parse(event.data);
    //   this.markPrice = msg.data['0'].markPrice;
    //   this.elementRef.nativeElement.value = msg.data['0'].markPrice;
      //   $(function () {
      //     $('#markPriceTdXBTUSD').delay(150).animate({
      //       'background-color': '#ffeb79'
      //     }, 350, function () {
      //       $('#markPriceTdXBTUSD').animate({
      //         'background-color': '#fff'
      //       }, 200);
      //     });
      //   });
      //   console.log(msg.data['0']);
    // };
  }

  ngOnInit() {
    // Better, use BostBinding for best and easier
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.symbol === 'XBTUSD' ? 'blue' : 'yellow');
    // this.elementRef.nativeElement.style.backgroundColor = 'Green'; //Bad

    // this.symbolService.symbolList.forEach(symbol => {
    // });
  }

  // @HostListener('mouseenter') mouseover(eventData: Event) {
  //   this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightBlue');
  // }
  //
  // @HostListener('mouseleave') mouseleave(eventData: Event) {
  //   this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  // }


}
