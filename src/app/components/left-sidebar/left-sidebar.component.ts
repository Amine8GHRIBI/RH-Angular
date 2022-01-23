import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  constructor(public securityService: KeycloakSecurityService) { }
  /* isAuth = false;
   keycloak: any;
   userInformations: any;
 */

  ngOnInit() {
    console.log(this.securityService.kc.subject);
  }

  onLogout() {
    this.securityService.kc.logout();
  }

  onLogin() {
    this.securityService.kc.login();
  }

  onChangePassword() {
    this.securityService.kc.accountManagement();
  }

  isAppManager() {
    return this.securityService.kc.hasRealmRole('manager');
  }

  isAppEmployee() {
    return this.securityService.kc.hasRealmRole('employee');
  }

  isAppAdmin() {
    return this.securityService.kc.hasRealmRole('admin');
  }

}