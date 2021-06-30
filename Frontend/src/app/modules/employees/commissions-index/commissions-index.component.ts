import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Commission } from '../../../core/models/commission';
import { CommissionService } from '../../../core/services/commission.service';

@Component({
  selector: 'app-commissions-index',
  templateUrl: './commissions-index.component.html',
  styleUrls: ['./commissions-index.component.css']
})
export class CommissionsIndexComponent implements OnInit {
  commissions: Commission[];

  constructor(private commissionService: CommissionService) {
   }

  ngOnInit(): void {
    this.getCommissions();
  }

  public getCommissions(): void {
    this.commissionService.getCommissionsByEmployee().subscribe(res => {
      this.commissions = res.commissions;
    });
  }

}
