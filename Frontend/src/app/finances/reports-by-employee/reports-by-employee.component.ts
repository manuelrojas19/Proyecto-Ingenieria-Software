import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-reports-by-employee',
  templateUrl: './reports-by-employee.component.html',
  styleUrls: ['./reports-by-employee.component.css']
})
export class ReportsByEmployeeComponent implements OnInit {
  employee: Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmplooyee();
    console.log(this.employee);
  }

  getEmplooyee() {
    this.employeeService.getEmployeeById(this.route.snapshot.params.id).subscribe(employee => {
      this.employee = employee;
    });
  }

}
