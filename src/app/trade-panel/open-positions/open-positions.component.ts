import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {OpenPositionsService} from '../../_services/open-positions.service';
import {PositionModel} from '../../_models/position.model';
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
  openPositions: PositionModel[];
  private _success = new Subject<string>();

  constructor(public authService: AuthenticationService,
              public openPositionService: OpenPositionsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.openPositionService.fetchOpenPositionsOf(this.route.snapshot.params['id']).subscribe(
        (data: PositionModel[]) => this.openPositions = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
        error => console.log(error)
      );
    } else {
      this.openPositionService.fetchOpenPositions().subscribe(
        (data: PositionModel[]) => this.openPositions = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
        error => error,
        () => (data: PositionModel[]) => this.openPositions = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol))
      );
    }
  }

  fetchOpenPositions() {
    return this.openPositionService.fetchOpenPositions();
  }

  onCloseLimitOrder(position: PositionModel) {
    this.openPositionService.closeLimitOrder(
      position.symbol,
      this.calculateSide(position.currentQty),
      this.qtyPerc.nativeElement.value,
      this.price.nativeElement.value
    ).subscribe(
      () => this.fetchOpenPositions(),
      error => console.log(error)
    );
    this.qtyPerc.nativeElement.value = '';
    this.price.nativeElement.value = '';
  }

  onCloseMarketPosition(position: PositionModel) {
    this.openPositionService.onCloseMarketPosition(position.symbol).subscribe(
      () => this.openPositions = this.openPositions.filter(p => p.symbol !== position.symbol),
      error => console.log(error)
    );
  }

  private calculateSide(currentQty: number) {
    if (currentQty > 0) {
      return 'Sell';
    } else if (currentQty < 0) {
      return 'Buy';
    }
  }

  public onClearAll() {
    this.openPositions = null;
  }

}
