import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { Commission } from '../../../core/models/commission';
import { CommissionService } from '../../../core/services/commission.service';

interface Pagination {
  total: number,
  pages: number,
  page: number,
  limit: number,
}

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
    this.commissionService.getCommissionsForEmployee(this.page).subscribe(res => {
      this.commissions = res.commissions;
      this.pagination = res.meta.pagination;
    });
  }

  onChangeItem(index: number) {
    this.page = index;
    this.getCommissions();
  }
}
