import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commission } from 'src/app/core/models/commission';
import { CommissionService } from 'src/app/core/services/commission.service';

@Component({
  selector: 'app-commission-index',
  templateUrl: './commission-index.component.html',
  styleUrls: ['./commission-index.component.css']
})
export class CommissionIndexComponent implements OnInit {
  commissions: Commission[];

  constructor(private commissionService: CommissionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCommissions();
  }

  public getCommissions(): void {
    this.commissionService.getCommissionsByDepartment(this.route.snapshot.params.department).subscribe(commissions => {
      this.commissions = commissions;
    });
  }

}
