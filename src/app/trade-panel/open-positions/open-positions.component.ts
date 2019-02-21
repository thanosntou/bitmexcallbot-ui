import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {OpenPositionsService} from '../open-positions.service';
import {PositionModel} from '../../position.model';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.css'],
})
export class OpenPositionsComponent implements OnInit {
  @ViewChild('qtyPercentageInput') qtyPerc: ElementRef;
  @ViewChild('priceInput') price: ElementRef;
  successMessage: string;
  private _success = new Subject<string>();

  constructor(public authService: AuthenticationService,
              public openPositionService: OpenPositionsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.openPositionService.fetchOpenPositionsOf(this.route.snapshot.params['id']);
    } else {
      this.openPositionService.fetchOpenPositions();
    }
  }

  fetchOpenPositions() {
    this.openPositionService.fetchOpenPositions();
  }

  onCloseLimitOrder(position: PositionModel) {
    this.openPositionService.closeLimitOrder(
      position.symbol,
      this.calculateSide(position.currentQty),
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

  public onClearAll() {
    this.openPositionService.clearAll();
  }

}
