export class UserModel {
  id: number;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  apiKey: string;
  apiSecret: string;
  fixedQtyXBTUSD: string;
  fixedQtyETHUSD: string;
  fixedQtyADAZ18: string;
  fixedQtyBCHZ18: string;
  fixedQtyEOSZ18: string;
  fixedQtyETHZ18: string;
  fixedQtyXBTJPY: string;
  fixedQtyLTCZ18: string;
  fixedQtyTRXZ18: string;
  fixedQtyXRPZ18: string;
  client: string;
  create_date: string;

  constructor(id: number, username: string, email: string, enabled: boolean, apiKey: string, apiSecret: string,
              fixedQtyXBTUSD: string, fixedQtyETHUSD: string, fixedQtyADAZ18: string, fixedQtyBCHZ18: string,
              fixedQtyEOSZ18: string, fixedQtyXBTJPY: string, fixedQtyLTCZ18: string, fixedQtyTRXZ18: string, fixedQtyXRPZ18: string,
              create_date: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.enabled = enabled;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.fixedQtyXBTUSD = fixedQtyXBTUSD;
    this.fixedQtyETHUSD = fixedQtyETHUSD;
    this.fixedQtyADAZ18 = fixedQtyADAZ18;
    this.fixedQtyBCHZ18 = fixedQtyBCHZ18;
    this.fixedQtyEOSZ18 = fixedQtyEOSZ18;
    this.fixedQtyETHZ18 = fixedQtyXBTJPY;
    this.fixedQtyXBTJPY = fixedQtyXBTJPY;
    this.fixedQtyLTCZ18 = fixedQtyLTCZ18;
    this.fixedQtyTRXZ18 = fixedQtyTRXZ18;
    this.fixedQtyXRPZ18 = fixedQtyXRPZ18;
    this.create_date = create_date;
  }
}
