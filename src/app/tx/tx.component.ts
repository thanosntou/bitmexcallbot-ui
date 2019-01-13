import { Component, OnInit } from '@angular/core';
import {faSortAlphaDown, faSortAmountDown} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {TxModel} from '../tx.model';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent implements OnInit {
  tx: TxModel[];
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;
  baseUrl = 'http://localhost:8082/BioUnion';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<TxModel[]>(this.baseUrl + '/api/v1/user/tx')
      .subscribe((data: TxModel[]) => this.tx = data.reverse());
  }

}
