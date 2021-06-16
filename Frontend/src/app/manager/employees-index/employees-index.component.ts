import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employees-index',
  templateUrl: './employees-index.component.html',
  styleUrls: ['./employees-index.component.css']
})
export class EmployeesIndexComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployees();
    console.log(this.employees);
  }

  public getEmployees(): void {
    this.employeeService.getEmployeesByDepartment(this.route.snapshot.params.department).subscribe(employees => {
      this.employees = employees;
    });
  }

}
