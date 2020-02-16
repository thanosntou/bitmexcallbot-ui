import {TenantModel} from './tenant.model';

export interface UserModel {
  id: number;
  tenant: TenantModel;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  apiKey: string;
  apiSecret: string;
  client: string;
  createdOn: string;
  authorities: string[];
}
