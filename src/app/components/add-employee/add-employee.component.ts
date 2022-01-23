import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  constructor(private _EmployeeService: EmployeeService,private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      last_name: new FormControl("", [Validators.required, Validators.maxLength(30)]),
      email: new FormControl("", [Validators.required, Validators.maxLength(30)]),
     
      //projectImage: new FormControl("", Validators.required),
      //pdfProject: new FormControl("", Validators.required)
    });
  }
    post_employee() {
      //console.log(this.form.value);
      this._EmployeeService.postEmployee(this.form.value)
      .subscribe(
        response => { 
          console.log("Success", response),
          this.toastr.success('','Employee added successfully',{timeOut: 3000, progressBar: false, progressAnimation:'increasing'}),
          setTimeout(() => { this.router.navigate(['/employees-list']); },1500)
        },
        error => console.log('Error', error)
      );
    }

}