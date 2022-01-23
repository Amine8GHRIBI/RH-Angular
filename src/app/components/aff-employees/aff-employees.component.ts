import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from 'src/app/data-structure/employee';
import { AffectationService } from 'src/app/services/affectation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeycloakSecurityService } from 'src/app/services/keycloak-security.service';


@Component({
  selector: 'app-aff-employees',
  templateUrl: './aff-employees.component.html',
  styleUrls: ['./aff-employees.component.css']
})
export class AffEmployeesComponent implements OnInit {
  form: FormGroup;
  debut_affectation: string;
  fin_affectation: string;
  public employees: IEmployee[];
  searchText: any;
  id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }, public securityService: KeycloakSecurityService, private employeeService: EmployeeService, private _AffectationService: AffectationService, private router: Router, private toastr: ToastrService) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: IEmployee[]) => { this.employees = data; console.log(this.employees); });
    this.form = new FormGroup({
      datedebut: new FormControl("", [Validators.required, Validators.maxLength(18)]),
      datefin: new FormControl("", [Validators.required, Validators.maxLength(18)])
    });
    console.log(this.securityService.kc.tokenParsed);
  }

  postAffectation(employee_id, admin_id, project_id, d1, d2) {
    this.debut_affectation = d1;
    this.fin_affectation = d2;    

    this._AffectationService.postAffectation(employee_id, admin_id, this.id, this.debut_affectation, this.fin_affectation)
      .subscribe(
        response => {
          console.log("Success", response);
          this.toastr.success('', 'Employee added to this Project Successfully', { timeOut: 3000, progressBar: false, progressAnimation: 'increasing' });
        },
        error => console.log('Error', error)
      );
  }

}


