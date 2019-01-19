import {UserModel} from './user.model';
import {AuthorityModel} from './authority.model';

export class UserDetailsModel {
  id: number;
  username: string;
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
  fixedQtyLTCZ18: string;
  fixedQtyTRXZ18: string;
  fixedQtyXRPZ18: string;
  authorities: AuthorityModel[];
}
