import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, GroupModel, TimelineViewsService, TimelineMonthService, DayService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/data-structure/project';
import { IEmployee } from 'src/app/data-structure/employee';
import { AffectationService } from 'src/app/services/affectation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { IAffectation } from 'src/app/data-structure/affectation';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class AdminCalendarComponent implements OnInit {

  public activities: any[] = [];
  employees: Object[] = [];
  id: any;
  projects: Object[] = [];

  constructor(private route: ActivatedRoute, private activityService: ActivityService, private _ProjectService: ProjectService, private _AffectationService: AffectationService, private _EmployeeService: EmployeeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEmployees();
    this.getProjects();
  }

  public selectedDate: Date = new Date();
  public group: GroupModel = {
    resources: ['Projects', 'Categories']
  };
  public projectDataSource: Object[] = [
    /*{ text: 'To DO List', id: '1', color: '#cb6bb2' },
    { text: 'Projet de vente en ligne', id: '2', color: '#56ca85' },
    { text: 'PROJECT 3', id: '3', color: '#df5286' }*/
  ];
  public categoryDataSource: Object[] = [
    /*{ text: 'Nancy', id: '1', groupId: '1', color: '#df5286' },
    { text: 'Steven', id: '2', groupId: '1', color: '#7fa900' },
    { text: 'Robert', id: '3', groupId: '2', color: '#ea7a57' },
    { text: 'Smith', id: '4', groupId: '2', color: '#5978ee' },
    { text: 'Micheal', id: '5', groupId: '3', color: '#df5286' },
    { text: 'Root', id: '6', groupId: '3', color: '#00bdae' }*/
  ];
  public allowMultiple: Boolean = true;
  public startHour: String = "08:00";
  public endHour: String = "19:00";
  public timezone: String = "Africa/Tunis";
  public eventSettings: EventSettingsModel = {
    dataSource: []
  };
  public temp = true;

  onBound(args: any): void {
    if (this.temp) {
      let schObj = (document.querySelector(".e-schedule") as any).ej2_instances[0];
      this.activityService.getActivities().subscribe((data: any[]) => {
        this.activities = transformToActivities(data);//console.log(this.activities);
        schObj.eventSettings.dataSource = this.activities;
      });
      this.temp = false;
    }
  }

  onBegin(args: any): void {
    if (args.requestType === "eventCreate") {

      let schObj = (document.querySelector(".e-schedule") as any).ej2_instances[0];
      this.post_activity(args.data[0]);
      schObj.eventSettings.dataSource = this.activities;

    }
    else if (args.requestType === "eventChange") {

      let schObj = (document.querySelector(".e-schedule") as any).ej2_instances[0];
      this.update_activity(args.changedRecords[0]);
      schObj.eventSettings.dataSource = this.activities;

    }
    else if (args.requestType === "eventRemove") {

      let schObj = (document.querySelector(".e-schedule") as any).ej2_instances[0];
      this.delete_activity(args.deletedRecords[0].Id);
      schObj.eventSettings.dataSource = this.activities;

    }
  }

  post_activity(activityData) {
    this.activityService.postActivity(activityData)
      .subscribe(
        response => {
          console.log("Success", response)
        },
        error => console.log('Error', error)
      );
  }

  update_activity(data) {
    this.activityService.updateActivity(data).subscribe(
      response => {
        console.log("Success", response)
      },
      error => console.log('Error', error)
    );
  }
  delete_activity(data) {
    this.activityService.deleteActivity(data).subscribe(
      response => {
        console.log("Success", response)
      },
      error => console.log('Error', error)
    );
  }

  getEmployees() {
    this._EmployeeService.getEmployees().subscribe(
      (data1: IEmployee[]) => {
        this._AffectationService.getAffectations().subscribe(
          (data2: IAffectation[]) => {
            //console.log("Success", empsaff);
            console.log(data1, data2);
            this.employees = transformToEmployees(data1, data2);
            this.categoryDataSource = this.employees;
          }
        );

      }
    );
  }

  getProjects() {
    this._ProjectService.getProjects().subscribe(
      (data: IProject[]) => {
        this.projects = transformToProjects(data);
        this.projectDataSource = this.projects;
        console.log("Success", this.projects);
      }
    );
  }

}

function transformToActivities(data: any) {

  var objs: Object[] = [];

  for (var i = 0; i < data.length; i++) {
    objs.push({
      Subject: data[i].subject,
      Location: data[i].location,
      StartTime: data[i].startTime,
      EndTime: data[i].endTime,
      IsAllDay: data[i].isAllDay,
      StartTimezone: data[i].startTimezone,
      EndTimezone: data[i].endTimezone,
      ProjectId: data[i].projectId,
      TaskId: data[i].taskId,
      Description: data[i].description,
      RecurrenceRule: data[i].recurrenceRule,
      Id: data[i].id,
      RecurrenceException: data[i].recurrenceException,
      RecurrenceID: data[i].recurrenceID
    });
  }

  return objs;
}

function transformToEmployees(emps: any, empsaff: any) {
  //console.log(emps, empsaff);
  var objs: Object[] = [];
  var j = 0;
  for (var i = 0; i < empsaff.length; i++) {
    while (empsaff[i].employee_id != emps[j].employee_id) {
      j++;
    }
    objs.push({
      text: emps[j].first_name + " " + emps[j].last_name,
      id: emps[j].employee_id,
      groupId: empsaff[i].project_id,
      color: "#df5286"
    });
  }
  console.log(objs);
  return objs;
}

function transformToProjects(data: any) {
  var objs: Object[] = [];
  for (var i = 0; i < data.length; i++) {
    objs.push({
      text: "<a href='Time_Worked/"+data[i].id+"'>"+data[i].title+"</a>",
      id: data[i].id,
      color: "#df5286"
    });
  }
  console.log(objs);
  return objs;
}