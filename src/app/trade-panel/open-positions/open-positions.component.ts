import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {OpenPositionsService} from '../open-positions.service';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.css'],
})
export class OpenPositionsComponent implements OnInit {

  constructor(public authService: AuthenticationService,
              public openPositionService: OpenPositionsService) {}

  ngOnInit() {
  }

  onClosePosition(symbol: string) {
    this.openPositionService.onClosePosition(symbol);
  }

}
