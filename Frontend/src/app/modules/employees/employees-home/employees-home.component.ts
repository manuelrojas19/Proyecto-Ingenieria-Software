import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employees-home',
  templateUrl: './employees-home.component.html',
  styleUrls: ['./employees-home.component.css']
})
export class EmployeesHomeComponent implements OnInit {
  employee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeeInfo();
  }

  public getEmployeeInfo(): void {
    this.employeeService.getEmployeeInfo().subscribe(res => {
      this.employee = res.employee;
    });
  }

}
