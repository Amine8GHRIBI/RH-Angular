import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from 'src/app/data-structure/employee';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public employees: IEmployee[];
  searchText: any;
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: IEmployee[]) => { this.employees = data; console.log(this.employees); });
  }
  public  deleteEmployee(employee_id: String) {
    this.employeeService.deleteEmployee(employee_id).subscribe(
      response => {
        console.log("Success", response),
          this.toastr.success('', 'Employee deleted successfully', { timeOut: 1500, progressBar: false, progressAnimation: 'increasing' }),
          this.ngOnInit();
      },
      error => console.log('Error', error)
    );
  }
}