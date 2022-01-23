import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../data-structure/employee';
import { IProject } from '../data-structure/project';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _url : string = "http://localhost:9292/all-employees";
  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url);
  }
  getOne(id){
    return this.http.get(this._url+'/'+id);
  }
  getProjects(id: any) {
    return this.http.get<IProject[]>(this._url+"/employee/'"+id+"'");
  }
  
  postEmployee(employeeData):Observable<any>{
    /*var formData = new FormData();
    formData.append("_idUser",projectData._idUser);
    formData.append("titreCourse",projectData.titreCourse);
    formData.append("descriptionCourse",projectData.descriptionCourse);
    //formData.append("files",projectData.courseImage);
    //formData.append("files",projectData.pdfCourse);
    console.log(formData.getAll);*/
    return this.http.post<any>("http://localhost:9292/all-employees",employeeData);
  }
  
  deleteEmployee(employee_id: String): Observable<{}> {
    const url = `${this._url}/${employee_id}`;
    return this.http.delete(url);
  }
}