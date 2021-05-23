import { Component, OnInit } from '@angular/core';
import { CommissionService } from '../commission.service';

@Component({
  selector: 'app-commissions-index',
  templateUrl: './commissions-index.component.html',
  styleUrls: ['./commissions-index.component.css']
})
export class CommissionsIndexComponent implements OnInit {
  commissions = [];

  constructor(private commissionService: CommissionService) { }

  ngOnInit(): void {
    this.commissionService.getCommissionsByEmployee().subscribe(commisions => {
      this.commissions = commisions;
    });
  }

}
