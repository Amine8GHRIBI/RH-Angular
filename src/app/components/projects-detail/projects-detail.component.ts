import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/app/data-structure/employee';
import { IProject } from 'src/app/data-structure/project';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { AffEmployeesComponent } from '../aff-employees/aff-employees.component';
import { ToastrService } from 'ngx-toastr';
import { AffectationService } from 'src/app/services/affectation.service';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';
 
@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css']
})
export class ProjectsDetailComponent implements OnInit {
 
  id: any;
  project: any = {};
  employees: any = {};
  searchText: any;
 
  constructor(private route: ActivatedRoute, private _ProjectService: ProjectService, private _AffectationService: AffectationService, public dialog: MatDialog, private toastr: ToastrService, public securityService: KeycloakSecurityService) { }
 
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getOne();
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(AffEmployeesComponent, {
      data: { id: this.id },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
 
  getOne() {
    this._ProjectService.getOne(this.id).subscribe(
      (data: IProject[]) => {
        this.project = data;
        console.log("Success", this.project);
        setTimeout(() => { }, 0);
      }
    );
    this._AffectationService.getEmployees(this.id).subscribe(
      (data: IEmployee[]) => {
        this.employees = data;
        console.log("Success", this.employees);
        setTimeout(() => { }, 0);
      }
    );
  }
 
  public deleteProjectEmployee(employee_id: String) {
    this._AffectationService.deleteAffectation(employee_id, this.id).subscribe(
      response => {
        console.log("Success", response),
          this.toastr.success('', 'Employee deleted from this project Successfully', { timeOut: 1500, progressBar: false, progressAnimation: 'increasing' });
        this.ngOnInit();
      },
      error => console.log('Error', error)
    );
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