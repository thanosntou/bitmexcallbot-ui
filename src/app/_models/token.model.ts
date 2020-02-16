export class TokenModel {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  timestamp: number;

  constructor(access_token: string, expires_in: number, refresh_token: string, scope: string, token_type: string, timestamp: number) {
    this.access_token = access_token;
    this.expires_in = expires_in;
    this.refresh_token = refresh_token;
    this.scope = scope;
    this.token_type = token_type;
    this.timestamp = timestamp;
  }
}
