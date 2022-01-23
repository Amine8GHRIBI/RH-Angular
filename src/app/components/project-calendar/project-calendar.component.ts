import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {EventSettingsModel, GroupModel, TimelineViewsService, TimelineMonthService, DayService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AffectationService } from 'src/app/services/affectation.service';
import { IEmployee } from 'src/app/data-structure/employee';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/data-structure/project';

@Component({
  selector: 'app-project-calendar',
  templateUrl: './project-calendar.component.html',
  styleUrls: ['./project-calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class ProjectCalendarComponent implements OnInit {

  public activities: any[] = [];
  employees: Object[] = [];
  id: any;
  project: Object[] = [];
  

  constructor(private route: ActivatedRoute, private activityService: ActivityService, private _ProjectService: ProjectService, private _AffectationService: AffectationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProjectEmployees();
    this.getOneProject();
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
  public startHour : String = "08:00";
  public endHour : String = "19:00";
  public timezone : String = "Africa/Tunis";
  public eventSettings: EventSettingsModel = {
    dataSource: []
  };
  public temp = true;

  onBound(args: any): void {
    if (this.temp) {
      let schObj = (document.querySelector(".e-schedule") as any).ej2_instances[0];
      this.activityService.getProjectActivities(this.id).subscribe((data: any[]) => {
        this.activities = transformToActivities(data);//console.log(this.activities);
        schObj.eventSettings.dataSource = this.activities;
      });
      this.temp = false;
    }
  }

  onBegin(args: any): void {
    if (args.requestType === "eventCreate") {

      let schObj = (document.querySelector(".e-schedule") as any).ej2_instances[0];
      
      schObj.eventSettings.dataSource = this.activities;
      this.post_activity(args.data[0]);
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
    activityData.ProjectId = this.id;
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

  getProjectEmployees() {
    this._AffectationService.getEmployees(this.id).subscribe(
      (data: IEmployee[]) => {
        this.employees=transformToEmployees(data,this.id);
        this.categoryDataSource = this.employees;
        //console.log("Success", this.employees);
      }
    );
  }

  getOneProject() {
    this._ProjectService.getOne(this.id).subscribe(
      (data: IProject[]) => {
        this.project = transformToProject(data);
        this.projectDataSource = this.project;
        //console.log("Success", this.project);
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

function transformToEmployees(data: any, id:any) {
  
  var objs: Object[] = [];
  for (var i = 0; i < data.length; i++) {
    objs.push({
      text: data[i].first_name,
      id: data[i].employee_id,
      groupId: id,
      color: "#df5286"
    });
  }
  //console.log(objs);
  return objs;
}

function transformToProject(data: any) {
  var objs: Object[] = [];
    objs.push({
      text: data.title,
      id: data.id,
      color: "#df5286"
    });
  //console.log(objs);
  return objs;
}