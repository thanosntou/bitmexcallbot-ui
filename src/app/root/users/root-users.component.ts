import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../_services/authentication.service';
import {RootService} from '../../_services/root.service';
import {TenantModel} from '../../_models/tenant.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../_models/user.model';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tenants',
  templateUrl: './root-users.component.html',
  styleUrls: ['./root-users.component.css']
})
export class RootUsersComponent implements OnInit {
  tenants: TenantModel[] = [];
  allUsers: UserModel[] = [];
  admins: UserModel[] = [];
  traders: UserModel[] = [];
  followers: UserModel[] = [];
  newTenantForm: FormGroup;
  angleDownIcon = faAngleDown;
  faAngleDoubleDown = faAngleDoubleDown;

  constructor(private http: HttpClient,
              public authService: AuthenticationService,
              private rootService: RootService
  ) { }

  ngOnInit() {
    this.rootService.fetchTenants().subscribe((tenants) => this.tenants = tenants);
    this.rootService.fetchUsers().subscribe((users) => this.allUsers = users);
    this.newTenantForm = new FormGroup({
      'name': new FormControl(null)
      });
  }

  onSaveTenant() {
    console.log('heeey');
    const name = this.newTenantForm.get('name').value;
    console.log('heeey');
    console.log(this.newTenantForm.get('name'));
    console.log(this.newTenantForm.value);
    this.rootService.createTenant(name).subscribe((tenant) => {
      this.tenants.push(tenant);
      this.newTenantForm.get('name').reset();
    });
  }

  fetchAdminsAndTradersOfTenant(tenant: TenantModel) {
    this.rootService.fetchAdminsByTenant(tenant.id).subscribe((admins) => this.admins = admins);
    this.rootService.fetchTradersByTenant(tenant.id).subscribe((traders) => this.traders = traders);
  }

  fetchFollowersOfTrader(trader: UserModel) {
    this.rootService.fetchFollowersByTrader(trader.id).subscribe((followers) => this.followers = followers);
  }

  onDeleteFollower(follower: UserModel, tenant: TenantModel) {
    if (confirm('Are you sure to delete the follower: "' + follower.username + '" of tenant: "' + tenant.name + '" ?')) {
      this.rootService.deleteFollowerUser(follower).subscribe((deletedUser) =>
        this.followers = this.followers.filter(f => f.id !== deletedUser.id));
    }
  }

  onDeleteTrader(trader: UserModel, tenant: TenantModel) {
    if (confirm('Are you sure to delete the trader: "' + trader.username + '" of tenant: "' + tenant.name + '" ?')) {
      this.rootService.deleteTraderUser(trader).subscribe((deletedTrader) =>
        this.traders = this.traders.filter(f => f.id !== deletedTrader.id));
    }
  }

  onDeleteAdmin(trader: UserModel, tenant: TenantModel) {
    if (confirm('Are you sure to delete the admin: "' + trader.username + '" of tenant: "' + tenant.name + '" ?')) {
      this.rootService.deleteAdminUser(trader).subscribe((deletedAdmin) =>
        this.admins = this.admins.filter(f => f.id !== deletedAdmin.id));
    }
  }

  onDeleteTenant(tenant: TenantModel) {
    if (confirm('Are you sure to delete the tenant: "' + tenant.name + '" ?\n' +
      'All the admin, traders and followers will get deleted!')) {
      this.rootService.deleteTenant(tenant).subscribe((deletedTenant) =>
        this.tenants = this.tenants.filter(f => f.id !== deletedTenant.id));
    }
  }
}
