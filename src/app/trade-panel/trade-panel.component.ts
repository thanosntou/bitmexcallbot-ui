import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-panel',
  templateUrl: './trade-panel.component.html',
  styleUrls: ['./trade-panel.component.css']
})
export class TradePanelComponent implements OnInit {
  isHidden1 = false;
  isHidden2 = false;

  constructor() { }

  ngOnInit() {
  }

  hideOrShow1() {
    this.isHidden1 = !this.isHidden1;
  }

  hideOrShow2() {
    this.isHidden2 = !this.isHidden2;
  }

}
