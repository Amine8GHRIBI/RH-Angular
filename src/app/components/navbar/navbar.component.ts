import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public securityService: KeycloakSecurityService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.securityService.kc.logout();
  }
}
