import { Component, OnInit } from '@angular/core';
import { Commission } from '../models/commission';
import { CommissionService } from '../services/commission.service';

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
    this.commissionService.getCommissionsByEmployee().subscribe(commisions => {
      this.commissions = commisions;
    });
  }

}
