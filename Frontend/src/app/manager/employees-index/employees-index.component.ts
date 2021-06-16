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
  manager: Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getManagerInfo();
  }

  public getManagerInfo(): void {
    this.employeeService.getEmployeeInfo().subscribe(manager => {
      this.manager = manager;
      this.getEmployees();
    })
  }

  public getEmployees(): void {
    this.employeeService.getEmployeesByDepartment(this.manager.department).subscribe(employees => {
      this.employees = employees;
    });
  }



}
