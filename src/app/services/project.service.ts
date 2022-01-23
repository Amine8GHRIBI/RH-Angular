import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../data-structure/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _url : string = "http://localhost:9292/Projects";

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProjects(): Observable<IProject[]>{
    return this.http.get<IProject[]>(this._url);
  }

  getOne(id){
    return this.http.get(this._url+'/'+id);
  }

  postProject(projectData):Observable<any>{
    return this.http.post<any>("http://localhost:9292/Projects",projectData);
  }

  deleteProject(id: String): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this.http.delete(url);
  }

}
