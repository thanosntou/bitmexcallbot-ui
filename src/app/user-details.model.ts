import {UserModel} from './user.model';
import {AuthorityModel} from './authority.model';

export class UserDetailsModel {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  apiKey: string;
  apiSecret: string;
  fixedQtyXBTUSD: number;
  fixedQtyETHUSD: number;
  fixedQtyADAZ18: number;
  fixedQtyBCHZ18: number;
  fixedQtyEOSZ18: number;
  fixedQtyETHZ18: number;
  fixedQtyLTCZ18: number;
  fixedQtyTRXZ18: number;
  fixedQtyXRPZ18: number;
  authorities: AuthorityModel[];
}
