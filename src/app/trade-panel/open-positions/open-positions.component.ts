import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {OpenPositionsService} from '../open-positions.service';
import {PositionModel} from '../../position.model';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.css'],
})
export class OpenPositionsComponent implements OnInit {
  @ViewChild('qtyPercentageInput') qtyPerc: ElementRef;
  @ViewChild('priceInput') price: ElementRef;

  constructor(public authService: AuthenticationService,
              public openPositionService: OpenPositionsService) {}

  ngOnInit() {
    this.openPositionService.fetchOpenPositions();
  }

  fetchOpenPositions() {
    this.openPositionService.fetchOpenPositions();
  }

  onMarketPosition(position: PositionModel) {
    this.openPositionService.marketPosition(
      position.symbol,
      this.calculateSide(position.currentQty),
      'Limit',
      this.qtyPerc.nativeElement.value,
      this.price.nativeElement.value
    );
  }

  onCloseMarketPosition(position: PositionModel) {
    this.openPositionService.onCloseMarketPosition(position.symbol);
  }

  private calculateSide(currentQty: number) {
    if (currentQty > 0) {
      return 'Sell';
    } else if (currentQty < 0) {
      return 'Buy';
    }
  }

}
