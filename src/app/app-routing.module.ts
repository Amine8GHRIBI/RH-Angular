import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AddClientsComponent } from './components/add-clients/add-clients.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddProjectsComponent } from './components/add-projects/add-projects.component';
import { AdminCalendarComponent } from './components/admin-calendar/admin-calendar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClientsGridComponent } from './components/clients-grid/clients-grid.component';
import { EmployeeCalendarComponent } from './components/employee-calendar/employee-calendar.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeesGridComponent } from './components/employees-grid/employees-grid.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { Page403Component } from './components/page403/page403.component';
import { Page404Component } from './components/page404/page404.component';
import { Page500Component } from './components/page500/page500.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectCalendarComponent } from './components/project-calendar/project-calendar.component';
import { ProjectsDetailComponent } from './components/projects-detail/projects-detail.component';
import { ProjectsGridComponent } from './components/projects-grid/projects-grid.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { TeamComponent } from './components/team/team.component';
import { TimeWorkedComponent } from './components/time-worked/time-worked.component';
import { UsersComponent } from './components/users/users.component';



const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
        children: [
          {
              path: '',
              component: EmployeeDashboardComponent
          },
          {
            path: 'admin-dashboard', 
            component: AdminDashboardComponent
          },
          {
            path: 'employee-dashboard', 
            component: EmployeeDashboardComponent
          },
          {
            path: 'holidays', 
            component: HolidaysComponent
          },
          {
            path: 'activities', 
            component: ActivitiesComponent
          },
          {
            path: 'users', 
            component: UsersComponent
          },
          {
            path: 'page404', 
            component: Page404Component
          },
          {
            path: 'page403', 
            component: Page403Component
          },
          {
            path: 'page500', 
            component: Page500Component
          },
          {
            path: 'add-project', 
            component: AddProjectsComponent
          },
          {
            path: 'projects-list', 
            component: ProjectsListComponent
          },
          {
            path: 'projects-grid', 
            component: ProjectsGridComponent
          },
          {
            path: 'projects-detail/:id', 
            component: ProjectsDetailComponent
          },
          {
            path: 'add-clients', 
            component: AddClientsComponent
          },
          {
            path: 'clients', 
            component: ClientsGridComponent
          },
          {
            path: 'team', 
            component: TeamComponent
          },
          {
            path: 'profile/:id',
            component: ProfileComponent
          },
          {
            path: 'add-projects',
            component: AddProjectsComponent
          },
          {
            path: 'add-client',
            component: AddClientsComponent
          },
          {
            path: 'employee-calendar/:id',
            component: EmployeeCalendarComponent
          },
          {
            path: 'admin-calendar',
            component: AdminCalendarComponent
          },
          {
            path: 'project-calendar/:id',
            component: ProjectCalendarComponent
          },
          {
            path: 'employees-grid',
            component: EmployeesGridComponent
          },
          {
            path: 'employees-list',
            component: EmployeesListComponent
          },
          {
            path: 'add-employee', 
            component: AddEmployeeComponent
          },
          {
            path: 'my-calendar/:id',
            component: MyCalendarComponent
          },
          {
            path: 'Time_Worked/:id',
            component: TimeWorkedComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    //outlet: 'header',
    component: Page404Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
