import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from 'src/app/data-structure/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-grid',
  templateUrl: './employees-grid.component.html',
  styleUrls: ['./employees-grid.component.css']
})
export class EmployeesGridComponent implements OnInit {

  public employees: IEmployee[];
  searchText: any;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: IEmployee[]) => { this.employees = data; console.log(this.employees); });
  }

}
