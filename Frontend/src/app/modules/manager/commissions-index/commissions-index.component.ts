import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/core/interfaces/pagination';
import { Commission } from 'src/app/core/models/commission';
import { CommissionService } from 'src/app/core/services/commission.service';

@Component({
  selector: 'app-commissions-index',
  templateUrl: './commissions-index.component.html',
  styleUrls: ['./commissions-index.component.css']
})
export class CommissionsIndexComponent implements OnInit {
  commissions: Commission[];
  pagination: Pagination;
  page: number;

  constructor(private commissionService: CommissionService) {
  }

  ngOnInit(): void {
    this.getCommissions();
  }

  public getCommissions(): void {
    this.commissionService.getCommissionsByManager(this.page).subscribe(res => {
      this.commissions = res.commissions;
      this.pagination = res.meta.pagination;
    });
  }

  public onChangeItem(index: number) {
    this.page = index;
    this.getCommissions();
  }


}
