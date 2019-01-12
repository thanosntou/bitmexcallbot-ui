import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  faSortDown = faSortDown;

  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }

  revertDateSort() {
    this.adminService.logins.reverse();
  }

}
