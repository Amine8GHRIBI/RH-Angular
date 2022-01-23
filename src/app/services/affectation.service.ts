import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAffectation } from '../data-structure/affectation';
import { IEmployee } from '../data-structure/employee';
import { IProject } from '../data-structure/project';
import { KeycloakSecurityService } from './keycloak-security.service';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private _url: string = "http://localhost:9292/Affectation";

  constructor(private http: HttpClient, public securityService: KeycloakSecurityService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAffectations(): Observable<IAffectation[]> {
    return this.http.get<IAffectation[]>(this._url);
  }

  getEmployees(id: any) {
    return this.http.get<IEmployee[]>(this._url + "/Projects/'" + id + "'");
  }

  getProjects(id: any) {
    return this.http.get<IProject[]>(this._url + "/Employee/'" + id + "'");
  }

  getMyProjects() {
    if (this.isAppManager())
      return this.http.get<IProject[]>(this._url + "/Manager/'" + this.securityService.kc.subject + "'");
    if (this.isAppEmployee())
      return this.http.get<IProject[]>(this._url + "/Employee/'" + this.securityService.kc.subject + "'");
    if (this.isAppAdmin())
      return this.http.get<IProject[]>("http://localhost:9292/Projects");
  }

  postAffectation(employee_id, admin_id, project_id, debut_affectation, fin_affectation): Observable<any> {
    var aff_JSON = {
      employee_id: employee_id,
      admin_id: admin_id,
      project_id: project_id,
      debut_affectation: debut_affectation,
      fin_affectation: fin_affectation
    };
    return this.http.post<any>(this._url, aff_JSON);
  }

  deleteAffectation(employee_id, project_id): Observable<{}> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "employee_id": employee_id,
        "admin_id": this.securityService.kc.subject,
        "project_id": project_id
      },
    };
    return this.http.delete<any>(this._url, options);
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
