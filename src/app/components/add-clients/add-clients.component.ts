import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {

  form: FormGroup;

  constructor(private _ClientService: ClientService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      last_name: new FormControl("", [Validators.required, Validators.maxLength(30)]),
      grade: new FormControl("", [Validators.required, Validators.maxLength(30)]),
      company: new FormControl("", [Validators.required, Validators.maxLength(30)])
      //projectImage: new FormControl("", Validators.required),
      //pdfProject: new FormControl("", Validators.required)
    });
  }
  post_client() {
    console.log(this.form.value);
    this._ClientService.postClient(this.form.value)
      .subscribe(
        response => {
          console.log("Success", response),
            this.toastr.success('', 'Client added successfully', { timeOut: 3000, progressBar: false, progressAnimation: 'increasing' }),
            setTimeout(() => { this.router.navigate(['/clients']); }, 1500)
        },
        error => console.log('Error', error)
      );
  }

}


