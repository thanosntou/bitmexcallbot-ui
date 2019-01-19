import { Component, OnInit } from '@angular/core';
import {faSortAlphaDown, faSortAmountDown} from '@fortawesome/free-solid-svg-icons';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TxModel} from '../tx.model';
import {AuthenticationService} from '../authentication.service';
import {BaseUrl} from '../BaseUrl.enum';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent implements OnInit {
  tx: TxModel[];
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;

  constructor(private http: HttpClient, public authService: AuthenticationService) { }

  ngOnInit() {
    const bearerToken = this.authService.accessToken.token_type + ' ' + this.authService.accessToken.access_token;
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

    this.http.get<TxModel[]>(BaseUrl.BASEURL + '/api/v1/user/tx', httpOptions)
      .subscribe((data: TxModel[]) => this.tx = data.reverse());
  }

}
