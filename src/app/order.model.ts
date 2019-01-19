export class OrderModel {
  orderId: number;
  symbol: string;
  side: string;
  ordStatus: string;
  ordType: string;
  price: number;
  stopPx: number;
  transactTime: string;


  constructor(orderId: number, symbol: string, side: string, ordStatus: string,
              ordType: string, price: number, stopPx: number, transactTime: string) {
    this.orderId = orderId;
    this.symbol = symbol;
    this.side = side;
    this.ordStatus = ordStatus;
    this.ordType = ordType;
    this.price = price;
    this.stopPx = stopPx;
    this.transactTime = transactTime;
  }
}
