import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { UsersComponent } from './components/users/users.component';
import { Page404Component } from './components/page404/page404.component';
import { Page403Component } from './components/page403/page403.component';
import { Page500Component } from './components/page500/page500.component';
import { AddProjectsComponent } from './components/add-projects/add-projects.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsGridComponent } from './components/projects-grid/projects-grid.component';
import { ProjectsDetailComponent } from './components/projects-detail/projects-detail.component';
import { AddClientsComponent } from './components/add-clients/add-clients.component';
import { TeamComponent } from './components/team/team.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectService } from './services/project.service';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakSecurityService } from './services/keycloak-security.service';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { EmployeeService } from './services/employee.service';

import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AffEmployeesComponent } from './components/aff-employees/aff-employees.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmployeeCalendarComponent } from './components/employee-calendar/employee-calendar.component';
import { ProjectCalendarComponent } from './components/project-calendar/project-calendar.component';
import { AdminCalendarComponent } from './components/admin-calendar/admin-calendar.component';
import { EmployeesGridComponent } from './components/employees-grid/employees-grid.component';
import { ClientsGridComponent } from './components/clients-grid/clients-grid.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IgxPieChartModule } from "igniteui-angular-charts";
import { TimeWorkedComponent } from './components/time-worked/time-worked.component';

export function keycloakFactory(keycloakSecurityService: KeycloakSecurityService) {
  return () => keycloakSecurityService.init() ; 
  }




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftSidebarComponent,
    HomepageComponent,
    HolidaysComponent,
    ActivitiesComponent,
    UsersComponent,
    Page404Component,
    Page403Component,
    Page500Component,
    AddProjectsComponent,
    ProjectsListComponent,
    ProjectsGridComponent,
    ProjectsDetailComponent,
    AddClientsComponent,
    TeamComponent,
    ProfileComponent,
    AffEmployeesComponent,
    EmployeeCalendarComponent,
    ProjectCalendarComponent,
    AdminCalendarComponent,
    EmployeesGridComponent,
    ClientsGridComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    MyCalendarComponent,
    EmployeeDashboardComponent,
    AdminDashboardComponent,
    TimeWorkedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    BrowserModule, 
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MomentDateModule,
    MatInputModule,
    CommonModule, HttpModule, ScheduleAllModule, RecurrenceEditorAllModule,   NumericTextBoxAllModule, TextBoxAllModule, DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule,   ToolbarAllModule, DropDownListAllModule, ContextMenuAllModule, MaskedTextBoxModule, UploaderAllModule, MultiSelectAllModule,   TreeViewModule, ButtonAllModule, DropDownButtonAllModule, SwitchAllModule, BrowserModule, RouterModule,
    NgbModule,
    Ng2SearchPipeModule,  
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    IgxPieChartModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, deps: [KeycloakSecurityService], useFactory: keycloakFactory, multi: true },  
    ProjectService,EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }