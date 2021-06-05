import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/core/models/commission';
import { Employee } from 'src/app/core/models/employee';
import { CommissionService } from 'src/app/core/services/commission.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-commissions-index',
  templateUrl: './commissions-index.component.html',
  styleUrls: ['./commissions-index.component.css']
})
export class CommissionsIndexComponent implements OnInit {
  commissions: Commission[];
  manager: Employee;

  constructor(private commissionService: CommissionService,
    private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getCommissions();
    this.getManagerInfo();
  }

  public getCommissions(): void {
    this.commissionService.getCommissionsByManager().subscribe(commisions => {
      this.commissions = commisions;
    });
  }

  public getManagerInfo(): void {
    this.employeeService.getEmployeeInfo().subscribe(employee => {
      this.manager = employee;
    })
  }
  
}
