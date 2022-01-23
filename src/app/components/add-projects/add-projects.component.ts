import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
//import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};
@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AddProjectsComponent implements OnInit {
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  form: FormGroup;

  constructor(private _ProjectService: ProjectService, private router: Router, private toastr: ToastrService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
   }

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      description: new FormControl("", [Validators.required, Validators.maxLength(200)]),
      datedebut: new FormControl("", [Validators.required, Validators.maxLength(18)]),
      datefin: new FormControl("", [Validators.required, Validators.maxLength(18)]),
      client: new FormControl("", [Validators.required, Validators.maxLength(30)]),
      //projectImage: new FormControl("", Validators.required),
      //pdfProject: new FormControl("", Validators.required)
    });
  }

  onImageChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    //console .log(file);
    this.form.patchValue({
      projectImage: file
    });
    this.form.get('projectImage').updateValueAndValidity();
  }
  onPdfChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    //console .log(file);
    this.form.patchValue({
      pdfProject: file
    });
    this.form.get('pdfProject').updateValueAndValidity();
  }

  post_project() {
    console.log(this.form.value);
    this.form.patchValue({
      datedebut: this.model1.day + '/' + this.model1.month + '/' + this.model1.year,
      datefin: this.model2.day + '/' + this.model2.month + '/' + this.model2.year,
      
    });
    
    console.log(this.form.value);
    this._ProjectService.postProject(this.form.value)
    .subscribe(
      response => { 
        console.log("Success", response),
        this.toastr.success('','Project added successfully',{timeOut: 3000, progressBar: false, progressAnimation:'increasing'}),
        setTimeout(() => { this.router.navigate(['/projects-list']); },1500)
      },
      error => console.log('Error', error)
    );
  }

}