import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/app/data-structure/employee';
import { IProject } from 'src/app/data-structure/project';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: any;
  employee: any={};
  projects: any={};
  searchText: any;

  constructor(private route: ActivatedRoute, private _EmployeeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOne();
  }

  getOne(){
    this._EmployeeService.getOne(this.id).subscribe(
      (data:IEmployee[])=> 
      { 
        this.employee=data;
        console.log("Success",this.employee);
        setTimeout(() => {},0);
      }
    );
    this._EmployeeService.getProjects(this.id).subscribe(
      (data:IProject[])=> 
      { 
        this.projects=data;
        console.log("Success",this.projects);
        setTimeout(() => {},0);
      }
    );
  }
}
