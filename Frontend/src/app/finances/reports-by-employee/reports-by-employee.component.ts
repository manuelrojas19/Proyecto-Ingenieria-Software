import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commission } from 'src/app/core/models/commission';
import { Employee } from 'src/app/core/models/employee';
import { CommissionService } from 'src/app/core/services/commission.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-reports-by-employee',
  templateUrl: './reports-by-employee.component.html',
  styleUrls: ['./reports-by-employee.component.css']
})
export class ReportsByEmployeeComponent implements OnInit {
  employee: Employee;
  commissions: Commission[];
  viatics: Commission[];
  transports: Commission[];

  constructor(private employeeService: EmployeeService, private commissionService: CommissionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmplooyee();
  }

  getEmplooyee() {
    this.employeeService.getEmployeeById(this.route.snapshot.params.id).subscribe(employee => {
      this.employee = employee;
      this.getCommissions();
    });
  }

  getCommissions() {
    this.commissionService.getCommissionsByEmployeeId(this.employee.id.toString()).subscribe(commissions => {
      this.commissions = commissions;
      this.filterCommissions();
    });
  }

  filterCommissions() {
    this.transports = this.commissions.filter(commission => commission.typeCommission === 'Transporte' && commission.isApprovedByFinances === true);
    this.viatics = this.commissions.filter(commission => commission.typeCommission === 'Viaticos' && commission.isApprovedByFinances === true);
  }

}
