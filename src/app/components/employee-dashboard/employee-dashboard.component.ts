import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IEmployee } from 'src/app/data-structure/employee';
import { ActivityService } from 'src/app/services/activity.service';
import { AffectationService } from 'src/app/services/affectation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  myProjects: any[] = [];
  myActivities: any[] = [];
  nb_activities: number = 0;
  Employees: IEmployee[];
  in_progress: number = 0;
  not_started: number = 0;
  finished: number = 0;
  public data: any;
  searchText: any;
  activities: any[] = [];

  constructor(public securityService: KeycloakSecurityService, private affectationService: AffectationService, private activityService: ActivityService, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getActivities();
    this.getEmployees();
    this.getAllActivities();
    this.getProjects();
    
  }

  public getProjects() {
    this.affectationService.getMyProjects().subscribe((data) => {
      console.log(data);
      //this.myProjects = data;

      for (var i = 0; i < data.length; i++) {
        let status = this.state(data[i].datedebut, data[i].datefin);
        if (status == "in_progress")
          this.in_progress++;
        if (status == "not_started")
          this.not_started++;
        if (status == "finished")
          this.finished++;
        if (status == "in_progress" || status == "not_started") {
          let time = this.getTimes(data[i].id);
          this.myProjects.push({
            id: data[i].id,
            title: data[i].title,
            description: data[i].description,
            datedebut: data[i].datedebut,
            datefin: data[i].datefin,
            client: data[i].client,
            time: {
              days: time.days,
              hours: time.hours
            }
          });
        }
      }
      console.log(this.myProjects);
      this.data = [
        { Label: "" + Math.round((this.finished / (this.finished + this.in_progress + this.not_started)) * 100 * 100) / 100 + "%", Value: this.finished },
        { Label: "" + Math.round((this.in_progress / (this.finished + this.in_progress + this.not_started)) * 100 * 100) / 100 + "%", Value: this.in_progress },
        { Label: "" + Math.round((this.not_started / (this.finished + this.in_progress + this.not_started)) * 100 * 100) / 100 + "%", Value: this.not_started }
      ];
    });
  }

  public getActivities() {
    this.activityService.getEmployeeActivities(this.securityService.kc.subject).subscribe((data: any[]) => {
      this.myActivities = data; console.log(this.myActivities);
      this.nb_activities = 0;
      for (var i = 0; i < data.length; i++) {
        let db = (new Date(data[i].startTime)).getDate();
        let now = (new Date()).getDate();
        if (db == now)
          this.nb_activities++;
      }
    });
  }

  public getEmployees() {
    this.employeeService.getEmployees().subscribe((data: IEmployee[]) => {
      this.Employees = data;
    });
  }

  public state(db: string, df: string) {
    var db_timestamp = (new Date(moment(db, 'DD-MM-YYYY').format('MM-DD-YYYY'))).getTime();
    var df_timestamp = (new Date(moment(df, 'DD-MM-YYYY').format('MM-DD-YYYY'))).getTime();
    var noww_timestamp = new Date().getTime();

    if (df_timestamp < noww_timestamp) {
      return 'finished';
    }
    else {
      if (db_timestamp <= noww_timestamp && df_timestamp >= noww_timestamp) {
        return 'in_progress';
      } else {
        if (db_timestamp >= noww_timestamp && df_timestamp >= noww_timestamp) {
          return 'not_started';
        }
      }
    }
  }

  public getAllActivities() {
    this.activityService.getActivities().subscribe((data: any[]) => {
      this.activities = data;
    });
  }

  public getTimes(id: string) {
    let all = 0;
    console.log(id, this.activities);
    for (var i = 0; i < this.activities.length; i++) {
      if (this.activities[i].projectId == id) {
        all = all + new Date(this.activities[i].endTime).getTime() - new Date(this.activities[i].startTime).getTime();
        console.log(all);
      }
    }
    let all_hours = Math.floor((all / 1000) / 3600);
    let days = Math.floor(all_hours / 8);
    let hours = all_hours - (days * 8);
    console.log(all_hours, days, hours)
    return { days: days, hours: hours };
  }

}
