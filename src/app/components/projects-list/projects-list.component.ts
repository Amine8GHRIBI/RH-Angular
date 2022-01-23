import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IActivity } from 'src/app/data-structure/activity';
import { IProject } from 'src/app/data-structure/project';
import { ActivityService } from 'src/app/services/activity.service';
import { AffectationService } from 'src/app/services/affectation.service';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: any[] = [];
  searchText: any;
  activities: any[] = [];
  progress: number = 0.0;

  constructor(private affectationService: AffectationService, private projectService: ProjectService, private activityService: ActivityService, private router: Router, private toastr: ToastrService, public securityService: KeycloakSecurityService) {

  }

  ngOnInit(): void {
    this.getProjects();

  }

  public deleteProject(id: String) {
    this.projectService.deleteProject(id).subscribe(
      response => {
        console.log("Success", response),
          this.toastr.success('', 'Project deleted successfully', { timeOut: 1500, progressBar: false, progressAnimation: 'increasing' }),
          this.getProjects()
      },
      error => console.log('Error', error)
    );
  }

  public getProjects() {
    this.affectationService.getMyProjects().subscribe((data: IProject[]) => {
      this.projects = [];
      for (var i = 0; i < data.length; i++) {
        this.getProgress(data[i]);
      }
    });
  }

  public getProgress(project) {
    this.activityService.getProjectActivities(project.id).subscribe((data: any[]) => {
      this.activities = data;
      //console.log(this.activities);
      var all = 0.0;
      var done = 0.0;
      var db_timestamp = 0;
      var df_timestamp = 0;
      var noww_timestamp = 0;
      var timestamp_done = 0;
      let status = this.state(project.datedebut, project.datefin);

      if (data == [] || status == 'not_started')
        this.progress = 0;
      else {
        for (var i = 0; i < data.length; i++) {
          db_timestamp = (new Date(data[i].startTime)).getTime();
          df_timestamp = (new Date(data[i].endTime)).getTime();
          noww_timestamp = (new Date()).getTime();
          all = all + (df_timestamp - db_timestamp);

          if (df_timestamp < noww_timestamp) {
            timestamp_done = df_timestamp - db_timestamp;
            done = done + timestamp_done;
          }
          else {
            timestamp_done = noww_timestamp - db_timestamp;
            if (timestamp_done > 0)
              done = done + timestamp_done;
          }
        }
        if (all == 0)
          this.progress = 0;
        else
          this.progress = (done / all) * 100;


      }
      this.projects.push({
        id: project.id,
        title: project.title,
        description: project.description,
        datedebut: project.datedebut,
        datefin: project.datefin,
        client: project.client,
        status: status,
        progress: this.progress
      });
      //console.log(this.progress);
    });
    console.log(this.progress);
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
