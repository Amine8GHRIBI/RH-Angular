import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../data-structure/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _url : string = "http://localhost:9292/clients";
  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getClients(): Observable<IClient[]>{
    return this.http.get<IClient[]>(this._url);
  }
  
  postClient(clientData):Observable<any>{
    return this.http.post<any>("http://localhost:9292/clients",clientData);
  }
  deleteClient(id: String): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this.http.delete(url);
  }
}