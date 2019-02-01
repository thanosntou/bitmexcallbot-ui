export class AccessTokenModel {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;

  constructor(access_token: string, token_type: string, refresh_token: string, expires_in: number, scope: string) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.refresh_token = refresh_token;
    this.expires_in = expires_in;
    this.scope = scope;
  }
}
