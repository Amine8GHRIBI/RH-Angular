import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivity } from '../data-structure/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  private _url: string = "http://localhost:9292/Activities";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this._url);
  }

  getProjectActivities(id: any): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this._url + "/Project/'" + id + "'");
  }

  getEmployeeActivities(id: any): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this._url + "/Employee/'" + id + "'");
  }

  getOne(id) {
    return this.http.get(this._url + '/' + id);
  }

  postActivity(activityData): Observable<any> {
    return this.http.post<any>(this._url, activityData);
  }

  deleteActivity(id: String): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this.http.delete(url);
  }

  updateActivity(data: any): Observable<{}> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "Subject": data.Subject,
        "Location": data.Location,
        "StartTime": data.StartTime,
        "EndTime": data.EndTime,
        "IsAllDay": data.IsAllDay,
        "StartTimezone": data.StartTimezone,
        "EndTimezone": data.EndTimezone,
        "ProjectId": data.ProjectId,
        "TaskId": data.TaskId,
        "Description": data.Description,
        "RecurrenceRule": data.RecurrenceRule,
        "Id": data.Id,
        "RecurrenceException": data.RecurrenceException,
        "RecurrenceID": data.RecurrenceID
      }
    };
    return this.http.put<any>(this._url + '/' + data.Id, options.body);
  }

}
