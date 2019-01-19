export class OrderModel {
  orderID: number;
  clOrdID: number;
  symbol: string;
  side: string;
  ordStatus: string;
  ordType: string;
  price: number;
  stopPx: number;
  transactTime: string;


  constructor(orderId: number, clOrdID: number, symbol: string, side: string, ordStatus: string,
              ordType: string, price: number, stopPx: number, transactTime: string) {
    this.orderID = orderId;
    this.clOrdID = clOrdID;
    this.symbol = symbol;
    this.side = side;
    this.ordStatus = ordStatus;
    this.ordType = ordType;
    this.price = price;
    this.stopPx = stopPx;
    this.transactTime = transactTime;
  }
}
