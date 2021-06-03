import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {
  manager: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getManagerInfo();
  }

  public getManagerInfo(): void {
    this.employeeService.getEmployeeInfo().subscribe(employee => {
      this.manager = employee;
    })
  }
}
