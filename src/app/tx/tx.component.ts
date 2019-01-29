import { Component, OnInit } from '@angular/core';
import {faSortAlphaDown, faSortAmountDown} from '@fortawesome/free-solid-svg-icons';
import {TxService} from '../tx.service';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent implements OnInit {
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;

  constructor(public txService: TxService) { }

  ngOnInit() {
    this.txService.fetchUserTx(null);
  }

}
