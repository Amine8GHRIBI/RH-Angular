import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import { PromiseType } from 'protractor/built/plugins';
declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})

export class KeycloakSecurityService {
  public kc:KeycloakInstance;


  constructor() { }
  
 public async init() {
    console.log("Security Intialisation ...")
    
    this.kc=new Keycloak({
      url:"http://localhost:8080/auth",
      realm:"CRA_TALAN",
      clientId:"angular-web"
      

    }), 

     await this.kc.init({
     onLoad: 'login-required'
     //onLoad: 'check-sso'
     //promiseType: 'native'
    })
 }
}
 
 
