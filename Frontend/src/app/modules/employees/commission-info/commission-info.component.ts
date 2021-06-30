import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commission } from 'src/app/core/models/commission';
import { CommissionService } from 'src/app/core/services/commission.service';

@Component({
  selector: 'app-commission-info',
  templateUrl: './commission-info.component.html',
  styleUrls: ['./commission-info.component.css']
})
export class CommissionInfoComponent implements OnInit {
  commission: Commission;

  constructor(private commissionService: CommissionService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCommission();
  }

  public getCommission(): void {
    this.commissionService.getCommissionsByIdAndEmployee(this.route.snapshot.params.id).subscribe(res => {
      this.commission = res.commission;
    });
  }

}
