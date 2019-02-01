import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {faSortAlphaUp} from '@fortawesome/free-solid-svg-icons';
import {faSortAlphaDown} from '@fortawesome/free-solid-svg-icons';
import {faSortAmountUp} from '@fortawesome/free-solid-svg-icons';
import {faSortAmountDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.fetchLogins();
  }

  sortByName() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.adminService.logins.sort((a, b) =>
        a.user.username.localeCompare(b.user.username));
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.adminService.logins.sort((a, b) =>
        b.user.username.localeCompare(a.user.username));
    }
  }

  sortByDate() {
    if (this.sortByDateIcon === faSortAmountDown) {
      this.sortByDateIcon = faSortAmountUp;
      this.adminService.logins.sort((a, b) =>
        new Date(a.create_date).getTime() - (new Date(b.create_date).getTime()));
    } else {
      this.sortByDateIcon = faSortAmountDown;
      this.adminService.logins.sort((a, b) =>
        new Date(b.create_date).getTime() - (new Date(a.create_date).getTime()));
    }
  }

}
